module.exports = {
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:react/recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'prettier/prettier',
  ],
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    // NextJs specific fix: suppress errors for missing 'import React' in files for nextjs
    'react/react-in-jsx-scope': 'off',
    // NextJs specific fix: allow jsx syntax in js files
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-indent-props': 'off',
    'react/jsx-uses-vars': 'error',
    // 'react/prop-types': [2, { ignore: ['children'] }],
    'react/prop-types': 'off',
    'prettier/prettier': ['error'],
  },
  globals: {
    document: true,
    theme: true,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      alias: {
        map: [
          ['@components', './components/'],
          ['@data', './data/'],
          ['@pages', './pages/'],
          ['@public', './public/'],
          ['@styles', './styles/'],
          ['@utilities', './utilities/'],
        ],
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
