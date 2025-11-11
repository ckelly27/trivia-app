import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

export default function LandingScreen() {

  const handleEndlessModePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log('Endless Mode Pressed');
    // Navigate to Endless Mode screen
  }

  const handleSurvivalPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log('Survival Mode Pressed');
    // Navigate to Survival Mode screen
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Trivia Game</Text>

        <View style={styles.modesContainer}>
          <Text style={styles.sectionTitle}>Choose a Mode:</Text>

          <TouchableOpacity style={styles.modeButton} onPress={handleEndlessModePress}>
            <Text style={styles.modeTitle}>Endless Mode</Text>
            <Text style={styles.modeDescription}>
              Keep answering questions and track your total score!
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modeButton} onPress={handleSurvivalPress}>
            <Text style={styles.modeTitle}>Survival Mode</Text>
            <Text style={styles.modeDescription}>
              You have 3 lives. Lose one for each incorrect answer!
            </Text>
          </TouchableOpacity>
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
    backgroundColor: '#24bdbf'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#24bdbf',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 36,
    paddingHorizontal: 16,
  },
  modesContainer: {
    width: '100%',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 16,
  },
  modeButton: {
    width: '100%',
    backgroundColor: '#2563eb',
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
    color: '#fff',
    marginBottom: 6,
  },
  modeDescription: {
    fontSize: 15,
    color: '#e2e8f0',
  },
  difficultyContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  difficultyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 4,
  },
  difficultyText: {
    fontSize: 15,
    color: '#475569',
  },
});
