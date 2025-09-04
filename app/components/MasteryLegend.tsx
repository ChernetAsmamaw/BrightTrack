import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import { MasteryChip } from './MasteryChip';

const MASTERY_DESCRIPTIONS = {
  BE: { name: 'Below Expectation', description: 'Needs significant support' },
  AE: { name: 'Approaching Expectation', description: 'Developing with some support needed' },
  ME: { name: 'Meeting Expectation', description: 'Consistently meets standards' },
  EE: { name: 'Exceeding Expectation', description: 'Advanced mastery achieved' },
} as const;

export const MasteryLegend: React.FC = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(124, 58, 237, 0.05)', 'rgba(139, 92, 246, 0.05)']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <MaterialCommunityIcons 
            name="key-variant" 
            size={24} 
            color={theme.colors.primary} 
          />
          <Text style={styles.title}>Mastery Key</Text>
        </View>
        
        <View style={styles.legendGrid}>
          {Object.entries(MASTERY_DESCRIPTIONS).map(([code, info]) => (
            <View key={code} style={styles.legendItem}>
              <View style={styles.masterySection}>
                <MasteryChip mastery={code as any} size="medium" />
                <Text style={styles.masteryName}>{info.name}</Text>
              </View>
              <Text style={styles.description}>{info.description}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  gradient: {
    padding: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.sm,
  },
  legendGrid: {
    gap: theme.spacing.lg,
  },
  legendItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.card,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  masterySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    gap: theme.spacing.md,
  },
  masteryName: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textPrimary,
    flex: 1,
  },
  description: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
});
