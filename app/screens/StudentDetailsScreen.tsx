import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';
import { MasteryChip } from '../components/MasteryChip';
import { ProgressBar } from '../components/ProgressBar';
import { STRANDS } from '../constants';
import { useBrightTrackStore } from '../store';
import { theme } from '../theme';
import { StrandKey, Student } from '../types';

export default function StudentDetailsScreen() {
  const router = useRouter();
  const { studentId } = useLocalSearchParams<{ studentId: string }>();
  const { getStudentById, generateStudentExport } = useBrightTrackStore();
  
  const [student, setStudent] = useState<Student | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (studentId) {
      const foundStudent = getStudentById(studentId);
      setStudent(foundStudent || null);
      setIsLoading(false);
    }
  }, [studentId, getStudentById]);

  const handleExport = async () => {
    if (!studentId) return;
    
    setIsExporting(true);
    try {
      await generateStudentExport(studentId);
    } catch (error) {
      Alert.alert('Export Failed', 'Unable to export student data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return <LoadingState message="Loading student details..." />;
  }

  if (!student) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
            accessibilityLabel="Go back"
          >
            <MaterialCommunityIcons 
              name="arrow-left" 
              size={24} 
              color={theme.colors.textPrimary} 
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Student Not Found</Text>
          <View style={styles.placeholder} />
        </View>
        <EmptyState 
          type="noResults" 
          title="Student not found"
          message="The student you're looking for doesn't exist or has been removed."
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.colors.primaryGradient}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
            accessibilityLabel="Go back to class overview"
          >
            <MaterialCommunityIcons 
              name="arrow-left" 
              size={24} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.initials}>{getInitials(student.name)}</Text>
              </View>
            </View>
            <Text style={styles.studentName}>{student.name}</Text>
          </View>

          <TouchableOpacity 
            onPress={handleExport}
            disabled={isExporting}
            style={[styles.exportButton, isExporting && styles.exportButtonDisabled]}
            accessibilityLabel="Export student performance data"
            accessibilityHint="Downloads a CSV file with student performance data"
          >
            <MaterialCommunityIcons 
              name={isExporting ? "loading" : "download"} 
              size={24} 
              color={isExporting ? "rgba(255,255,255,0.5)" : "#FFFFFF"} 
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {Object.entries(STRANDS).map(([strandKey, strandInfo]) => {
          const strandData = student.strands[strandKey as StrandKey];
          
          return (
            <View key={strandKey} style={styles.strandSection}>
              <LinearGradient
                colors={['rgba(124, 58, 237, 0.03)', 'rgba(139, 92, 246, 0.03)']}
                style={styles.strandGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.strandHeader}>
                  <MaterialCommunityIcons 
                    name={strandKey === 'letterIdentification' ? 'alphabetical' :
                          strandKey === 'letterNaming' ? 'format-letter-case' :
                          strandKey === 'letterFormation' ? 'pencil' : 'music-note'} 
                    size={24} 
                    color={theme.colors.primary} 
                  />
                  <Text style={styles.strandTitle}>{strandInfo.name}</Text>
                </View>
                
                <Text style={styles.strandDescription}>{strandInfo.description}</Text>
                
                <View style={styles.competenceSection}>
                  <Text style={styles.competenceLabel}>Current Competence Level</Text>
                  <MasteryChip mastery={strandData.mastery} size="large" />
                </View>

                <View style={styles.progressSection}>
                  <View style={styles.progressHeader}>
                    <Text style={styles.progressLabel}>
                      Work progress — {strandData.progressPct}%
                    </Text>
                    <MaterialCommunityIcons 
                      name="chart-line" 
                      size={16} 
                      color={theme.colors.mastery[strandData.mastery]} 
                    />
                  </View>
                  <ProgressBar 
                    value={strandData.progressPct} 
                    color={theme.colors.mastery[strandData.mastery]}
                    height={12}
                  />
                </View>
              </LinearGradient>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerGradient: {
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
    ...theme.shadows.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  backButton: {
    padding: theme.spacing.sm,
    marginRight: theme.spacing.sm,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    ...theme.typography.h2,
    color: theme.colors.textPrimary,
  },
  placeholder: {
    width: 44,
  },
  avatarContainer: {
    marginBottom: theme.spacing.sm,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  initials: {
    ...theme.typography.h1,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  studentName: {
    ...theme.typography.h1,
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  exportButton: {
    padding: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
  },
  exportButtonDisabled: {
    opacity: 0.5,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  strandSection: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  strandGradient: {
    padding: theme.spacing.lg,
  },
  strandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  strandTitle: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.sm,
  },
  strandDescription: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    lineHeight: 22,
  },
  competenceSection: {
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.card,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  competenceLabel: {
    ...theme.typography.captionMedium,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  progressSection: {
    flex: 1,
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
});
