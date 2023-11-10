module.exports = {
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'es5',
  semi: true,
  quoteProps: 'consistent',
  endOfLine: 'auto',
  parser: 'typescript',
  overrides: [
    {
      files: ['*.json'],
      options: {
        parser: 'json-stringify',
      },
    },
    {
      files: ['*.css'],
      options: {
        parser: 'css',
      },
    },
  ],
};
