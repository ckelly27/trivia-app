import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CategoryDropdown from './CategoryDropdown';
import DifficultyDropdown from './DifficultyDropdown';
import AnimatedButton from './AnimatedButton';
import * as Animatable from 'react-native-animatable';
import GameScreen from './GameScreen';

interface ModeSetupProps {
  mode: 'endless' | 'survival';
  goHome: () => void;
}

export default function ModeSetup({ mode, goHome }: ModeSetupProps) {
  const [selectedCategory, setSelectedCategory] = useState<number>(8);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'any' | 'easy' | 'medium' | 'hard'>('any');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const categoryEndpoint =
    'https://opentdb.com/api.php?amount=10' +
    (selectedCategory !== 8 ? `&category=${selectedCategory}` : '') +
    (selectedDifficulty !== 'any' ? `&difficulty=${selectedDifficulty}` : '');

  useEffect(() => {
    console.log(`${mode.toUpperCase()} endpoint:`, categoryEndpoint);
  }, [categoryEndpoint]);

  const playGame = () => {
    setIsPlaying(true);
  };

  const modeTitle = mode === 'endless' ? 'Endless Mode' : 'Survival Mode';
  const buttonTitle = mode === 'endless' ? 'Play Endless Mode' : 'Play Survival Mode';

  if (isPlaying) {
    return (
      <GameScreen
        mode={mode}
        goHome={goHome}
        category={selectedCategory}
        difficulty={selectedDifficulty}
        endpoint={categoryEndpoint}
      />
    );
  }
  else {
    return (
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
        {modeTitle}
      </Animatable.Text>

      <Text style={styles.sectionTitle}>Select category and difficulty:</Text>

      <CategoryDropdown
        selectedCategory={selectedCategory}
        onChangeCategory={setSelectedCategory}
      />

      <DifficultyDropdown
        selectedDifficulty={selectedDifficulty}
        onChangeDifficulty={setSelectedDifficulty}
      />

      <AnimatedButton title={buttonTitle} onPress={playGame} style={{ marginTop: 10 }} />

      <View style={styles.difficultyContainer}>
        <Text style={styles.difficultyTitle}>Question Point System</Text>
        <Text style={styles.difficultyText}>Hard: 3 • Medium: 2 • Easy: 1</Text>
      </View>

      <AnimatedButton title="Back to Home" onPress={goHome} style={{ marginTop: 175 }} />
    </View>
  );
  }
}

const styles = StyleSheet.create({
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
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
