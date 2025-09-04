export const images = {
  avatar: require('../assets/images/avator-placeholder.jpg'),
  emptyState: require('../assets/images/empty-state.webp'),
  noStudent: require('../assets/images/no-student-found.webp'),
  teacher: require('../assets/images/teacher.webp'),
} as const;

export type ImageKey = keyof typeof images;
