// run tests in qode

module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: 'TS151001',
      },
      tsConfig: '<rootDir>/tsconfig.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [require.resolve('./dist/devkit/src/utils/inline-assets-transformer.js')],
    },
  },
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/packages/testing/index.ts'],
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'html'],
  modulePathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist', '<rootDir>/bazel-*'],
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
