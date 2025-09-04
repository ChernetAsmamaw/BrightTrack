import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StrandKey, MasteryLevel } from '../types';
import { STRANDS, MASTERY_LEVELS } from '../constants';
import { theme } from '../theme';

interface FilterChipsProps {
  selectedStrands: StrandKey[];
  selectedMasteries: MasteryLevel[];
  onStrandToggle: (strand: StrandKey) => void;
  onMasteryToggle: (mastery: MasteryLevel) => void;
  onClearFilters: () => void;
}

export const FilterChips: React.FC<FilterChipsProps> = ({
  selectedStrands,
  selectedMasteries,
  onStrandToggle,
  onMasteryToggle,
  onClearFilters,
}) => {
  const hasActiveFilters = selectedStrands.length > 0 || selectedMasteries.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Filters</Text>
        {hasActiveFilters && (
          <TouchableOpacity 
            onPress={onClearFilters}
            style={styles.clearButton}
            accessibilityLabel="Clear all filters"
          >
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.chipContainer}>
          <Text style={styles.sectionTitle}>Strands</Text>
          <View style={styles.chipsRow}>
            {Object.entries(STRANDS).map(([key, strand]) => {
              const isSelected = selectedStrands.includes(key as StrandKey);
              return (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.chip,
                    isSelected && styles.chipSelected,
                  ]}
                  onPress={() => onStrandToggle(key as StrandKey)}
                  accessibilityLabel={`Filter by ${strand.name}`}
                  accessibilityHint={`${isSelected ? 'Remove' : 'Add'} ${strand.name} filter`}
                >
                  {isSelected && (
                    <MaterialCommunityIcons 
                      name="check" 
                      size={16} 
                      color="#FFFFFF" 
                      style={styles.checkIcon}
                    />
                  )}
                  <Text style={[
                    styles.chipText,
                    isSelected && styles.chipTextSelected,
                  ]}>
                    {strand.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.chipContainer}>
          <Text style={styles.sectionTitle}>Mastery</Text>
          <View style={styles.chipsRow}>
            {MASTERY_LEVELS.map((mastery) => {
              const isSelected = selectedMasteries.includes(mastery);
              return (
                <TouchableOpacity
                  key={mastery}
                  style={[
                    styles.chip,
                    styles.masteryChip,
                    { backgroundColor: theme.colors.mastery[mastery] },
                    isSelected && styles.masteryChipSelected,
                  ]}
                  onPress={() => onMasteryToggle(mastery)}
                  accessibilityLabel={`Filter by ${mastery} mastery`}
                  accessibilityHint={`${isSelected ? 'Remove' : 'Add'} ${mastery} filter`}
                >
                  {isSelected && (
                    <MaterialCommunityIcons 
                      name="check" 
                      size={16} 
                      color="#FFFFFF" 
                      style={styles.checkIcon}
                    />
                  )}
                  <Text style={[
                    styles.chipText,
                    styles.masteryChipText,
                    isSelected && styles.masteryChipTextSelected,
                  ]}>
                    {mastery}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.textPrimary,
  },
  clearButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  clearText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  scrollView: {
    flexGrow: 0,
  },
  chipContainer: {
    marginRight: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
    fontWeight: '600',
  },
  chipsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  chip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.cardSurface,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  chipSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  chipText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  masteryChip: {
    borderColor: 'transparent',
  },
  masteryChipSelected: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  masteryChipText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  masteryChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  checkIcon: {
    marginRight: theme.spacing.xs,
  },
});
