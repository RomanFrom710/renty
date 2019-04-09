module.exports = {
  testMatch: [
    '<rootDir>/**/__tests__/*',
  ],
  moduleFileExtensions: [
    'mjs',
    'js',
  ],
  testEnvironment: 'node',
  transform: {
    '\\.mjs$': 'babel-jest',
  },
};
