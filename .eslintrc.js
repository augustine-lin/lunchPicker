module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
      'react',
      'react-hooks'
  ],
  rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'eqeqeq': 'error',
      'semi': ["error", "never"],
      'quotes': ["error", "single"],
      'react/jsx-filename-extension': [1, { "extensions": [".js", ".jsx"] }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'linebreak-style': ['error', 'windows'],
      'linebreak-style': 0
  }
};
