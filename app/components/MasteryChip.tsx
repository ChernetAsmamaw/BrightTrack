import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MasteryLevel } from '../types';
import { theme } from '../theme';

interface MasteryChipProps {
  mastery: MasteryLevel;
  size?: 'small' | 'medium' | 'large';
}

export const MasteryChip: React.FC<MasteryChipProps> = ({ 
  mastery, 
  size = 'medium' 
}) => {
  const sizeStyles = {
    small: { paddingHorizontal: 6, paddingVertical: 2, fontSize: 10 },
    medium: { paddingHorizontal: 8, paddingVertical: 4, fontSize: 12 },
    large: { paddingHorizontal: 12, paddingVertical: 6, fontSize: 14 },
  };

  return (
    <View style={[
      styles.container, 
      { backgroundColor: theme.colors.mastery[mastery] },
      sizeStyles[size]
    ]}>
      <Text style={[
        styles.text,
        { fontSize: sizeStyles[size].fontSize }
      ]}>
        {mastery}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 32,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
});
