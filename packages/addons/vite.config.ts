import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    dts: true,
    hash: false,
    unbundle: true,
    outputOptions: { preserveModules: true },
    inputOptions: { checks: { moduleLevelDirective: false } },
    entry: {
      form: "src/react-hook-form/index.ts",
    },
  },
});
