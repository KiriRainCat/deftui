import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    dts: true,
    hash: false,
    unbundle: true,

    copy: [
      { from: ["src/*.css", "!src/vendor.css"] }, // oxfmt-ignore
      { from: "src/vendor/README.md", flatten: false },
    ],

    inputOptions: {
      checks: { moduleLevelDirective: false },
    },
  },
});
