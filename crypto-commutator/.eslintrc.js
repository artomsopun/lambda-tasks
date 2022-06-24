module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'linebreak-style': 0,
    'no-console': 0,
    'no-multi-spaces': ['error'],
    'consistent-return': 0,
    'lines-between-class-members': 0,
    'max-classes-per-file': 0,
  },
};
