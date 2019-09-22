module.exports = {
  preset: 'jest-preset-angular',
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: 'TS151001',
      },
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|css)$',
      astTransformers: [
        '<rootDir>/dist/testing/jest/inline-assets-transformer.js',
      ],
    },
  },
  collectCoverage: true,
  coverageReporters: ['json'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/packages/testing/index.ts'],
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html|css)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@ng-qt/(.*)': '<rootDir>/packages/$1',
  },
  moduleFileExtensions: ['ts', 'js', 'html', 'json', 'css'],
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
