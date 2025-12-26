/**
 * Header Component with Filter and Language buttons
 */

import React, { memo, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';

interface HeaderProps {
  onFilterPress: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = memo(
  ({ onFilterPress, title }) => {
    const { t } = useTranslation();
    const isDark = useColorScheme() === 'dark';
    const insets = useSafeAreaInsets();
    const [showLanguageSelector, setShowLanguageSelector] = useState(false);

    const styles = createStyles(isDark, insets.top);

    const handleLanguagePress = useCallback(() => {
      setShowLanguageSelector(true);
    }, []);

    return (
      <>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>{title || t('dashboard.title')}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.button}
                onPress={onFilterPress}
                activeOpacity={0.7}>
                <Text style={styles.buttonIcon}>🔍</Text>
                <Text style={styles.buttonText}>{t('common.filters')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={handleLanguagePress}
                activeOpacity={0.7}>
                <Text style={styles.buttonIcon}>🌐</Text>
                <Text style={styles.buttonText}>
                  {t('common.language')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <LanguageSelector
          visible={showLanguageSelector}
          onClose={() => setShowLanguageSelector(false)}
        />
      </>
    );
  },
);

Header.displayName = 'Header';

const createStyles = (isDark: boolean, topInset: number) =>
  StyleSheet.create({
    container: {
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#2a2a2a' : '#e8e8e8',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.25 : 0.08,
      shadowRadius: 8,
      elevation: 4,
      paddingTop: topInset + 12,
      paddingBottom: 4,
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: 16,
    },
    title: {
      fontSize: 28,
      fontWeight: '800',
      color: isDark ? '#ffffff' : '#1a1a1a',
      letterSpacing: -0.5,
      flex: 1,
    },
    buttons: {
      flexDirection: 'row',
      gap: 10,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#252525' : '#f8f9fa',
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 12,
      gap: 8,
      borderWidth: 1.5,
      borderColor: isDark ? '#3a3a3a' : '#e9ecef',
      shadowColor: isDark ? '#000' : '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.2 : 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
    buttonIcon: {
      fontSize: 18,
    },
    buttonText: {
      fontSize: 13,
      fontWeight: '700',
      color: isDark ? '#ffffff' : '#1a1a1a',
      letterSpacing: 0.3,
    },
  });

