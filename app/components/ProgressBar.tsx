import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface ProgressBarProps {
  value: number;
  color?: string;
  height?: number;
  width?: number | string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = theme.colors.primary,
  height = 8,
  width = '100%',
}) => {
  const clampedValue = Math.max(0, Math.min(100, value));
  const progressWidth = `${clampedValue}%`;

  return (
    <View style={[styles.container, { height, width }]}>
      <View style={[styles.progress, { width: progressWidth, backgroundColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.pill,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: theme.borderRadius.pill,
  },
});
