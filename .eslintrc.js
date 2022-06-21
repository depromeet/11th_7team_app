module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: { ecmaVersion: 8 },
  ignorePatterns: ['node_modules/*', '!.prettierrc.js'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        react: { version: 'detect' },
        'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
      },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        'eslint:recommended',
        'prettier',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/typescript',
        'plugin:import/recommended',
      ],
      plugins: ['prettier','react', 'react-native', 'import', 'simple-import-sort'],
      rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            selector: 'variable',
            leadingUnderscore: 'allow',
          },
          { format: ['camelCase', 'PascalCase'], selector: 'function' },
          { format: ['PascalCase'], selector: 'interface' },
          { format: ['PascalCase'], selector: 'typeAlias' },
        ],
        '@typescript-eslint/no-unused-vars': [
          2,
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        'prefer-const': 'error',
        'no-var': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'react/prop-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'import/no-duplicates': 'error',
        'import/default': 'off',
        'import/first': 'error',
        'import/named': 'off',
        'import/namespace': 'off',
        'import/no-unresolved': 'off',
        'simple-import-sort/exports': 'error',
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // react > next > @ > ~ > a~z
              ['^react$', '^next', '^@', '^[a-z]'],
              // `../` > './'
              ['^~'],
              ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Side effect imports
              ['^\\u0000'],
            ],
          },
        ],
      },
    },
  ],
};
