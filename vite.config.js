import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Quimica App",
        short_name: "Química",
        start_url: ".",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#317EFB",
        
      },
    }),
  ],
});