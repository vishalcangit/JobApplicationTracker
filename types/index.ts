/**
 * Core types for the Job Application Tracker
 */

export interface JobLocation {
  lat: number;
  lon: number;
}

export interface Job {
  id: string;
  company: string;
  title: string;
  type: JobType;
  salary: number;
  location: JobLocation;
  distance?: number; // Calculated distance from Jaipur center
}

export type JobType = 'Full-time' | 'Part-time' | 'Shift' | 'Contract';

export interface JobFilters {
  company: string;
  types: JobType[];
  salaryMin: number;
  salaryMax: number;
  distanceMax: number;
}

export interface JobContextType {
  jobs: Job[];
  appliedJobs: Job[];
  filters: JobFilters;
  applyToJob: (jobId: string) => void;
  withdrawJob: (jobId: string) => void;
  updateFilters: (filters: Partial<JobFilters>) => void;
  resetFilters: () => void;
}

