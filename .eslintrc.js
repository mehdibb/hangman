module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended',
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:typescript-sort-keys/recommended',
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'tailwindcss/no-custom-classname': 'error',
      },
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
    {
      files: ['*.spec.ts', '*.spec.tsx'],
      rules: {
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'no-relative-import-paths'],
  rules: {
    'no-relative-import-paths/no-relative-import-paths': [
      'error',
      { allowSameFolder: true },
    ],
    'import/order': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
};
