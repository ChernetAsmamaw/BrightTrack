import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { images } from '../assets';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

interface HeaderProps {
  title: string;
  subtitle?: string;
  showTeacherImage?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  subtitle, 
  showTeacherImage = true 
}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.colors.primaryGradient}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
          
          {showTeacherImage && (
            <View style={styles.imageContainer}>
              <Image
                source={images.teacher}
                style={styles.teacherImage}
                contentFit="cover"
                accessibilityLabel="Teacher illustration"
              />
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
    ...theme.shadows.md,
  },
  gradient: {
    flex: 1,
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  textContainer: {
    flex: 1,
    marginRight: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h1,
    color: '#FFFFFF',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.lg,
  },
  teacherImage: {
    width: '100%',
    height: '100%',
  },
});
