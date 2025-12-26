/**
 * AsyncStorage utilities for persisting applied jobs
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Job } from '../types';

const APPLIED_JOBS_KEY = '@JobTracker:appliedJobs';

export const storage = {
  /**
   * Save applied jobs to storage
   */
  saveAppliedJobs: async (jobs: Job[]): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(jobs.map(job => job.id));
      await AsyncStorage.setItem(APPLIED_JOBS_KEY, jsonValue);
    } catch (error) {
      console.error('Error saving applied jobs:', error);
    }
  },

  /**
   * Load applied job IDs from storage
   */
  loadAppliedJobIds: async (): Promise<string[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(APPLIED_JOBS_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Error loading applied jobs:', error);
      return [];
    }
  },

  /**
   * Clear all applied jobs from storage
   */
  clearAppliedJobs: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(APPLIED_JOBS_KEY);
    } catch (error) {
      console.error('Error clearing applied jobs:', error);
    }
  },
};

