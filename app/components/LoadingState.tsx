import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { theme } from '../theme';

interface LoadingStateProps {
  type?: 'cards' | 'spinner';
}

export const LoadingState: React.FC<LoadingStateProps> = ({ type = 'cards' }) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [animatedValue]);

  if (type === 'spinner') {
    return (
      <View style={styles.spinnerContainer}>
        <Animated.View
          style={[
            styles.spinner,
            {
              opacity: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 1],
              }),
            },
          ]}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4].map((index) => (
        <View key={index} style={styles.skeletonCard}>
          <View style={styles.skeletonHeader}>
            <View style={styles.skeletonTitle} />
            <View style={styles.skeletonDescription} />
          </View>
          <View style={styles.skeletonProgress}>
            <View style={styles.skeletonProgressLabel} />
            <View style={styles.skeletonProgressBar} />
          </View>
          <View style={styles.skeletonStudents}>
            <View style={styles.skeletonStudentsTitle} />
            {[1, 2, 3].map((studentIndex) => (
              <View key={studentIndex} style={styles.skeletonStudentRow}>
                <View style={styles.skeletonAvatar} />
                <View style={styles.skeletonStudentName} />
                <View style={styles.skeletonMastery} />
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  spinnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
  },
  skeletonCard: {
    backgroundColor: theme.colors.cardSurface,
    borderRadius: theme.borderRadius.card,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  skeletonHeader: {
    marginBottom: theme.spacing.lg,
  },
  skeletonTitle: {
    height: 24,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    marginBottom: theme.spacing.xs,
    width: '60%',
  },
  skeletonDescription: {
    height: 16,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    width: '80%',
  },
  skeletonProgress: {
    marginBottom: theme.spacing.lg,
  },
  skeletonProgressLabel: {
    height: 14,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    marginBottom: theme.spacing.sm,
    width: '40%',
  },
  skeletonProgressBar: {
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.pill,
  },
  skeletonStudents: {
    flex: 1,
  },
  skeletonStudentsTitle: {
    height: 20,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    marginBottom: theme.spacing.md,
    width: '30%',
  },
  skeletonStudentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  skeletonAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.border,
    marginRight: theme.spacing.md,
  },
  skeletonStudentName: {
    flex: 1,
    height: 16,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    marginRight: theme.spacing.md,
  },
  skeletonMastery: {
    width: 40,
    height: 24,
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.pill,
  },
});
