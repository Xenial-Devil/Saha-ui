import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { glob } from "glob";
import { fileURLToPath } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src/**/*"],
      exclude: [
        "src/**/*.test.tsx",
        "src/**/*.test.ts",
        "src/main.tsx",
        "src/App.tsx",
        "src/TypeSafetyExamples.tsx",
        "src/DebugTheme.tsx",
        "src/components/ColorTest.tsx",
        "src/examples/**/*", // Exclude all examples from build
      ],
      rollupTypes: false, // Keep individual .d.ts files
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
        "lucide-react",
        /^lucide-react\/.*/,
        "react-resizable-panels",
        "monaco-editor",
        "@monaco-editor/react",
        "@modelcontextprotocol/sdk",
        /^@modelcontextprotocol\/.*/,
        "glob",
        "fs",
        "path",
        "url",
        // Chart dependencies - don't bundle, users will install them
        "recharts",
        /^recharts\/.*/,
        "rechart",
        /^d3-.*/, // All d3 packages (d3-scale, d3-shape, etc.)
        "victory-vendor",
        "react-redux",
        "redux",
        "@reduxjs/toolkit",
        "reselect",
        "immer",
        "decimal.js-light",
        "eventemitter3",
        "internmap",
        "react-is",
        "use-sync-external-store",
      ],
      input: Object.fromEntries(
        glob
          .sync("src/**/*.{ts,tsx}", {
            ignore: [
              "src/**/*.test.{ts,tsx}",
              "src/**/*.types.ts",
              "src/main.tsx",
              "src/App.tsx",
              "src/TypeSafetyExamples.tsx",
              "src/DebugTheme.tsx",
              "src/components/ColorTest.tsx",
              "src/vite-env.d.ts",
              "src/examples/**/*",
            ],
          })
          .map((file) => [
            // Remove `src/` and file extension from entry key
            file.slice(4, file.length - (file.endsWith(".tsx") ? 4 : 3)),
            // Absolute path to file
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name].js",
        preserveModules: true,
        preserveModulesRoot: "src",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
    },
    cssCodeSplit: true,
    sourcemap: false,
    emptyOutDir: true,
    copyPublicDir: false,
  },
});
