// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
  ignorePatterns: [
    "node_modules",
    ".eslintrcjs",
    "tailwind.config.js",
    "metro.config.js",
  ],
};
