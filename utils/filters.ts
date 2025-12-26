/**
 * Filter utilities for jobs
 */

import { Job, JobFilters, JobType } from '../types';

export const getDefaultFilters = (): JobFilters => ({
  company: '',
  types: [],
  salaryMin: 0,
  salaryMax: 2000,
  distanceMax: 50,
});

/**
 * Filter jobs based on current filter criteria
 */
export const filterJobs = (jobs: Job[], filters: JobFilters): Job[] => {
  return jobs.filter(job => {
    // Company filter (case-insensitive contains)
    if (
      filters.company.trim() !== '' &&
      !job.company.toLowerCase().includes(filters.company.toLowerCase().trim())
    ) {
      return false;
    }

    // Type filter (multi-select)
    if (filters.types.length > 0 && !filters.types.includes(job.type)) {
      return false;
    }

    // Salary range filter
    if (job.salary < filters.salaryMin || job.salary > filters.salaryMax) {
      return false;
    }

    // Distance filter
    if (job.distance !== undefined && job.distance > filters.distanceMax) {
      return false;
    }

    return true;
  });
};

/**
 * Get available job types from jobs list
 */
export const getAvailableJobTypes = (jobs: Job[]): JobType[] => {
  const types = new Set<JobType>();
  jobs.forEach(job => types.add(job.type));
  return Array.from(types).sort();
};

/**
 * Get salary range from jobs list
 */
export const getSalaryRange = (
  jobs: Job[],
): { min: number; max: number } => {
  if (jobs.length === 0) {
    return { min: 0, max: 2000 };
  }

  const salaries = jobs.map(job => job.salary);
  return {
    min: Math.floor(Math.min(...salaries) / 100) * 100, // Round down to nearest 100
    max: Math.ceil(Math.max(...salaries) / 100) * 100, // Round up to nearest 100
  };
};

