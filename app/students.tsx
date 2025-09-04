import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { EmptyState } from './components/EmptyState';
import { Header } from './components/Header';
import { LoadingState } from './components/LoadingState';
import { SearchBar } from './components/SearchBar';
import { StudentRow } from './components/StudentRow';
import { useBrightTrackStore } from './store';
import { theme } from './theme';

export default function StudentsScreen() {
  const router = useRouter();
  const {
    searchQuery,
    students,
    isLoading,
    error,
    setSearchQuery,
    fetchStudents,
  } = useBrightTrackStore();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchStudents();
    setRefreshing(false);
  };

  const handleStudentPress = (studentId: string) => {
    router.push(`/student/${studentId}`);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  if (isLoading && students.length === 0) {
    return <LoadingState message="Loading students..." />;
  }

  return (
    <View style={styles.container}>
      <Header 
        title="Students" 
        subtitle="All Students Overview"
        showTeacherImage={true}
        showMasteryLegend={true}
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

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <MaterialCommunityIcons 
                name="account-group" 
                size={24} 
                color={theme.colors.primary} 
              />
              <Text style={styles.statNumber}>{students.length}</Text>
              <Text style={styles.statLabel}>Total Students</Text>
            </View>
          </View>

          {filteredStudents.length > 0 ? (
            <View style={styles.studentsList}>
              <Text style={styles.sectionTitle}>All Students</Text>
              {filteredStudents.map((student) => (
                <StudentRow
                  key={student.id}
                  student={{
                    id: student.id,
                    name: student.name,
                    mastery: student.strands.letterIdentification.competence,
                    progressPct: student.strands.letterIdentification.progress,
                  }}
                  onPress={handleStudentPress}
                />
              ))}
            </View>
          ) : (
            <EmptyState 
              type="noResults" 
              title="No students found"
              message={searchQuery ? "Try adjusting your search terms." : "No students available."}
            />
          )}
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
  statsContainer: {
    marginBottom: theme.spacing.lg,
  },
  statCard: {
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
  },
  studentsList: {
    flex: 1,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
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
