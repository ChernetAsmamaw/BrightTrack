import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';

interface LoadingStateProps {
  type?: 'cards' | 'spinner' | 'fullscreen';
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  type = 'fullscreen', 
  message = 'Loading...' 
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Spinning animation
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );

    // Pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    // Fade in animation
    const fadeAnimation = Animated.timing(fadeValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    });

    spinAnimation.start();
    pulseAnimation.start();
    fadeAnimation.start();

    return () => {
      spinAnimation.stop();
      pulseAnimation.stop();
    };
  }, [spinValue, pulseValue, fadeValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (type === 'spinner') {
    return (
      <View style={styles.spinnerContainer}>
        <Animated.View
          style={[
            styles.spinner,
            {
              transform: [{ rotate: spin }],
              opacity: fadeValue,
            },
          ]}
        >
          <MaterialCommunityIcons 
            name="loading" 
            size={32} 
            color={theme.colors.primary} 
          />
        </Animated.View>
        <Animated.Text style={[styles.spinnerText, { opacity: fadeValue }]}>
          {message}
        </Animated.Text>
      </View>
    );
  }

  if (type === 'cards') {
    return (
      <View style={styles.cardsContainer}>
        {[1, 2, 3, 4].map((index) => (
          <Animated.View 
            key={index} 
            style={[
              styles.skeletonCard,
              {
                opacity: fadeValue,
                transform: [{ scale: pulseValue }],
              },
            ]}
          >
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
          </Animated.View>
        ))}
      </View>
    );
  }

  // Fullscreen loading
  return (
    <View style={styles.fullscreenContainer}>
      <LinearGradient
        colors={theme.colors.primaryGradient}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View
          style={[
            styles.loadingContent,
            {
              opacity: fadeValue,
              transform: [{ scale: pulseValue }],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.iconContainer,
              {
                transform: [{ rotate: spin }],
              },
            ]}
          >
            <MaterialCommunityIcons 
              name="school" 
              size={48} 
              color="#FFFFFF" 
            />
          </Animated.View>
          
          <Text style={styles.loadingTitle}>BrightTrack</Text>
          <Text style={styles.loadingMessage}>{message}</Text>
          
          <View style={styles.loadingDots}>
            {[0, 1, 2].map((index) => (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    opacity: pulseValue,
                    transform: [{ scale: pulseValue }],
                  },
                ]}
              />
            ))}
          </View>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  fullscreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
  },
  loadingTitle: {
    ...theme.typography.h1,
    color: '#FFFFFF',
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  loadingMessage: {
    ...theme.typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  spinnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  spinner: {
    marginBottom: theme.spacing.lg,
  },
  spinnerText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  cardsContainer: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  skeletonCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.card,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
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
