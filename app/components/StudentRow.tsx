import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../theme';
import { StudentSummary } from '../types';
import { MasteryChip } from './MasteryChip';

interface StudentRowProps {
  student: StudentSummary;
  onPress: (studentId: string) => void;
}

export const StudentRow: React.FC<StudentRowProps> = ({ student, onPress }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(student.id)}
      accessibilityLabel={`View ${student.name}'s performance`}
      accessibilityHint="Opens detailed view of student performance"
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.initials}>{getInitials(student.name)}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {student.name}
        </Text>
        <View style={styles.progressContainer}>
          <MaterialCommunityIcons 
            name="chart-line" 
            size={14} 
            color={theme.colors.textTertiary} 
          />
          <Text style={styles.progressText}>
            {student.progressPct > 0 ? `${student.progressPct}% progress` : 'Progress not available'}
          </Text>
        </View>
      </View>

      <View style={styles.masteryContainer}>
        <MasteryChip mastery={student.mastery} size="medium" />
        <MaterialCommunityIcons 
          name="chevron-right" 
          size={20} 
          color={theme.colors.textTertiary} 
          style={styles.chevron}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.card,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    minHeight: 72,
    ...theme.shadows.sm,
  },
  avatarContainer: {
    marginRight: theme.spacing.md,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primaryLight + '40',
  },
  initials: {
    ...theme.typography.bodyMedium,
    color: theme.colors.primaryDark,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  name: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  progressText: {
    ...theme.typography.small,
    color: theme.colors.textTertiary,
  },
  masteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: theme.spacing.md,
  },
  chevron: {
    marginLeft: theme.spacing.sm,
  },
});
