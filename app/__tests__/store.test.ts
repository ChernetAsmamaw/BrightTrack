import { useBrightTrackStore } from '../store';

// Mock API responses
jest.mock('expo-file-system', () => ({
  documentDirectory: '/tmp/',
  writeAsStringAsync: jest.fn(),
}));

jest.mock('expo-sharing', () => ({
  shareAsync: jest.fn(),
}));

// Mock fetch for API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      strands: [
        {
          strandId: 'strand1',
          strand: 'Letter Identification',
          workCovered: 85,
          students: [
            { studentId: '1', name: 'John Doe', competence: 'EE' },
            { studentId: '2', name: 'Jane Smith', competence: 'ME' },
          ],
        },
      ],
    }),
  })
) as jest.Mock;

describe('BrightTrack Store Logic', () => {
  beforeEach(() => {
    // Reset store state before each test
    useBrightTrackStore.setState({
      searchQuery: '',
      selectedStrands: [],
      selectedMasteries: [],
      classProfile: null,
      students: [],
      isLoading: false,
      error: null,
      lastUpdated: null,
    });
  });

  describe('Filter Logic', () => {
    it('should set search query', () => {
      useBrightTrackStore.getState().setSearchQuery('Emma');
      expect(useBrightTrackStore.getState().searchQuery).toBe('Emma');
    });

    it('should set mastery filters', () => {
      useBrightTrackStore.getState().setFilters({ masteries: ['EE'] });
      expect(useBrightTrackStore.getState().selectedMasteries).toEqual(['EE']);
    });

    it('should set strand filters', () => {
      useBrightTrackStore.getState().setFilters({ strands: ['letterIdentification'] });
      expect(useBrightTrackStore.getState().selectedStrands).toEqual(['letterIdentification']);
    });

    it('should clear all filters', () => {
      useBrightTrackStore.getState().setSearchQuery('Emma');
      useBrightTrackStore.getState().setFilters({ masteries: ['EE'] });
      useBrightTrackStore.getState().clearFilters();
      
      expect(useBrightTrackStore.getState().searchQuery).toBe('');
      expect(useBrightTrackStore.getState().selectedMasteries).toHaveLength(0);
      expect(useBrightTrackStore.getState().selectedStrands).toHaveLength(0);
    });
  });

  describe('Selectors', () => {
    it('should get student by ID when exists', () => {
      const mockStudents = [
        { id: '1', name: 'Emma Johnson', strands: {} as any },
        { id: '2', name: 'Liam Smith', strands: {} as any },
      ];
      
      useBrightTrackStore.setState({ students: mockStudents });
      
      const student = useBrightTrackStore.getState().getStudentById('1');
      expect(student).toBeDefined();
      expect(student?.name).toBe('Emma Johnson');
    });

    it('should return undefined for non-existent student', () => {
      const mockStudents = [
        { id: '1', name: 'Emma Johnson', strands: {} as any },
      ];
      
      useBrightTrackStore.setState({ students: mockStudents });
      
      const student = useBrightTrackStore.getState().getStudentById('999');
      expect(student).toBeUndefined();
    });
  });

  describe('Data State', () => {
    it('should have initial state', () => {
      const state = useBrightTrackStore.getState();
      expect(state.searchQuery).toBe('');
      expect(state.selectedStrands).toHaveLength(0);
      expect(state.selectedMasteries).toHaveLength(0);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should set loading state', () => {
      useBrightTrackStore.setState({ isLoading: true });
      expect(useBrightTrackStore.getState().isLoading).toBe(true);
    });

    it('should set error state', () => {
      useBrightTrackStore.setState({ error: 'Test error' });
      expect(useBrightTrackStore.getState().error).toBe('Test error');
    });
  });
});
