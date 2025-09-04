// Mock expo modules
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
}));

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
}));

jest.mock('expo-file-system', () => ({
  documentDirectory: '/tmp/',
  writeAsStringAsync: jest.fn(),
}));

jest.mock('expo-sharing', () => ({
  shareAsync: jest.fn(),
}));

jest.mock('expo-image', () => 'Image');

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  MaterialCommunityIcons: 'MaterialCommunityIcons',
}));

// Global fetch mock
global.fetch = jest.fn();

// Console error suppression for tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
