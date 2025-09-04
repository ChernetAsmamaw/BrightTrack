export type MasteryLevel = 'BE' | 'AE' | 'ME' | 'EE';

export type StrandKey = 'letterIdentification' | 'letterNaming' | 'letterFormation' | 'phonemicAwareness';

export interface Strand {
  key: StrandKey;
  name: string;
  description: string;
  workCoveredPct: number;
  students: StudentSummary[];
}

export interface StudentSummary {
  id: string;
  name: string;
  avatarUrl?: string;
  mastery: MasteryLevel;
  progressPct: number;
}

export interface Student {
  id: string;
  name: string;
  avatarUrl?: string;
  strands: {
    [key in StrandKey]: {
      mastery: MasteryLevel;
      progressPct: number;
    };
  };
}

export interface ClassProfile {
  strands: {
    [key in StrandKey]: {
      workCoveredPct: number;
      students: StudentSummary[];
    };
  };
}

export interface FilterState {
  searchQuery: string;
  selectedStrands: StrandKey[];
  selectedMasteries: MasteryLevel[];
}

export interface ExportData {
  studentName: string;
  strand: string;
  mastery: MasteryLevel;
  workProgress: number;
  exportedAt: string;
}
