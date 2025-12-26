/**
 * Jobs Dashboard Screen
 */

import React, { useCallback, useMemo } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useJobs } from '../context/JobContext';
import { JobCard } from '../components/JobCard';
import { Job } from '../types';

interface JobsDashboardProps {
  onFilterPress: () => void;
}

export const JobsDashboard: React.FC<JobsDashboardProps> = ({ onFilterPress }) => {
  const { t } = useTranslation();
  const isDark = useColorScheme() === 'dark';
  const { jobs, applyToJob } = useJobs();
  const styles = createStyles(isDark);

  const handleApply = useCallback(
    (jobId: string) => {
      applyToJob(jobId);
    },
    [applyToJob],
  );

  const renderJob = useCallback(
    ({ item }: { item: Job }) => (
      <JobCard job={item} onApply={() => handleApply(item.id)} />
    ),
    [handleApply],
  );

  const keyExtractor = useCallback((item: Job) => item.id, []);

  const emptyComponent = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {jobs.length === 0
            ? t('dashboard.empty')
            : t('dashboard.emptyFiltered')}
        </Text>
      </View>
    ),
    [jobs.length, styles, t],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        renderItem={renderJob}
        keyExtractor={keyExtractor}
        contentContainerStyle={
          jobs.length === 0 ? styles.emptyList : styles.list
        }
        ListEmptyComponent={emptyComponent}
        removeClippedSubviews={true}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </View>
  );
};

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#f5f5f5',
    },
    list: {
      paddingVertical: 8,
      paddingBottom: 20,
    },
    emptyList: {
      flex: 1,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 48,
    },
    emptyText: {
      fontSize: 18,
      fontWeight: '600',
      color: isDark ? '#888888' : '#999999',
      textAlign: 'center',
      letterSpacing: 0.3,
      lineHeight: 26,
    },
  });

