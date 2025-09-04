import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { theme } from '../theme';
import { images } from '../assets';

interface EmptyStateProps {
  type: 'noStudents' | 'noResults' | 'noData';
  title?: string;
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  type, 
  title, 
  message 
}) => {
  const getContent = () => {
    switch (type) {
      case 'noStudents':
        return {
          image: images.emptyState,
          defaultTitle: 'No Students Found',
          defaultMessage: 'There are no students in this strand yet.',
        };
      case 'noResults':
        return {
          image: images.noStudent,
          defaultTitle: 'No Results Found',
          defaultMessage: 'Try adjusting your search or filters.',
        };
      case 'noData':
        return {
          image: images.emptyState,
          defaultTitle: 'No Data Available',
          defaultMessage: 'Performance data is not available for this strand.',
        };
    }
  };

  const content = getContent();

  return (
    <View style={styles.container}>
      <Image
        source={content.image}
        style={styles.image}
        contentFit="contain"
        accessibilityLabel={`${content.defaultTitle} illustration`}
      />
      <Text style={styles.title}>{title || content.defaultTitle}</Text>
      <Text style={styles.message}>{message || content.defaultMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  message: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
