import { defineConfig } from "vite-plus";

const IGNORES = ["**/*.gen.ts", "**/vendor/**", "**/migrations/**"];

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },

  lint: {
    plugins: ["oxc", "eslint", "typescript", "unicorn", "import", "react"],
    options: { typeAware: true, typeCheck: true },
    categories: { correctness: "error" },

    rules: {
      "eqeqeq": ["warn", "smart"],
      "no-unused-vars": ["warn", { fix: { imports: "safe-fix" } }],

      "react/rules-of-hooks": "warn",
      "react/exhaustive-deps": "warn",

      "shadcn/no-raw-colors": "warn",
      "shadcn/no-inline-styles": "warn",
      "shadcn/no-unknown-classes": "warn",
      "shadcn/no-arbitrary-values": ["warn", { allow: ["layout"] }],

      "typescript/no-explicit-any": "warn",
      "typescript/prefer-ts-expect-error": "warn",

      "typescript/unbound-method": "off",
      "typescript/restrict-template-expressions": "off",

      "vite-plus/prefer-vite-plus-imports": "error",
      "import/consistent-type-specifier-style": "warn",

      "@stylistic/lines-around-comment": [
        "warn",
        {
          beforeLineComment: true,
          beforeBlockComment: true,

          allowEnumStart: true,
          allowTypeStart: true,
          allowArrayStart: true,
          allowClassStart: true,
          allowBlockStart: true,
          allowObjectStart: true,
          allowModuleStart: true,
          allowInterfaceStart: true,
        },
      ],
      "@stylistic/padding-line-between-statements": [
        "warn",
        { blankLine: "always", prev: "block-like", next: ["break", "continue", "return", "throw"] },
        { blankLine: "never", prev: "function-overload", next: ["function", "function-overload"] },
      ],
    },

    jsPlugins: ["@shadcn/lint", "@stylistic/eslint-plugin", "vite-plus/oxlint-plugin"],
    ignorePatterns: [...IGNORES],
  },

  fmt: {
    sortTailwindcss: { functions: ["cn", "tv", "cva", "clsx"] },

    printWidth: 140,
    proseWrap: "never",
    quoteProps: "consistent",
    htmlWhitespaceSensitivity: "ignore",

    sortImports: {
      customGroups: [{ groupName: "monorepo", elementNamePattern: ["@repo/**"], modifiers: ["value"] }],
      groups: [["type"], ["builtin", "external"], ["monorepo"], ["internal"], ["parent", "sibling", "index"]],
    },

    ignorePatterns: [...IGNORES],
  },
});
