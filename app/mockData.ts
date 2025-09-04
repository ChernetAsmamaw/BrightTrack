import { ClassProfile, Student } from './types';

export const mockClassProfile: ClassProfile = {
  strands: {
    letterIdentification: {
      workCoveredPct: 85,
      students: [
        { id: '1', name: 'Emma Johnson', mastery: 'EE', progressPct: 95 },
        { id: '2', name: 'Liam Smith', mastery: 'ME', progressPct: 78 },
        { id: '3', name: 'Olivia Davis', mastery: 'AE', progressPct: 65 },
        { id: '4', name: 'Noah Wilson', mastery: 'BE', progressPct: 45 },
        { id: '5', name: 'Ava Brown', mastery: 'EE', progressPct: 92 },
      ],
    },
    letterNaming: {
      workCoveredPct: 72,
      students: [
        { id: '1', name: 'Emma Johnson', mastery: 'ME', progressPct: 82 },
        { id: '2', name: 'Liam Smith', mastery: 'EE', progressPct: 88 },
        { id: '3', name: 'Olivia Davis', mastery: 'ME', progressPct: 75 },
        { id: '4', name: 'Noah Wilson', mastery: 'AE', progressPct: 58 },
        { id: '5', name: 'Ava Brown', mastery: 'ME', progressPct: 79 },
      ],
    },
    letterFormation: {
      workCoveredPct: 68,
      students: [
        { id: '1', name: 'Emma Johnson', mastery: 'AE', progressPct: 62 },
        { id: '2', name: 'Liam Smith', mastery: 'BE', progressPct: 48 },
        { id: '3', name: 'Olivia Davis', mastery: 'ME', progressPct: 76 },
        { id: '4', name: 'Noah Wilson', mastery: 'BE', progressPct: 42 },
        { id: '5', name: 'Ava Brown', mastery: 'AE', progressPct: 68 },
      ],
    },
    phonemicAwareness: {
      workCoveredPct: 90,
      students: [
        { id: '1', name: 'Emma Johnson', mastery: 'EE', progressPct: 98 },
        { id: '2', name: 'Liam Smith', mastery: 'ME', progressPct: 85 },
        { id: '3', name: 'Olivia Davis', mastery: 'EE', progressPct: 94 },
        { id: '4', name: 'Noah Wilson', mastery: 'AE', progressPct: 72 },
        { id: '5', name: 'Ava Brown', mastery: 'ME', progressPct: 87 },
      ],
    },
  },
};

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    strands: {
      letterIdentification: { mastery: 'EE', progressPct: 95 },
      letterNaming: { mastery: 'ME', progressPct: 82 },
      letterFormation: { mastery: 'AE', progressPct: 62 },
      phonemicAwareness: { mastery: 'EE', progressPct: 98 },
    },
  },
  {
    id: '2',
    name: 'Liam Smith',
    strands: {
      letterIdentification: { mastery: 'ME', progressPct: 78 },
      letterNaming: { mastery: 'EE', progressPct: 88 },
      letterFormation: { mastery: 'BE', progressPct: 48 },
      phonemicAwareness: { mastery: 'ME', progressPct: 85 },
    },
  },
  {
    id: '3',
    name: 'Olivia Davis',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    strands: {
      letterIdentification: { mastery: 'AE', progressPct: 65 },
      letterNaming: { mastery: 'ME', progressPct: 75 },
      letterFormation: { mastery: 'ME', progressPct: 76 },
      phonemicAwareness: { mastery: 'EE', progressPct: 94 },
    },
  },
  {
    id: '4',
    name: 'Noah Wilson',
    strands: {
      letterIdentification: { mastery: 'BE', progressPct: 45 },
      letterNaming: { mastery: 'AE', progressPct: 58 },
      letterFormation: { mastery: 'BE', progressPct: 42 },
      phonemicAwareness: { mastery: 'AE', progressPct: 72 },
    },
  },
  {
    id: '5',
    name: 'Ava Brown',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    strands: {
      letterIdentification: { mastery: 'EE', progressPct: 92 },
      letterNaming: { mastery: 'ME', progressPct: 79 },
      letterFormation: { mastery: 'AE', progressPct: 68 },
      phonemicAwareness: { mastery: 'ME', progressPct: 87 },
    },
  },
];
