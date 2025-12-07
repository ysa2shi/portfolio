import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import astro from "eslint-plugin-astro";
import tsParser from "@typescript-eslint/parser";

export default defineConfig([
  {
    // プロジェクト全体から除外したいディレクトリをリストアップ
    ignores: ["dist/", ".astro/", "node_modules/"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,

  // ===========================================
  // 🌟 Astro ファイルの設定
  // ===========================================
  // Astroの推奨設定を適用
  ...astro.configs.recommended,

  // Astroファイルに対するオーバーライド
  {
    files: ["**/*.astro"],
    languageOptions: {
      parserOptions: {
        // Astroのフロントマター（コードフェンス）の解析にTypeScriptパーサーを使用
        parser: tsParser,
        extraFileExtensions: [".astro"],
        // TSの設定でプロジェクトを特定している場合は、こちらにも追加が必要な場合があります
        // project: './tsconfig.json',
      },
      globals: globals.astro, // Astroのグローバル変数を追加 (astro.configs.recommendedに含まれている可能性もありますが明示的に)
    },
  },

  // ... 既存の追加調整 ...
  {
    files: ["**/*.astro/*.js", "*.astro/*.js"],
    ...tseslint.configs.disableTypeChecked,
  },
]);
