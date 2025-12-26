/**
 * Distance calculation utilities
 * Using Haversine formula for great-circle distance
 */

import { JobLocation } from '../types';

// Jaipur center coordinates
export const JAIPUR_CENTER: JobLocation = {
  lat: 26.9124,
  lon: 75.7873,
};

/**
 * Calculate distance between two coordinates using Haversine formula
 * @returns Distance in kilometers
 */
export const calculateDistance = (
  point1: JobLocation,
  point2: JobLocation,
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(point2.lat - point1.lat);
  const dLon = toRad(point2.lon - point1.lon);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(point1.lat)) *
      Math.cos(toRad(point2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal place
};

const toRad = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

/**
 * Calculate distance from Jaipur center for a job location
 */
export const getDistanceFromJaipur = (location: JobLocation): number => {
  return calculateDistance(JAIPUR_CENTER, location);
};

