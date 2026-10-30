import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    dts: true,
    hash: false,
    unbundle: true,
    outputOptions: { preserveModules: true },
    inputOptions: { checks: { moduleLevelDirective: false } },
    copy: [{ from: ["src/*.css", "!src/vendor.css"] }, { from: "src/vendor/README.md", flatten: false }],
  },
});
