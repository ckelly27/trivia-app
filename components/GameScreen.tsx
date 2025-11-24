import { View, Text, Button, StyleSheet } from 'react-native';
import { triviaCategories, TriviaCategory } from '@/constants/categories';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import useQuestions from '@/hooks/useQuestions';
import AnimatedButton from './AnimatedButton';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native';

interface GameProps {
  mode: 'endless' | 'survival';
  goHome: () => void;
  category: number;
  difficulty: 'any' | 'easy' | 'medium' | 'hard';
  endpoint: string;
}


export default function GameScreen({ mode, goHome, category, difficulty, endpoint }: GameProps) {
  const { currentQuestion, handleAnswer, loading, questionIndex } = useQuestions(endpoint);
  console.log("Current question index:", questionIndex);
  const [lives, setLives] = useState(3)
  const [points, setPoints] = useState(0)
  const [selected, setSelected] = useState<string | null>(null);

  const handleOptionPress = (option: string) => {
    setSelected(option);

    // delay to show animation, then load next question
    setTimeout(() => {
      if (option === currentQuestion.correct_answer) {
        setPoints(prev => prev + (currentQuestion.difficulty === 'hard' ? 3 : currentQuestion.difficulty === 'medium' ? 2 : 1));
      } 
      else if (mode === 'survival') {
        setLives(prev => prev - 1);
      }
      setSelected(null);
      handleAnswer();
    }, 1500);
  };

  if (loading) {
    return (
      <SafeAreaView style = {styles.safeArea}>
        <View style = {styles.container}>
          <Text style={styles.statsText}>Loading Questions...</Text>
        </View>
      </SafeAreaView>
    )
  }
  // if current question is nothing, say so, prompt to go home
  if (!currentQuestion) {
    return (
      <SafeAreaView style = {styles.safeArea}>
        <View style = {styles.container}>
          <Text style={styles.statsText}>No more questions!</Text>
          <AnimatedButton 
            title='Return Home'
            onPress={goHome}
          />
        </View>
      </SafeAreaView>
    )
  }
  else {
    return (
      <SafeAreaView style = {styles.safeArea}>
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
              style={styles.headerTitle}>
                {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
          </Animatable.Text>

          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>Lives: {mode === 'survival' ? lives : 'Unlimited'}</Text>

            {mode === 'survival' && (
              <Text style={styles.statsText}>Points: {points}</Text>
            )}
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>

            <View style={styles.optionsGrid}>
              {currentQuestion.options.map((option, index) => {
                let bgColor = '#e6e6e6'; // default

                if (selected) {
                  if (option === currentQuestion.correct_answer) bgColor = '#4CAF50'; // correct
                  else bgColor = '#E53935'; // incorrect
                }

                return (
                  <Animatable.View
                    key={index}
                    animation={selected ? { 0: { backgroundColor: '#e6e6e6' }, 1: { backgroundColor: bgColor } } : undefined}
                    duration={1500}
                    style={styles.optionWrapper}
                  >
                    <TouchableOpacity
                      style={styles.optionButton}
                      onPress={() => handleOptionPress(option)}
                      disabled={!!selected}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  </Animatable.View>
                );
              })}
            </View>
          </View>
        
          <View style={styles.footer}>
            <AnimatedButton title="Return Home" onPress={goHome} />
          </View>

        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#4287f5'
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
    marginBottom: 4,
  },
  statsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  statusText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  statsText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
    marginBottom: 8,
  },
  questionContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    marginVertical: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    marginBottom: 6
  },
  optionsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    width: '100%' 
  },
  optionWrapper: { 
    width: '48%',
    height: 80,
    marginBottom: 10, 
    borderRadius: 12, 
    overflow: 'hidden', 
  },
  optionButton: { 
    backgroundColor: 'transparent', 
    paddingVertical: 14, 
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,          
    borderColor: 'black',
    borderRadius: 12, 
    height: '100%', 
  },
  optionText: { 
    color: '#222', 
    fontSize: 16, 
    fontWeight: '500', 
    textAlign: 'center' 
  },
  footer: { 
    marginBottom: 30, 
    width: '100%', 
    alignItems: 'center' 
  }
});
