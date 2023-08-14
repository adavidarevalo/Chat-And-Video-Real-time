module.exports = {
  transformIgnorePatterns: ['node_modules/(?!axios)/'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-extended'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },

  moduleNameMapper: {
    axios: 'axios/dist/node/axios.cjs',
  },
};
