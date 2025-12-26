/**
 * Reusable Job Card Component
 */

import React, { memo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onApply: () => void;
  onWithdraw?: () => void;
  showWithdraw?: boolean;
}

export const JobCard: React.FC<JobCardProps> = memo(
  ({ job, onApply, onWithdraw, showWithdraw = false }) => {
    const { t } = useTranslation();
    const isDark = useColorScheme() === 'dark';

    const styles = createStyles(isDark);

    const getBadgeStyle = () => {
      const badgeType = job.type.replace('-', '');
      switch (badgeType) {
        case 'Fulltime':
          return styles.badgeFulltime;
        case 'Parttime':
          return styles.badgeParttime;
        case 'Shift':
          return styles.badgeShift;
        case 'Contract':
          return styles.badgeContract;
        default:
          return null;
      }
    };

    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.companyRow}>
            <View style={styles.companyIcon}>
              <Text style={styles.companyIconText}>
                {job.company.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.companyInfo}>
              <Text style={styles.company} numberOfLines={1}>
                {job.company}
              </Text>
              <Text style={styles.title} numberOfLines={1}>
                {job.title}
              </Text>
            </View>
          </View>
          <View style={[styles.badge, getBadgeStyle()]}>
            <Text style={styles.badgeText} numberOfLines={1}>
              {t(`jobTypes.${job.type}`)}
            </Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>💰</Text>
              <Text style={styles.detailValue}>₹{job.salary.toLocaleString()}</Text>
            </View>
            {job.distance !== undefined && (
              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>📍</Text>
                <Text style={styles.detailValue}>
                  {job.distance}{t('common.km')}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.jobId}>{job.id}</Text>
          <TouchableOpacity
            style={[styles.button, showWithdraw && styles.buttonApplied]}
            onPress={showWithdraw ? onWithdraw : onApply}
            activeOpacity={0.8}>
            <Text style={styles.buttonText}>
              {showWithdraw ? t('common.applied') : t('common.apply')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

JobCard.displayName = 'JobCard';

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    card: {
      backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
      borderRadius: 14,
      padding: 14,
      marginBottom: 12,
      marginHorizontal: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.25 : 0.08,
      shadowRadius: 6,
      elevation: 3,
      borderWidth: isDark ? 1 : 0,
      borderColor: isDark ? '#2a2a2a' : 'transparent',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    companyRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      marginRight: 8,
      minWidth: 0,
    },
    companyIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDark ? '#2d5aa0' : '#e3f2fd',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    companyIconText: {
      fontSize: 16,
      fontWeight: '800',
      color: isDark ? '#5cb3ff' : '#1976d2',
    },
    companyInfo: {
      flex: 1,
      minWidth: 0,
    },
    company: {
      fontSize: 16,
      fontWeight: '700',
      color: isDark ? '#ffffff' : '#1a1a1a',
      marginBottom: 2,
      letterSpacing: 0.2,
    },
    title: {
      fontSize: 13,
      color: isDark ? '#b0b0b0' : '#666666',
      fontWeight: '500',
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5',
      borderWidth: 1.5,
      borderColor: isDark ? '#3a3a3a' : '#e0e0e0',
      maxWidth: 100,
      marginLeft: 4,
    },
    badgeFulltime: {
      backgroundColor: isDark ? '#1e4620' : '#e8f5e9',
      borderColor: isDark ? '#4caf50' : '#4caf50',
    },
    badgeParttime: {
      backgroundColor: isDark ? '#1a237e' : '#e3f2fd',
      borderColor: isDark ? '#3f51b5' : '#3f51b5',
    },
    badgeShift: {
      backgroundColor: isDark ? '#3e2723' : '#fff3e0',
      borderColor: isDark ? '#ff9800' : '#ff9800',
    },
    badgeContract: {
      backgroundColor: isDark ? '#4a148c' : '#f3e5f5',
      borderColor: isDark ? '#9c27b0' : '#9c27b0',
    },
    badgeText: {
      fontSize: 10,
      fontWeight: '700',
      color: isDark ? '#ffffff' : '#1a1a1a',
      letterSpacing: 0.2,
    },
    details: {
      marginBottom: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: isDark ? '#2a2a2a' : '#f0f0f0',
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    detailIcon: {
      fontSize: 16,
      marginRight: 6,
    },
    detailValue: {
      fontSize: 14,
      fontWeight: '700',
      color: isDark ? '#ffffff' : '#1a1a1a',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: isDark ? '#2a2a2a' : '#f0f0f0',
    },
    jobId: {
      fontSize: 11,
      color: isDark ? '#707070' : '#999999',
      fontWeight: '600',
      fontFamily: 'monospace',
    },
    button: {
      backgroundColor: isDark ? '#4a9eff' : '#1976d2',
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 10,
      minWidth: 90,
      alignItems: 'center',
      shadowColor: isDark ? '#4a9eff' : '#1976d2',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    },
    buttonApplied: {
      backgroundColor: isDark ? '#2d7a3d' : '#4caf50',
      shadowColor: isDark ? '#2d7a3d' : '#4caf50',
    },
    buttonWithdraw: {
      backgroundColor: isDark ? '#ff5252' : '#f44336',
      shadowColor: isDark ? '#ff5252' : '#f44336',
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 13,
      fontWeight: '700',
      letterSpacing: 0.3,
    },
  });

