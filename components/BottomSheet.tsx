/**
 * Bottom Sheet Component for Filters
 */

import React, { ReactNode, useRef, useState } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
  Animated,
  Dimensions,
  PanResponder,
  LayoutChangeEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  height?: number;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_HEIGHT = SCREEN_HEIGHT * 0.9;
const MIN_HEIGHT = 200;

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  children,
  height,
}) => {
  const isDark = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();
  const [contentHeight, setContentHeight] = useState(MIN_HEIGHT);
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height: measuredHeight } = event.nativeEvent.layout;
    const handleHeight = 31; // handle + margins
    const calculatedHeight = Math.min(
      Math.max(measuredHeight + handleHeight + 20, MIN_HEIGHT),
      MAX_HEIGHT,
    );
    if (calculatedHeight !== contentHeight) {
      setContentHeight(calculatedHeight);
    }
  };

  React.useEffect(() => {
    const targetHeight = height || contentHeight;
    if (visible) {
      translateY.setValue(targetHeight);
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: targetHeight,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, height, contentHeight, translateY]);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          onClose();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 65,
            friction: 11,
          }).start();
        }
      },
    }),
  ).current;

  const styles = createStyles(isDark);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.container,
            {
              height: (height || contentHeight) + insets.bottom,
              maxHeight: MAX_HEIGHT + insets.bottom,
              transform: [{ translateY }],
            },
          ]}
          {...panResponder.panHandlers}>
          <View style={styles.handle} />
          <View style={styles.content} onLayout={handleLayout}>
            {children}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'flex-end',
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
    },
    container: {
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -6 },
      shadowOpacity: 0.4,
      shadowRadius: 20,
      elevation: 25,
      borderTopWidth: 1,
      borderTopColor: isDark ? '#2a2a2a' : '#f0f0f0',
      width: '100%',
    },
    handle: {
      width: 48,
      height: 5,
      backgroundColor: isDark ? '#4a4a4a' : '#d0d0d0',
      borderRadius: 3,
      alignSelf: 'center',
      marginTop: 14,
      marginBottom: 12,
    },
    content: {
      flexGrow: 1,
      flexShrink: 1,
    },
  });

