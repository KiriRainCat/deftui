import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    dts: true,
    hash: false,
    unbundle: true,
    outputOptions: { preserveModules: true },
    inputOptions: { checks: { moduleLevelDirective: false } },
    entry: {
      modal: "src/modal-manager/index.ts",
      form: "src/react-hook-form/index.ts",
      router: "src/tanstack-router/index.ts",
    },
    copy: ["src/styles.css"],
  },
});
