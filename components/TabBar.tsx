/**
 * Enhanced Tab Bar Component for Navigation
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

interface TabBarProps {
  activeTab: 'dashboard' | 'applied';
  onTabChange: (tab: 'dashboard' | 'applied') => void;
}

export const TabBar: React.FC<TabBarProps> = memo(
  ({ activeTab, onTabChange }) => {
    const { t } = useTranslation();
    const isDark = useColorScheme() === 'dark';
    const styles = createStyles(isDark, activeTab);

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'dashboard' && styles.tabActive]}
          onPress={() => onTabChange('dashboard')}
          activeOpacity={0.7}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'dashboard' && styles.tabTextActive,
            ]}>
            {t('dashboard.title')}
          </Text>
          {activeTab === 'dashboard' && <View style={styles.indicator} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'applied' && styles.tabActive]}
          onPress={() => onTabChange('applied')}
          activeOpacity={0.7}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'applied' && styles.tabTextActive,
            ]}>
            {t('applied.title')}
          </Text>
          {activeTab === 'applied' && <View style={styles.indicator} />}
        </TouchableOpacity>
      </View>
    );
  },
);

TabBar.displayName = 'TabBar';

const createStyles = (isDark: boolean, activeTab: 'dashboard' | 'applied') =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#2a2a2a' : '#e8e8e8',
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.15 : 0.04,
      shadowRadius: 4,
      elevation: 2,
    },
    tab: {
      flex: 1,
      paddingVertical: 14,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      marginHorizontal: 6,
      borderRadius: 14,
    },
    tabActive: {
      backgroundColor: isDark ? '#1e3a5f' : '#e3f2fd',
    },
    tabText: {
      fontSize: 15,
      fontWeight: '600',
      color: isDark ? '#888888' : '#999999',
      letterSpacing: 0.2,
    },
    tabTextActive: {
      color: isDark ? '#5cb3ff' : '#1976d2',
      fontWeight: '800',
      letterSpacing: 0.3,
    },
    indicator: {
      position: 'absolute',
      bottom: 0,
      left: '50%',
      marginLeft: -30,
      width: 60,
      height: 4,
      backgroundColor: isDark ? '#5cb3ff' : '#1976d2',
      borderRadius: 2,
      marginBottom: -2,
      shadowColor: isDark ? '#5cb3ff' : '#1976d2',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.6,
      shadowRadius: 4,
      elevation: 3,
    },
  });

