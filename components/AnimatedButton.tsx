import React, { useRef } from 'react';
import { Animated, TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';

interface AnimatedButtonProps {
  title: string;
  description?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ title, description, onPress, style }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <Animated.View style={[styles.modeButton, animatedStyle, style]}>
      <TouchableOpacity
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          onPress?.();
        }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <Text style={styles.modeTitle}>{title}</Text>
        {description && <Text style={styles.modeDescription}>{description}</Text>}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AnimatedButton;

const styles = StyleSheet.create({
  modeButton: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  modeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    marginBottom: 6,
  },
  modeDescription: {
    fontSize: 15,
    color: 'black',
  },
});
