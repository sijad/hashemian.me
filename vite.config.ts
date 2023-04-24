import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import VitePluginInjectPreload from "vite-plugin-inject-preload";

export default defineConfig({
  plugins: [
    ViteEjsPlugin(),
    VitePluginInjectPreload({
      files: [
        {
          match: /.*/,
        },
      ],
      injectTo: "custom",
    }),
  ],
});
