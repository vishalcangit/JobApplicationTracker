/**
 * Multi-select Filter Chips Component
 */

import React, { memo } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { JobType } from '../types';

interface FilterChipsProps {
  options: JobType[];
  selected: JobType[];
  onToggle: (type: JobType) => void;
}

export const FilterChips: React.FC<FilterChipsProps> = memo(
  ({ options, selected, onToggle }) => {
    const { t } = useTranslation();
    const isDark = useColorScheme() === 'dark';
    const styles = createStyles(isDark);

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.content}>
        {options.map(option => {
          const isSelected = selected.includes(option);
          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.chip,
                isSelected && styles.chipSelected,
              ]}
              onPress={() => onToggle(option)}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.chipText,
                  isSelected && styles.chipTextSelected,
                ]}>
                {t(`jobTypes.${option}`)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  },
);

FilterChips.displayName = 'FilterChips';

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginVertical: 8,
    },
    content: {
      paddingHorizontal: 4,
      gap: 8,
    },
    chip: {
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 24,
      backgroundColor: isDark ? '#252525' : '#f5f5f5',
      borderWidth: 1.5,
      borderColor: isDark ? '#3a3a3a' : '#e0e0e0',
    },
    chipSelected: {
      backgroundColor: isDark ? '#4a9eff' : '#1976d2',
      borderColor: isDark ? '#5aafff' : '#1565c0',
      shadowColor: isDark ? '#4a9eff' : '#1976d2',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    },
    chipText: {
      fontSize: 14,
      fontWeight: '600',
      color: isDark ? '#b0b0b0' : '#666666',
      letterSpacing: 0.3,
    },
    chipTextSelected: {
      color: '#ffffff',
      fontWeight: '700',
    },
  });

