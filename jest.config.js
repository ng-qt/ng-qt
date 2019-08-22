module.exports = {
  rootDir: process.cwd(),
  globals: {
    'ts-jest': {
      tsConfigFile: './tsconfig.spec.json'
    }
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js)$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'html'],
};