import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme';
import { DEBOUNCE_DELAY } from '../constants';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search students...',
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChangeText(localValue);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [localValue, onChangeText]);

  const handleClear = () => {
    setLocalValue('');
    onChangeText('');
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons 
        name="magnify" 
        size={20} 
        color={theme.colors.textSecondary} 
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.input}
        value={localValue}
        onChangeText={setLocalValue}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        returnKeyType="search"
        accessibilityLabel="Search students"
        accessibilityHint="Enter student name to filter results"
      />
      {localValue.length > 0 && (
        <TouchableOpacity 
          onPress={handleClear}
          style={styles.clearButton}
          accessibilityLabel="Clear search"
          accessibilityHint="Clears the search input"
        >
          <MaterialCommunityIcons 
            name="close-circle" 
            size={20} 
            color={theme.colors.textSecondary} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.cardSurface,
    borderRadius: theme.borderRadius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    minHeight: 44,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    paddingVertical: theme.spacing.sm,
  },
  clearButton: {
    padding: theme.spacing.xs,
  },
});
