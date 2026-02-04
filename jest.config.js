module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
   testMatch: ['**/test/**/*.spec.ts'],
   moduleFileExtensions: ['ts', 'js', 'json'],
  clearMocks: true,
}