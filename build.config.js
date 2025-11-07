import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';

/**
 * Build Configuration for Saha UI
 * Compiles all components and MCP server as ES modules with arrow functions
 * Output: dist/ folder in root
 */
export default defineConfig({
  plugins: [
    react({
      // Use SWC for faster builds and better ES2022 support
      tsDecorators: true,
    }),
    dts({
      include: ['src/**/*', 'mcp/**/*'],
      exclude: [
        'src/**/*.test.tsx',
        'src/**/*.test.ts',
        'src/main.tsx',
        'src/App.tsx',
        'src/TypeSafetyExamples.tsx',
        'src/DebugTheme.tsx',
        'src/components/ColorTest.tsx',
        'src/examples/**/*',
        'mcp/**/*.test.ts',
        'mcp/test-*.js',
      ],
      rollupTypes: false,
      insertTypesEntry: true,
      outDir: 'dist',
    }),
  ],

  build: {
    lib: {
      entry: {
        // Main component library entry point
        index: resolve(process.cwd(), 'src/index.ts'),
        // MCP server entry point
        'mcp/server': resolve(process.cwd(), 'mcp/server.ts'),
      },
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.js`,
    },

    rollupOptions: {
      // External dependencies that shouldn't be bundled
      external: [
        // React ecosystem
        'react',
        'react-dom',
        'react/jsx-runtime',
        /^react\/.*/,

        // UI/Styling dependencies
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        'lucide-react',
        /^lucide-react\/.*/,

        // Specialized components
        'react-resizable-panels',
        'monaco-editor',
        '@monaco-editor/react',
        'recharts',
        'rechart',

        // MCP SDK
        '@modelcontextprotocol/sdk',
        /^@modelcontextprotocol\/.*/,

        // Node.js built-ins
        'fs',
        'fs/promises',
        'path',
        'url',
        'child_process',
        'glob',
        /^node:.*/,
      ],

      input: (() => {
        const entries = {
          // Main entry point
          index: resolve(process.cwd(), 'src/index.ts'),
          // MCP server
          'mcp/server': resolve(process.cwd(), 'mcp/server.ts'),
        };

        // Add all component files
        const componentFiles = glob.sync('src/**/*.{ts,tsx}', {
          ignore: [
            'src/**/*.test.{ts,tsx}',
            'src/**/*.types.ts',
            'src/main.tsx',
            'src/App.tsx',
            'src/TypeSafetyExamples.tsx',
            'src/DebugTheme.tsx',
            'src/components/ColorTest.tsx',
            'src/vite-env.d.ts',
            'src/examples/**/*',
            'src/index.ts', // Already included above
          ],
        });

        componentFiles.forEach((file) => {
          const key = file.slice(4, file.length - (file.endsWith('.tsx') ? 4 : 3));
          entries[key] = fileURLToPath(new URL(file, import.meta.url));
        });

        return entries;
      })(),

      output: {
        format: 'es',
        dir: 'dist',

        // File naming patterns
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',

        // Preserve module structure
        preserveModules: true,
        preserveModulesRoot: '.',

        // React globals
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },

        // ES2022 code generation with arrow functions
        generatedCode: {
          arrowFunctions: true,
          constBindings: true,
          objectShorthand: true,
          reservedNamesAsProps: false,
          symbols: true,
        },

        // Compact minified output
        compact: true,
        indent: false,

        // Modern ES module features
        hoistTransitiveImports: true,
        interop: 'auto',
        exports: 'named',
        externalLiveBindings: true,
        freeze: true,
        strict: true,
      },

      // Tree-shaking optimizations
      treeshake: {
        moduleSideEffects: (id, external) => {
          // Preserve side effects for CSS files
          if (id.endsWith('.css') || id.endsWith('.scss')) {
            return true;
          }
          return false;
        },
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
        unknownGlobalSideEffects: false,
        correctVarValueBeforeDeclaration: false,
      },

      // Optimization
      makeAbsoluteExternalsRelative: false,
      preserveEntrySignatures: 'strict',
    },

    // Build settings
    cssCodeSplit: true,
    sourcemap: true,
    emptyOutDir: true,
    copyPublicDir: false,
    target: 'es2022',
    minify: 'esbuild', // Minify for compact arrow functions
    reportCompressedSize: true,

    // Chunk size warnings
    chunkSizeWarningLimit: 1000,

    // Asset handling
    assetsInlineLimit: 4096,
  },

  resolve: {
    alias: {
      '@': resolve(process.cwd(), './src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },

  esbuild: {
    target: 'es2022',
    format: 'esm',
    platform: 'neutral',
    minify: true,
    minifyWhitespace: true,
    minifyIdentifiers: true,
    minifySyntax: true,

    // TypeScript config
    tsconfigRaw: {
      compilerOptions: {
        useDefineForClassFields: true,
        target: 'ES2022',
        module: 'ESNext',
        lib: ['ES2022', 'DOM', 'DOM.Iterable'],
        jsx: 'react-jsx',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      },
    },

    // Code transformation
    charset: 'utf8',
    legalComments: 'none',
    logLevel: 'info',
    logLimit: 10,

    // Compact output with short names
    keepNames: false,
    treeShaking: true,
  },

  // Optimization config
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
    ],
    exclude: [
      '@modelcontextprotocol/sdk',
    ],
  },
});
