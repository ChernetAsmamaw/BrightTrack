import { StrandKey } from './types';

export const STRANDS: Record<StrandKey, { name: string; description: string }> = {
  letterIdentification: {
    name: 'Letter Identification',
    description: 'Recognizing and identifying letters',
  },
  letterNaming: {
    name: 'Letter Naming',
    description: 'Correctly naming letters when shown',
  },
  letterFormation: {
    name: 'Letter Formation',
    description: 'Proper handwriting and letter construction',
  },
  phonemicAwareness: {
    name: 'Phonemic Awareness',
    description: 'Understanding letter sounds and phonics',
  },
};

export const MASTERY_LEVELS = ['BE', 'AE', 'ME', 'EE'] as const;

export const API_BASE_URL = 'https://api.brighttrack.com'; // Replace with actual API URL

export const DEBOUNCE_DELAY = 300;
