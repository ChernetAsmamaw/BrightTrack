import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import { Strand } from '../types';
import { ProgressBar } from './ProgressBar';
import { StudentRow } from './StudentRow';

interface StrandCardProps {
  strand: Strand;
  onStudentPress: (studentId: string) => void;
}

const STRAND_ICONS = {
  letterIdentification: 'alphabetical',
  letterNaming: 'format-letter-case',
  letterFormation: 'pencil',
  phonemicAwareness: 'music-note',
} as const;

export const StrandCard: React.FC<StrandCardProps> = ({ strand, onStudentPress }) => {
  const renderStudent = ({ item }: { item: any }) => (
    <StudentRow student={item} onPress={onStudentPress} />
  );

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return theme.colors.success;
    if (percentage >= 60) return theme.colors.info;
    if (percentage >= 40) return theme.colors.warning;
    return theme.colors.error;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(124, 58, 237, 0.03)', 'rgba(139, 92, 246, 0.03)']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons 
                name={STRAND_ICONS[strand.key as keyof typeof STRAND_ICONS]} 
                size={24} 
                color={theme.colors.primary} 
              />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{strand.name}</Text>
              <Text style={styles.description}>{strand.description}</Text>
            </View>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>
              Work covered — {strand.workCoveredPct}%
            </Text>
            <View style={styles.progressIcon}>
              <MaterialCommunityIcons 
                name="chart-line" 
                size={16} 
                color={getProgressColor(strand.workCoveredPct)} 
              />
            </View>
          </View>
          <ProgressBar 
            value={strand.workCoveredPct} 
            color={getProgressColor(strand.workCoveredPct)}
            height={10}
          />
        </View>

        <View style={styles.studentsSection}>
          <View style={styles.studentsHeader}>
            <MaterialCommunityIcons 
              name="account-group" 
              size={20} 
              color={theme.colors.textSecondary} 
            />
            <Text style={styles.studentsTitle}>Students ({strand.students.length})</Text>
          </View>
          
          {strand.students.length > 0 ? (
            <FlatList
              data={strand.students}
              renderItem={renderStudent}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              nestedScrollEnabled={true}
            />
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons 
                name="account-off" 
                size={32} 
                color={theme.colors.textTertiary} 
              />
              <Text style={styles.emptyText}>No students found</Text>
            </View>
          )}
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
    marginBottom: theme.spacing.lg,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.card,
    backgroundColor: theme.colors.primaryLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  progressSection: {
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.card,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  progressLabel: {
    ...theme.typography.captionMedium,
    color: theme.colors.textSecondary,
  },
  progressIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentsSection: {
    flex: 1,
  },
  studentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  studentsTitle: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.sm,
  },
  emptyState: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textTertiary,
    marginTop: theme.spacing.sm,
  },
});
