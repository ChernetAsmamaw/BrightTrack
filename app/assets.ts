export const images = {
  avatar: null, // Will use initials instead of image
  emptyState: require('../assets/images/student.webp'),
  noStudent: require('../assets/images/student.webp'),
  teacher: require('../assets/images/teacher.webp'),
} as const;

export type ImageKey = keyof typeof images;
