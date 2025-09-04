module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)',
  ],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|expo|@expo|@react-navigation)/)',
  ],
  setupFiles: [],
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!app/**/*.d.ts',
    '!app/**/__tests__/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
