/**
 * Filter Bar Component with all filter controls
 */

import React, { memo, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { JobFilters, JobType } from '../types';
import { FilterChips } from './FilterChips';
import { Slider } from './Slider';
import { useJobs } from '../context/JobContext';

interface FilterBarProps {
  onApply: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = memo(({ onApply }) => {
  const { t } = useTranslation();
  const isDark = useColorScheme() === 'dark';
  const { filters, updateFilters, resetFilters, jobs } = useJobs();
  const styles = createStyles(isDark);

  // Get available job types for chips (we'll get this from context jobs)
  const availableTypes: JobType[] = ['Full-time', 'Part-time', 'Shift', 'Contract'];

  const handleCompanyChange = useCallback(
    (text: string) => {
      updateFilters({ company: text });
    },
    [updateFilters],
  );

  const handleTypeToggle = useCallback(
    (type: JobType) => {
      const newTypes = filters.types.includes(type)
        ? filters.types.filter(t => t !== type)
        : [...filters.types, type];
      updateFilters({ types: newTypes });
    },
    [filters.types, updateFilters],
  );

  const handleSalaryMinChange = useCallback(
    (value: number) => {
      updateFilters({ salaryMin: value });
    },
    [updateFilters],
  );

  const handleSalaryMaxChange = useCallback(
    (value: number) => {
      updateFilters({ salaryMax: value });
    },
    [updateFilters],
  );

  const handleDistanceChange = useCallback(
    (value: number) => {
      updateFilters({ distanceMax: value });
    },
    [updateFilters],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>{t('common.filters')}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onApply}
            activeOpacity={0.7}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.resultsText}>
          {t('common.resultsAvailable', { count: jobs.length })}
        </Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}>

      {/* Company Filter */}
      <View style={styles.section}>
        <Text style={styles.label}>{t('common.company')}</Text>
        <TextInput
          style={styles.input}
          value={filters.company}
          onChangeText={handleCompanyChange}
          placeholder={t('common.company')}
          placeholderTextColor={isDark ? '#666666' : '#999999'}
        />
      </View>

      {/* Type Filter */}
      <View style={styles.section}>
        <Text style={styles.label}>{t('common.type')}</Text>
        <FilterChips
          options={availableTypes}
          selected={filters.types}
          onToggle={handleTypeToggle}
        />
      </View>

      {/* Salary Range */}
      <View style={styles.section}>
        <Text style={styles.label}>{t('common.salary')}</Text>
        <View style={styles.rangeContainer}>
          <View style={styles.rangeInput}>
            <Text style={styles.rangeLabel}>{t('common.min')}</Text>
            <TextInput
              style={styles.rangeInputField}
              value={filters.salaryMin.toString()}
              onChangeText={text => {
                const num = parseInt(text, 10) || 0;
                handleSalaryMinChange(num);
              }}
              keyboardType="numeric"
              placeholderTextColor={isDark ? '#666666' : '#999999'}
            />
          </View>
          <View style={styles.rangeSeparator}>
            <Text style={styles.rangeSeparatorText}>-</Text>
          </View>
          <View style={styles.rangeInput}>
            <Text style={styles.rangeLabel}>{t('common.max')}</Text>
            <TextInput
              style={styles.rangeInputField}
              value={filters.salaryMax.toString()}
              onChangeText={text => {
                const num = parseInt(text, 10) || 0;
                handleSalaryMaxChange(num);
              }}
              keyboardType="numeric"
              placeholderTextColor={isDark ? '#666666' : '#999999'}
            />
          </View>
        </View>
      </View>

      {/* Distance Filter */}
      <View style={styles.section}>
        <Slider
          label={`${t('common.distance')} (${t('common.max')})`}
          value={filters.distanceMax}
          minimumValue={0}
          maximumValue={50}
          onValueChange={handleDistanceChange}
          step={5}
          unit={` ${t('common.km')}`}
        />
      </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetFilters}
          activeOpacity={0.7}>
          <Text style={styles.resetText}>{t('common.reset')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={onApply}
          activeOpacity={0.8}>
          <Text style={styles.applyButtonText}>{t('common.applyFilters')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

FilterBar.displayName = 'FilterBar';

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 16,
      borderBottomWidth: 1.5,
      borderBottomColor: isDark ? '#2a2a2a' : '#e8e8e8',
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    title: {
      fontSize: 24,
      fontWeight: '800',
      color: isDark ? '#ffffff' : '#1a1a1a',
      letterSpacing: 0.3,
      flex: 1,
    },
    closeButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: isDark ? '#3a3a3a' : '#e0e0e0',
    },
    closeButtonText: {
      fontSize: 20,
      color: isDark ? '#ffffff' : '#666666',
      fontWeight: '700',
    },
    resultsText: {
      fontSize: 14,
      fontWeight: '600',
      color: isDark ? '#888888' : '#666666',
      marginTop: 4,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      padding: 20,
      paddingBottom: 16,
    },
    footer: {
      flexDirection: 'row',
      gap: 12,
      padding: 20,
      paddingTop: 16,
      borderTopWidth: 1.5,
      borderTopColor: isDark ? '#2a2a2a' : '#e8e8e8',
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
    },
    resetButton: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 12,
      backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
      borderWidth: 1.5,
      borderColor: isDark ? '#3a3a3a' : '#e0e0e0',
      alignItems: 'center',
      justifyContent: 'center',
    },
    resetText: {
      fontSize: 15,
      fontWeight: '700',
      color: isDark ? '#ffffff' : '#1a1a1a',
      letterSpacing: 0.3,
    },
    applyButton: {
      flex: 2,
      paddingVertical: 14,
      borderRadius: 12,
      backgroundColor: isDark ? '#4a9eff' : '#1976d2',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: isDark ? '#4a9eff' : '#1976d2',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 4,
    },
    applyButtonText: {
      fontSize: 16,
      fontWeight: '800',
      color: '#ffffff',
      letterSpacing: 0.5,
    },
    section: {
      marginBottom: 24,
    },
    label: {
      fontSize: 16,
      fontWeight: '700',
      color: isDark ? '#e0e0e0' : '#1a1a1a',
      marginBottom: 14,
      letterSpacing: 0.2,
    },
    input: {
      backgroundColor: isDark ? '#252525' : '#f8f9fa',
      borderWidth: 1.5,
      borderColor: isDark ? '#3a3a3a' : '#e0e0e0',
      borderRadius: 14,
      padding: 16,
      fontSize: 16,
      color: isDark ? '#ffffff' : '#1a1a1a',
      fontWeight: '500',
    },
    rangeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    rangeInput: {
      flex: 1,
    },
    rangeLabel: {
      fontSize: 13,
      fontWeight: '500',
      color: isDark ? '#b0b0b0' : '#666666',
      marginBottom: 6,
    },
    rangeInputField: {
      backgroundColor: isDark ? '#252525' : '#f8f8f8',
      borderWidth: 1.5,
      borderColor: isDark ? '#3a3a3a' : '#e0e0e0',
      borderRadius: 12,
      padding: 12,
      fontSize: 15,
      color: isDark ? '#ffffff' : '#1a1a1a',
      fontWeight: '600',
    },
    rangeSeparator: {
      paddingTop: 24,
      paddingHorizontal: 12,
    },
    rangeSeparatorText: {
      fontSize: 18,
      fontWeight: '700',
      color: isDark ? '#888888' : '#999999',
    },
  });

