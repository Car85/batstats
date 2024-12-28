export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(react-pivottable|uuid|other-es-modules)/)',
  ],
  moduleNameMapper: {
    '^.+\\.(css|scss|svg|png|jpg|jpeg)$': 'identity-obj-proxy',
  },
};
