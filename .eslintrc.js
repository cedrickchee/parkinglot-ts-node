module.exports = {
  env: {
    es6: true,
    node: true
  },
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "airbnb-typescript/base",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  rules: {
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }]
  }
};
