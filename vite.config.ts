// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only, preset overridden to node-server for Render deployment),
//     VITE_* env injection, @ path alias, React/TanStack dedupe, error logger plugins.
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    resolve: {
      alias: [
        {
          find: "punycode/",
          replacement: "punycode",
        },
      ],
    },
  },
  // Deploy as a Node.js server on Render (not Cloudflare Workers)
  nitro: {
    preset: "node-server",
    output: {
      dir: ".output",
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
