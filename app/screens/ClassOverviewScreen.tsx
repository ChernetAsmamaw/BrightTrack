import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { EmptyState } from '../components/EmptyState';
import { FilterChips } from '../components/FilterChips';
import { Header } from '../components/Header';
import { LoadingState } from '../components/LoadingState';
import { MasteryLegend } from '../components/MasteryLegend';
import { SearchBar } from '../components/SearchBar';
import { StrandCard } from '../components/StrandCard';
import { STRANDS } from '../constants';
import { useBrightTrackStore } from '../store';
import { theme } from '../theme';
import { StrandKey } from '../types';

export default function ClassOverviewScreen() {
  const router = useRouter();
  const {
    searchQuery,
    selectedStrands,
    selectedMasteries,
    classProfile,
    isLoading,
    error,
    setSearchQuery,
    setFilters,
    clearFilters,
    fetchClassProfile,
    fetchStudents,
    filteredClassProfile,
  } = useBrightTrackStore();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchClassProfile();
    fetchStudents();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchClassProfile(), fetchStudents()]);
    setRefreshing(false);
  };

  const handleStudentPress = (studentId: string) => {
    router.push(`/student/${studentId}`);
  };

  const handleStrandToggle = (strand: StrandKey) => {
    const newStrands = selectedStrands.includes(strand)
      ? selectedStrands.filter(s => s !== strand)
      : [...selectedStrands, strand];
    setFilters({ strands: newStrands });
  };

  const handleMasteryToggle = (mastery: any) => {
    const newMasteries = selectedMasteries.includes(mastery)
      ? selectedMasteries.filter(m => m !== mastery)
      : [...selectedMasteries, mastery];
    setFilters({ masteries: newMasteries });
  };

  const hasActiveFilters = selectedStrands.length > 0 || selectedMasteries.length > 0;
  const hasSearchQuery = searchQuery.length > 0;

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <MaterialCommunityIcons 
          name="alert-circle" 
          size={48} 
          color={theme.colors.textSecondary} 
        />
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isLoading && !classProfile) {
    return <LoadingState />;
  }

  return (
    <View style={styles.container}>
      <Header 
        title="BrightTrack" 
        subtitle="Student Performance Dashboard"
        showTeacherImage={true}
      />
      
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.searchSection}>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search students..."
            />
          </View>

          <MasteryLegend />

          <FilterChips
            selectedStrands={selectedStrands}
            selectedMasteries={selectedMasteries}
            onStrandToggle={handleStrandToggle}
            onMasteryToggle={handleMasteryToggle}
            onClearFilters={clearFilters}
          />

          {classProfile ? (
            Object.entries(STRANDS).map(([strandKey, strandInfo]) => {
              const filteredData = filteredClassProfile(strandKey as StrandKey);
              
              if (!filteredData) return null;

              const strand: any = {
                key: strandKey as StrandKey,
                name: strandInfo.name,
                description: strandInfo.description,
                workCoveredPct: filteredData.workCoveredPct,
                students: filteredData.students,
              };

              return (
                <StrandCard
                  key={strandKey}
                  strand={strand}
                  onStudentPress={handleStudentPress}
                />
              );
            })
          ) : (
            <EmptyState type="noData" />
          )}

          {hasActiveFilters || hasSearchQuery ? (
            classProfile && Object.values(classProfile.strands).every(
              strand => strand.students.length === 0
            ) && (
              <EmptyState 
                type="noResults" 
                title="No students match your filters"
                message="Try adjusting your search terms or filters to see more results."
              />
            )
          ) : null}
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
  searchSection: {
    marginBottom: theme.spacing.lg,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  errorTitle: {
    ...theme.typography.h2,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  errorMessage: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  retryButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.card,
  },
  retryText: {
    ...theme.typography.body,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
