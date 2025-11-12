import { Animated, View, Text, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import * as Animatable from 'react-native-animatable';
import AnimatedButton from '@/components/AnimatedButton';
import { useRouter } from 'expo-router';

export default function LandingScreen() {
  const router = useRouter();
  
  const handleEndlessModePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log('Endless Mode Pressed');
    // Navigate to Endless Mode screen
    router.push('/modes/endless');
  }

  const handleSurvivalPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log('Survival Mode Pressed');
    // Navigate to Survival Mode screen
    router.push('/modes/survival');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Animatable.Text
          animation={{
            0: { transform: [{ scale: 1 }] },
            0.5: { transform: [{ scale: 1.1 }] },
            1: { transform: [{ scale: 1 }] },
          }}
          duration={2500}
          iterationCount="infinite"
          easing="ease-in-out"
          style={styles.headerTitle}
        >
          Trivia Game
        </Animatable.Text>

        <View style={styles.modesContainer}>
          <Text style={styles.sectionTitle}>Choose a Mode:</Text>

          <AnimatedButton
            title="Endless Mode"
            description="Keep answering questions and track your total score!"
            onPress={handleEndlessModePress}
          />

          <AnimatedButton
            title="Survival Mode"
            description="You have 3 lives. Lose one for each incorrect answer!"
            onPress={handleSurvivalPress}
          />
        </View>

        <View style={styles.difficultyContainer}>
          <Text style={styles.difficultyTitle}>Question Point System</Text>
          <Text style={styles.difficultyText}>Hard: 3 • Medium: 2 • Easy: 1</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#4287f5',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#4287f5',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  modesContainer: {
    width: '100%',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
  },
  modeButton: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 20,
    boxShadow: '#000',
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
  difficultyContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  difficultyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  difficultyText: {
    fontSize: 15,
    color: 'white',
  },
});
