import { create } from 'zustand';
import { ClassProfile, Student, StrandKey, MasteryLevel, FilterState, ExportData } from './types';
import { API_BASE_URL } from './constants';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

interface BrightTrackStore {
  // State
  searchQuery: string;
  selectedStrands: StrandKey[];
  selectedMasteries: MasteryLevel[];
  classProfile: ClassProfile | null;
  students: Student[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;

  // Actions
  fetchClassProfile: () => Promise<void>;
  fetchStudents: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: { strands?: StrandKey[]; masteries?: MasteryLevel[] }) => void;
  clearFilters: () => void;
  refreshData: () => Promise<void>;
  generateStudentExport: (studentId: string) => Promise<void>;

  // Selectors
  getStudentById: (id: string) => Student | undefined;
  getStudentsForStrand: (strandKey: StrandKey) => Student[];
  filteredClassProfile: (strandKey: StrandKey) => any;
}

export const useBrightTrackStore = create<BrightTrackStore>((set, get) => ({
  // Initial state
  searchQuery: '',
  selectedStrands: [],
  selectedMasteries: [],
  classProfile: null,
  students: [],
  isLoading: false,
  error: null,
  lastUpdated: null,

  // Actions
  fetchClassProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use mock data for development
      const { mockClassProfile } = await import('./mockData');
      set({ 
        classProfile: mockClassProfile, 
        isLoading: false, 
        lastUpdated: Date.now() 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error', 
        isLoading: false 
      });
    }
  },

  fetchStudents: async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Use mock data for development
      const { mockStudents } = await import('./mockData');
      set({ students: mockStudents });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  setFilters: (filters) => {
    set((state) => ({
      selectedStrands: filters.strands ?? state.selectedStrands,
      selectedMasteries: filters.masteries ?? state.selectedMasteries,
    }));
  },

  clearFilters: () => {
    set({ selectedStrands: [], selectedMasteries: [], searchQuery: '' });
  },

  refreshData: async () => {
    await Promise.all([
      get().fetchClassProfile(),
      get().fetchStudents(),
    ]);
  },

  generateStudentExport: async (studentId: string) => {
    const student = get().getStudentById(studentId);
    if (!student) return;

    const exportData: ExportData[] = [];
    const strandNames = {
      letterIdentification: 'Letter Identification',
      letterNaming: 'Letter Naming',
      letterFormation: 'Letter Formation',
      phonemicAwareness: 'Phonemic Awareness',
    };

    Object.entries(student.strands).forEach(([strandKey, data]) => {
      exportData.push({
        studentName: student.name,
        strand: strandNames[strandKey as keyof typeof strandNames],
        mastery: data.mastery,
        workProgress: data.progressPct,
        exportedAt: new Date().toISOString(),
      });
    });

    const csvContent = [
      'Student Name,Strand,Mastery,Work Progress %,Exported At',
      ...exportData.map(row => 
        `"${row.studentName}","${row.strand}","${row.mastery}",${row.workProgress},"${row.exportedAt}"`
      ),
    ].join('\n');

    const fileName = `${student.name.replace(/\s+/g, '_')}_performance_${Date.now()}.csv`;
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    try {
      await FileSystem.writeAsStringAsync(fileUri, csvContent);
      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/csv',
        dialogTitle: `Export ${student.name}'s Performance`,
      });
    } catch (error) {
      console.error('Export failed:', error);
    }
  },

  // Selectors
  getStudentById: (id: string) => {
    return get().students.find(student => student.id === id);
  },

  getStudentsForStrand: (strandKey: StrandKey) => {
    const { students, searchQuery, selectedStrands, selectedMasteries } = get();
    
    return students.filter(student => {
      // Apply search filter
      if (searchQuery && !student.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Apply strand filter
      if (selectedStrands.length > 0 && !selectedStrands.includes(strandKey)) {
        return false;
      }

      // Apply mastery filter
      if (selectedMasteries.length > 0 && !selectedMasteries.includes(student.strands[strandKey].mastery)) {
        return false;
      }

      return true;
    });
  },

  filteredClassProfile: (strandKey: StrandKey) => {
    const { classProfile, searchQuery, selectedStrands, selectedMasteries } = get();
    
    if (!classProfile) return null;

    const strandData = classProfile.strands[strandKey];
    if (!strandData) return null;

    let filteredStudents = strandData.students;

    // Apply search filter
    if (searchQuery) {
      filteredStudents = filteredStudents.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply mastery filter
    if (selectedMasteries.length > 0) {
      filteredStudents = filteredStudents.filter(student =>
        selectedMasteries.includes(student.mastery)
      );
    }

    return {
      ...strandData,
      students: filteredStudents,
    };
  },
}));
