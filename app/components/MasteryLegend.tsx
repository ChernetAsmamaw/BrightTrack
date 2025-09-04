import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { theme } from '../theme';
import { MasteryChip } from './MasteryChip';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const MASTERY_DESCRIPTIONS = {
  BE: { name: 'Below Expectation', description: 'Needs significant support' },
  AE: { name: 'Approaching Expectation', description: 'Developing with some support needed' },
  ME: { name: 'Meeting Expectation', description: 'Consistently meets standards' },
  EE: { name: 'Exceeding Expectation', description: 'Advanced mastery achieved' },
} as const;

export const MasteryLegend: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [position, setPosition] = useState({ x: screenWidth - 80, y: 100 });
  const panRef = useRef(new Animated.ValueXY({ x: screenWidth - 80, y: 100 })).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      // @ts-ignore: accessing private _value for compatibility
      panRef.setOffset({
        x: (panRef.x as any)._value,
        y: (panRef.y as any)._value,
      });
      panRef.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: Animated.event(
      [null, { dx: panRef.x, dy: panRef.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (evt, gestureState) => {
      panRef.flattenOffset();
      const newX = Math.max(0, Math.min(screenWidth - 60, position.x + gestureState.dx));
      const newY = Math.max(0, Math.min(screenHeight - 60, position.y + gestureState.dy));
      setPosition({ x: newX, y: newY });
      panRef.setValue({ x: newX, y: newY });
    },
  });

  const toggleLegend = () => {
    if (isVisible) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => setIsVisible(false));
    } else {
      setIsVisible(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <>
      <Animated.View
        style={[
          styles.legendButton,
          {
            left: position.x,
            top: position.y,
          },
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          onPress={toggleLegend}
          style={styles.buttonContainer}
          accessibilityLabel="Toggle mastery legend"
          accessibilityHint="Shows or hides the mastery level explanations"
        >
          <LinearGradient
            colors={theme.colors.primaryGradient}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <MaterialCommunityIcons 
              name="key-variant" 
              size={24} 
              color="#FFFFFF" 
            />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade"
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
                opacity: animation,
                transform: [{
                  scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                }],
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <LinearGradient
                colors={['rgba(74, 32, 146, 0.02)', 'rgba(139, 92, 246, 0.02)']}
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
                  <TouchableOpacity
                    onPress={toggleLegend}
                    style={styles.closeButton}
                    accessibilityLabel="Close mastery legend"
                  >
                    <MaterialCommunityIcons 
                      name="close" 
                      size={20} 
                      color={theme.colors.textSecondary} 
                    />
                  </TouchableOpacity>
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
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  legendButton: {
    position: 'absolute',
    zIndex: 1000,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    ...theme.shadows.lg,
  },
  buttonContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.lg,
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
    flex: 1,
  },
  closeButton: {
    padding: theme.spacing.xs,
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
