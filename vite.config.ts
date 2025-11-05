// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteImagemin from "vite-plugin-imagemin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      gifsicle: false, // skip GIF optimization (you’re not using any)
      optipng: { optimizationLevel: 5 },
      mozjpeg: { quality: 78, progressive: true },
      webp: { quality: 78 },
      svgo: {
        plugins: [
          { name: "removeViewBox", active: false },
          { name: "removeEmptyAttrs", active: true }
        ]
      }
    })
  ],

  // ensure relative assets load correctly on Firebase
  base: "./",

  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },

  server: {
    port: 5173,
    open: true,
  },

  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
