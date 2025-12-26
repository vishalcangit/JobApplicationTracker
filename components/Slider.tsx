/**
 * Slider Component using @react-native-community/slider
 */

import React, { memo } from 'react';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import SliderComponent from '@react-native-community/slider';
import { useTranslation } from 'react-i18next';

interface SliderProps {
  value: number;
  minimumValue: number;
  maximumValue: number;
  onValueChange: (value: number) => void;
  label?: string;
  unit?: string;
  step?: number;
}

export const Slider: React.FC<SliderProps> = memo(
  ({
    value,
    minimumValue,
    maximumValue,
    onValueChange,
    label,
    unit = '',
    step = 1,
  }) => {
    const { t } = useTranslation();
    const isDark = useColorScheme() === 'dark';
    const styles = createStyles(isDark);

    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.sliderContainer}>
          <SliderComponent
            style={styles.slider}
            minimumValue={minimumValue}
            maximumValue={maximumValue}
            value={value}
            onValueChange={onValueChange}
            step={step}
            minimumTrackTintColor={isDark ? '#4a9eff' : '#0066cc'}
            maximumTrackTintColor={isDark ? '#3a3a3a' : '#d0d0d0'}
            thumbTintColor={isDark ? '#4a9eff' : '#0066cc'}
          />
          <Text style={styles.value}>
            {value}
            {unit}
          </Text>
        </View>
      </View>
    );
  },
);

Slider.displayName = 'Slider';

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginVertical: 8,
    },
    label: {
      fontSize: 15,
      fontWeight: '600',
      color: isDark ? '#e0e0e0' : '#1a1a1a',
      marginBottom: 12,
      letterSpacing: 0.2,
    },
    sliderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    slider: {
      flex: 1,
      height: 40,
    },
    value: {
      fontSize: 16,
      fontWeight: '700',
      color: isDark ? '#4a9eff' : '#1976d2',
      minWidth: 55,
      textAlign: 'right',
      letterSpacing: 0.3,
    },
  });

