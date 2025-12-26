/**
 * Job Context for managing jobs and applied jobs state
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Job, JobContextType, JobFilters } from '../types';
import { initializeJobs } from '../data/jobs';
import { filterJobs, getDefaultFilters } from '../utils/filters';
import { storage } from '../utils/storage';

const JobContext = createContext<JobContextType | undefined>(undefined);

interface JobProviderProps {
  children: React.ReactNode;
}

export const JobProvider: React.FC<JobProviderProps> = ({ children }) => {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<JobFilters>(getDefaultFilters());

  // Initialize jobs with distances
  useEffect(() => {
    const jobs = initializeJobs();
    setAllJobs(jobs);
  }, []);

  // Load applied jobs from storage on mount
  useEffect(() => {
    const loadAppliedJobs = async () => {
      const savedIds = await storage.loadAppliedJobIds();
      setAppliedJobIds(new Set(savedIds));
    };
    loadAppliedJobs();
  }, []);

  // Get available jobs (not applied)
  const jobs = useMemo(() => {
    return allJobs.filter(job => !appliedJobIds.has(job.id));
  }, [allJobs, appliedJobIds]);

  // Get applied jobs
  const appliedJobs = useMemo(() => {
    return allJobs.filter(job => appliedJobIds.has(job.id));
  }, [allJobs, appliedJobIds]);

  // Filter jobs based on current filters
  const filteredJobs = useMemo(() => {
    return filterJobs(jobs, filters);
  }, [jobs, filters]);

  // Apply to a job
  const applyToJob = useCallback(
    async (jobId: string) => {
      setAppliedJobIds(prev => {
        const newSet = new Set(prev);
        newSet.add(jobId);
        // Save to storage
        const appliedJobsToSave = allJobs.filter(job =>
          newSet.has(job.id),
        );
        storage.saveAppliedJobs(appliedJobsToSave);
        return newSet;
      });
    },
    [allJobs],
  );

  // Withdraw from a job
  const withdrawJob = useCallback(
    async (jobId: string) => {
      setAppliedJobIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(jobId);
        // Save to storage
        const appliedJobsToSave = allJobs.filter(job =>
          newSet.has(job.id),
        );
        storage.saveAppliedJobs(appliedJobsToSave);
        return newSet;
      });
    },
    [allJobs],
  );

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<JobFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters(getDefaultFilters());
  }, []);

  const value: JobContextType = {
    jobs: filteredJobs,
    appliedJobs,
    filters,
    applyToJob,
    withdrawJob,
    updateFilters,
    resetFilters,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};

export const useJobs = (): JobContextType => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

