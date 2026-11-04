import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    dts: true,
    hash: false,
    unbundle: true,

    entry: {
      form: "src/react-hook-form/index.ts",
      modal: "src/modal-manager/index.ts",
      router: "src/tanstack-router/index.ts",
    },

    copy: ["src/styles.css"],

    inputOptions: {
      checks: { moduleLevelDirective: false },
    },
  },
});
