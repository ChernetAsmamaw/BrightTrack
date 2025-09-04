import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { create } from 'zustand';
import { API_BASE_URL } from './constants';
import { ClassProfile, ExportData, MasteryLevel, StrandKey, Student } from './types';

// Helper function to get strand description
const getStrandDescription = (strandKey: StrandKey): string => {
  const descriptions = {
    letterIdentification: 'Recognizing and identifying letters',
    letterNaming: 'Correctly naming letters when shown',
    letterFormation: 'Proper handwriting and letter construction',
    phonemicAwareness: 'Understanding letter sounds and phonics',
  };
  return descriptions[strandKey];
};

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
      const response = await fetch(`${API_BASE_URL}/class_profile`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      set({ 
        classProfile: data, 
        isLoading: false, 
        lastUpdated: Date.now() 
      });
    } catch (error) {
      console.error('Error fetching class profile:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch class profile', 
        isLoading: false 
      });
    }
  },

  fetchStudents: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/students`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      set({ students: data });
    } catch (error) {
      console.error('Error fetching students:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch students' 
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
        mastery: data.competence,
        workProgress: data.progress,
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
      if (selectedMasteries.length > 0 && !selectedMasteries.includes(student.strands[strandKey].competence)) {
        return false;
      }

      return true;
    });
  },

  filteredClassProfile: (strandKey: StrandKey) => {
    const { classProfile, searchQuery, selectedStrands, selectedMasteries } = get();
    
    if (!classProfile) return null;

    // Find the strand by mapping the key to the strand name
    const strandMapping = {
      letterIdentification: 'Letter Identification',
      letterNaming: 'Letter Naming',
      letterFormation: 'Letter Formation',
      phonemicAwareness: 'Phonemic Awareness',
    };

    const strandName = strandMapping[strandKey];
    const strandData = classProfile.strands.find(s => s.strand === strandName);
    
    if (!strandData) return null;

    // If specific strands are selected, only show those strands
    if (selectedStrands.length > 0 && !selectedStrands.includes(strandKey)) {
      return null;
    }

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
        selectedMasteries.includes(student.competence)
      );
    }

    return {
      key: strandKey,
      name: strandData.strand,
      description: getStrandDescription(strandKey),
      workCoveredPct: strandData.workCovered,
      students: filteredStudents.map(student => {
        // Try to get progress from students data
        const studentData = get().students.find(s => s.id === student.studentId);
        const progress = studentData?.strands[strandKey]?.progress || 0;
        
        return {
          id: student.studentId,
          name: student.name,
          mastery: student.competence,
          progressPct: progress,
        };
      }),
    };
  },
}));
