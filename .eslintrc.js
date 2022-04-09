module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:import/typescript',
    'plugin:import/recommended',
    'prettier',
  ],
  plugins: ['react', 'react-native', 'import', 'prettier'],
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        selector: 'variable',
        leadingUnderscore: 'allow',
      },
      {format: ['camelCase', 'PascalCase'], selector: 'function'},
      {format: ['PascalCase'], selector: 'interface'},
      {format: ['PascalCase'], selector: 'typeAlias'},
    ],
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': [
      2,
      {argsIgnorePattern: '^_', varsIgnorePattern: '^_'},
    ],
    'prefer-const': 'error',
    'no-var': 'error',
    'import/no-duplicates': 'error',
    'import/default': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
};
