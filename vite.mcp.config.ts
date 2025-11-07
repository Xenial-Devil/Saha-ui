import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "node:url";

// Vite config specifically for building the MCP server
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "mcp/server.ts"),
      formats: ["es"],
      fileName: () => "server.js",
    },
    rollupOptions: {
      external: [
        // Node.js built-ins
        "fs",
        "path",
        "url",
        "child_process",
        // MCP SDK
        "@modelcontextprotocol/sdk",
        /^@modelcontextprotocol\/.*/,
        // Other dependencies
        "glob",
      ],
      output: {
        dir: "dist/mcp",
        format: "es",
        preserveModules: false,
        exports: "auto",
      },
    },
    outDir: "dist/mcp",
    emptyOutDir: true,
    sourcemap: true,
    minify: false, // Keep code readable for debugging
    target: "node18",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
