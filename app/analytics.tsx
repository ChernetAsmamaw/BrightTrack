import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header } from './components/Header';
import { useBrightTrackStore } from './store';
import { theme } from './theme';

export default function AnalyticsScreen() {
  const { classProfile, students } = useBrightTrackStore();

  const getMasteryDistribution = () => {
    const distribution = { BE: 0, AE: 0, ME: 0, EE: 0 };
    
    if (classProfile) {
      Object.values(classProfile.strands).forEach(strand => {
        strand.students.forEach(student => {
          distribution[student.mastery]++;
        });
      });
    }
    
    return distribution;
  };

  const masteryDistribution = getMasteryDistribution();
  const totalStudents = students.length;

  return (
    <View style={styles.container}>
      <Header 
        title="Analytics" 
        subtitle="Performance Insights"
        showTeacherImage={false}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <MaterialCommunityIcons 
                name="account-group" 
                size={24} 
                color={theme.colors.primary} 
              />
              <Text style={styles.statNumber}>{totalStudents}</Text>
              <Text style={styles.statLabel}>Total Students</Text>
            </View>
            
            <View style={styles.statCard}>
              <MaterialCommunityIcons 
                name="book-open-variant" 
                size={24} 
                color={theme.colors.info} 
              />
              <Text style={styles.statNumber}>4</Text>
              <Text style={styles.statLabel}>Learning Strands</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mastery Distribution</Text>
            <View style={styles.masteryGrid}>
              {Object.entries(masteryDistribution).map(([mastery, count]) => (
                <View key={mastery} style={styles.masteryCard}>
                  <View style={[styles.masteryIndicator, { backgroundColor: theme.colors.mastery[mastery as keyof typeof theme.colors.mastery] }]} />
                  <Text style={styles.masteryCode}>{mastery}</Text>
                  <Text style={styles.masteryCount}>{count}</Text>
                  <Text style={styles.masteryPercentage}>
                    {totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0}%
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Strand Performance</Text>
            {classProfile && Object.entries(classProfile.strands).map(([strandKey, strand]) => (
              <View key={strandKey} style={styles.strandCard}>
                <View style={styles.strandHeader}>
                  <Text style={styles.strandName}>{strandKey.replace(/([A-Z])/g, ' $1').trim()}</Text>
                  <Text style={styles.strandProgress}>{strand.workCoveredPct}%</Text>
                </View>
                <View style={styles.strandBar}>
                  <View 
                    style={[
                      styles.strandBarFill, 
                      { 
                        width: `${strand.workCoveredPct}%`,
                        backgroundColor: strand.workCoveredPct >= 80 ? theme.colors.success : 
                                       strand.workCoveredPct >= 60 ? theme.colors.info :
                                       strand.workCoveredPct >= 40 ? theme.colors.warning : 
                                       theme.colors.error
                      }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.card,
    padding: theme.spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  statNumber: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    marginVertical: theme.spacing.sm,
  },
  statLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  masteryGrid: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  masteryCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.card,
    padding: theme.spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  masteryIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginBottom: theme.spacing.xs,
  },
  masteryCode: {
    ...theme.typography.captionMedium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  masteryCount: {
    ...theme.typography.h2,
    color: theme.colors.textPrimary,
  },
  masteryPercentage: {
    ...theme.typography.small,
    color: theme.colors.textSecondary,
  },
  strandCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.card,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  strandHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  strandName: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textPrimary,
  },
  strandProgress: {
    ...theme.typography.captionMedium,
    color: theme.colors.textSecondary,
  },
  strandBar: {
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.pill,
    overflow: 'hidden',
  },
  strandBarFill: {
    height: '100%',
    borderRadius: theme.borderRadius.pill,
  },
});
