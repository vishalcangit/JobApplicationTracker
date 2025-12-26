/**
 * Job Application Tracker (Lite)
 * A React Native app for tracking job applications with filtering and distance calculation
 *
 * @format
 */

import React, { useState, useCallback } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { JobProvider } from './context/JobContext';
import { TabBar } from './components/TabBar';
import { Header } from './components/Header';
import { BottomSheet } from './components/BottomSheet';
import { FilterBar } from './components/FilterBar';
import { JobsDashboard } from './screens/JobsDashboard';
import { AppliedJobs } from './screens/AppliedJobs';
import { useTranslation } from 'react-i18next';

type ActiveTab = 'dashboard' | 'applied';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [filterVisible, setFilterVisible] = useState(false);

  const handleTabChange = useCallback((tab: ActiveTab) => {
    setActiveTab(tab);
  }, []);

  const handleFilterPress = useCallback(() => {
    setFilterVisible(true);
  }, []);

  const handleFilterClose = useCallback(() => {
    setFilterVisible(false);
  }, []);

  const getHeaderTitle = () => {
    return activeTab === 'dashboard'
      ? t('dashboard.title')
      : t('applied.title');
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <JobProvider>
        <View style={styles.container}>
          <Header
            title={getHeaderTitle()}
            onFilterPress={handleFilterPress}
          />
          <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
          {activeTab === 'dashboard' ? (
            <JobsDashboard onFilterPress={handleFilterPress} />
          ) : (
            <AppliedJobs />
          )}
          <BottomSheet visible={filterVisible} onClose={handleFilterClose}>
            <FilterBar onApply={handleFilterClose} />
          </BottomSheet>
        </View>
      </JobProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
