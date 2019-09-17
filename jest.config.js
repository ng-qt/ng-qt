module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: 'TS151001',
      },
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [
        require.resolve(
          'jest-preset-angular/InlineHtmlStripStylesTransformer.js',
        ),
      ],
    },
  },
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/packages/testing/index.ts'],
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@ng-qt/(.*)': '<rootDir>/packages/$1',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'html'],
  modulePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/dist',
    '<rootDir>/bazel-*',
  ],
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
