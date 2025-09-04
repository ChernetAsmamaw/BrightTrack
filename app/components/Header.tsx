import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { images } from '../assets';
import { theme } from '../theme';
import { MasteryChip } from './MasteryChip';

// const { width } = Dimensions.get('window'); // Unused variable removed

const MASTERY_DESCRIPTIONS = {
  BE: { name: 'Below Expectation', description: 'Needs significant support and guidance' },
  AE: { name: 'Approaching Expectation', description: 'Developing skills with some support' },
  ME: { name: 'Meeting Expectation', description: 'Consistently demonstrates proficiency' },
  EE: { name: 'Exceeding Expectation', description: 'Advanced mastery and independence' },
} as const;

interface HeaderProps {
  title: string;
  subtitle?: string;
  showTeacherImage?: boolean;
  showMasteryLegend?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  title,
  subtitle,
  showTeacherImage = true,
  showMasteryLegend = false
}) => {
  const [isLegendVisible, setIsLegendVisible] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  const animateButtonPress = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const toggleLegend = () => {
    animateButtonPress();
    
    if (isLegendVisible) {
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsLegendVisible(false));
    } else {
      setIsLegendVisible(true);
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[...theme.colors.primaryGradient, '#6D28D9']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.7, 1]}
      >
        {/* Background pattern */}
        <View style={styles.backgroundPattern}>
          <View style={[styles.patternCircle, styles.circle1]} />
          <View style={[styles.patternCircle, styles.circle2]} />
          <View style={[styles.patternCircle, styles.circle3]} />
        </View>

        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
          
          <View style={styles.rightSection}>
            {showMasteryLegend && (
              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <TouchableOpacity
                  onPress={toggleLegend}
                  style={styles.legendButton}
                  accessibilityLabel="Toggle mastery legend"
                  accessibilityHint="Shows or hides the mastery level explanations"
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.1)']}
                    style={styles.legendButtonInner}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <MaterialCommunityIcons 
                      name="key-variant" 
                      size={18} 
                      color="#FFFFFF" 
                    />
                    <View style={styles.legendPulse} />
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            )}
            
            {showTeacherImage && (
              <View style={styles.imageContainer}>
                <View style={styles.imageFrame}>
                  <Image
                    source={images.teacher}
                    style={styles.teacherImage}
                    contentFit="cover"
                    accessibilityLabel="Teacher illustration"
                  />
                </View>
                <View style={styles.imageGlow} />
              </View>
            )}
          </View>
        </View>
      </LinearGradient>

      {showMasteryLegend && (
        <Modal
          visible={isLegendVisible}
          transparent={true}
          animationType="none"
          onRequestClose={toggleLegend}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={toggleLegend}
          >
            <Animated.View
              style={[
                styles.modalContent,
                {
                  opacity: animationValue,
                  transform: [{
                    scale: animationValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.85, 1],
                    }),
                  }, {
                    translateY: animationValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  }],
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={(e) => e.stopPropagation()}
                style={styles.modalInner}
              >
                <LinearGradient
                  colors={['#FFFFFF', '#F8FAFC']}
                  style={styles.modalGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.modalHeader}>
                    <View style={styles.modalIconContainer}>
                      <LinearGradient
                        colors={theme.colors.primaryGradient}
                        style={styles.modalIcon}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        <MaterialCommunityIcons 
                          name="key-variant" 
                          size={20} 
                          color="#FFFFFF" 
                        />
                      </LinearGradient>
                    </View>
                    <Text style={styles.legendTitle}>Mastery Levels</Text>
                    <TouchableOpacity
                      onPress={toggleLegend}
                      style={styles.closeButton}
                      accessibilityLabel="Close mastery legend"
                    >
                      <MaterialCommunityIcons 
                        name="close" 
                        size={18} 
                        color={theme.colors.textSecondary} 
                      />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.legendGrid}>
                    {Object.entries(MASTERY_DESCRIPTIONS).map(([code, info], index) => (
                      <Animated.View
                        key={code}
                        style={[
                          styles.legendItem,
                          {
                            opacity: animationValue,
                            transform: [{
                              translateX: animationValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-30, 0],
                              }),
                            }],
                          },
                        ]}
                      >
                        <View style={styles.masterySection}>
                          <MasteryChip mastery={code as any} size="medium" />
                          <Text style={styles.masteryName}>{info.name}</Text>
                        </View>
                        <Text style={styles.description}>{info.description}</Text>
                        <View style={styles.itemAccent} />
                      </Animated.View>
                    ))}
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 140,
    ...theme.shadows.lg,
  },
  gradient: {
    flex: 1,
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  patternCircle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 999,
  },
  circle1: {
    width: 120,
    height: 120,
    top: -40,
    right: -20,
  },
  circle2: {
    width: 80,
    height: 80,
    top: 20,
    left: -30,
  },
  circle3: {
    width: 60,
    height: 60,
    bottom: -10,
    right: 100,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
    zIndex: 1,
  },
  textContainer: {
    flex: 1,
    marginRight: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h1,
    color: '#FFFFFF',
    marginBottom: theme.spacing.xs,
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    ...theme.typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
    fontWeight: '500',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  legendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    position: 'relative',
    ...theme.shadows.md,
  },
  legendButtonInner: {
    flex: 1,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  legendPulse: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    opacity: 0.5,
  },
  imageContainer: {
    position: 'relative',
  },
  imageFrame: {
    width: 88,
    height: 88,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...theme.shadows.lg,
  },
  imageGlow: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: theme.borderRadius.xl + 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: -1,
  },
  teacherImage: {
    width: '100%',
    height: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  modalContent: {
    width: '92%',
    maxWidth: 420,
    maxHeight: '85%',
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.lg,
  },
  modalInner: {
    flex: 1,
  },
  modalGradient: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  modalIconContainer: {
    marginRight: theme.spacing.sm,
  },
  modalIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendTitle: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
    flex: 1,
    fontWeight: '700',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.border,
  },
  legendGrid: {
    gap: theme.spacing.md,
  },
  legendItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.card,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    position: 'relative',
    ...theme.shadows.sm,
  },
  itemAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: theme.borderRadius.card,
    borderBottomLeftRadius: theme.borderRadius.card,
    backgroundColor: theme.colors.primary,
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
    fontWeight: '600',
  },
  description: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    paddingLeft: theme.spacing.xs,
  },
});