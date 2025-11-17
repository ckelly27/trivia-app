import { Animated, View, Text, StyleSheet, Button } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import * as Animatable from 'react-native-animatable';
import AnimatedButton from '@/components/AnimatedButton';
import Endless from '@/components/endless';
import Survival from '@/components/survival';

export default function LandingScreen() {

  const [mode, setMode] = useState<"home" | "endless" | "survival">("home");
  
  const handleEndlessModePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Navigate to Endless Mode screen
    setMode("endless")
  }

  const handleSurvivalPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Navigate to Survival Mode screen
    setMode("survival")
  }

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* Home Screen */}
      {mode === "home" && (
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
        
      </View>
      )}

      {/* Endless Screen */}
      {mode === "endless" && (
        <Endless goHome={() => setMode("home")}/>
      )}

      {/* Survival Screen */}
      {mode === "survival" && (
        <Survival goHome={() => setMode("home")}/>
      )}
      
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
    marginBottom: 15,
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
