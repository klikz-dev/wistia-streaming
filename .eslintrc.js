module.exports = {
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    'no-console': ['error', { allow: ['log', 'warn', 'error'] }],
  },
}
