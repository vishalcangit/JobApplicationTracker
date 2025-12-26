/**
 * Language Selector Modal Component
 */

import React, { memo, useCallback } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = memo(
  ({ visible, onClose }) => {
    const { t, i18n: i18nInstance } = useTranslation();
    const isDark = useColorScheme() === 'dark';
    const currentLanguage = i18nInstance.language || 'en';

    const styles = createStyles(isDark);

    const handleLanguageChange = useCallback(
      async (langCode: string) => {
        if (langCode !== currentLanguage) {
          await i18n.changeLanguage(langCode);
        }
        onClose();
      },
      [currentLanguage, onClose],
    );

    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>{t('common.selectLanguage')}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.options}>
              {languages.map(lang => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.option,
                    currentLanguage === lang.code && styles.optionSelected,
                  ]}
                  onPress={() => handleLanguageChange(lang.code)}
                  activeOpacity={0.7}>
                  <Text style={styles.flag}>{lang.flag}</Text>
                  <Text
                    style={[
                      styles.optionText,
                      currentLanguage === lang.code && styles.optionTextSelected,
                    ]}>
                    {lang.name}
                  </Text>
                  {currentLanguage === lang.code && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  },
);

LanguageSelector.displayName = 'LanguageSelector';

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    container: {
      backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
      borderRadius: 24,
      width: '100%',
      maxWidth: 380,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 16,
      elevation: 12,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: isDark ? '#2a2a2a' : '#f0f0f0',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 22,
      paddingBottom: 18,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#2a2a2a' : '#e8e8e8',
      backgroundColor: isDark ? '#252525' : '#fafafa',
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: '800',
      color: isDark ? '#ffffff' : '#1a1a1a',
      letterSpacing: 0.3,
    },
    closeButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: isDark ? '#3a3a3a' : '#e0e0e0',
    },
    closeButtonText: {
      fontSize: 20,
      color: isDark ? '#ffffff' : '#666666',
      fontWeight: '700',
    },
    options: {
      padding: 12,
      paddingTop: 8,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 18,
      borderRadius: 14,
      marginBottom: 10,
      backgroundColor: isDark ? '#252525' : '#f8f9fa',
      borderWidth: 2,
      borderColor: 'transparent',
    },
    optionSelected: {
      backgroundColor: isDark ? '#1e3a5f' : '#e3f2fd',
      borderColor: isDark ? '#5cb3ff' : '#1976d2',
      shadowColor: isDark ? '#5cb3ff' : '#1976d2',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    },
    flag: {
      fontSize: 28,
      marginRight: 14,
    },
    optionText: {
      flex: 1,
      fontSize: 17,
      fontWeight: '600',
      color: isDark ? '#e0e0e0' : '#1a1a1a',
      letterSpacing: 0.2,
    },
    optionTextSelected: {
      color: isDark ? '#5cb3ff' : '#1976d2',
      fontWeight: '700',
    },
    checkmark: {
      fontSize: 22,
      color: isDark ? '#5cb3ff' : '#1976d2',
      fontWeight: '800',
    },
  });

