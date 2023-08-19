module.exports = {
  transformIgnorePatterns: [
    'node_modules/(?!axios)/',
    'node_modules/@adobe/css-tools',
    'node_modules/(?!@adobe/css-tools)'
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  typescript: {
    tsconfig: 'tsconfig.json',
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    axios: 'axios/dist/node/axios.cjs',
  },
  verbose: true,
  transform: {
    '^.+\\.(js|ts|tsx)$': 'ts-jest',
  },
};
