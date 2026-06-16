import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
// `mode` doubles as the site selector:
//   --mode newtab  -> newtab.kazekit.com (browser extension product)
//   anything else  -> cooldesk.kazekit.com (full suite, default)
export default defineConfig(({ mode }) => {
  const site = mode === "newtab" ? "newtab" : "cooldesk";
  return {
    define: {
      "import.meta.env.VITE_SITE": JSON.stringify(site),
    },
    server: {
      host: "::",
      port: 8080,
    },
    build: {
      minify: 'terser',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
          }
        }
      }
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
