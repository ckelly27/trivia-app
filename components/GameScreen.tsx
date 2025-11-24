import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { triviaCategories, TriviaCategory } from '@/constants/categories';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import useQuestions from '@/hooks/useQuestions';
import AnimatedButton from './AnimatedButton';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native';
import { insertHighscore } from '@/database/db';

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
  const [lives, setLives] = useState(3);
  const [points, setPoints] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isOver, setIsOver] = useState(false);
  const [name, setName] = useState("")
  const [disabledSubmission, setDisableSubmission] = useState(false)

  const handleScoreSubmission = async () => {
    if (!name) {
      Alert.alert("Alert!", "You must enter a name!");
      return;
    }
    const success = await insertHighscore(name, category, difficulty, points);
    if (success) {
      Alert.alert("Success!", "Your score has been saved!");
      setDisableSubmission(true)
    } else {
      Alert.alert("Error", "There was a problem saving your score. Please try again.");
    }
  };

  useEffect(() => {
    if (lives === 0) {
        setIsOver(true);
    }
  }, [lives]);

  const handleOptionPress = (option: string) => {
    if (isOver || lives === 0) return;
    setSelected(option);

    setTimeout(() => {
      const isCorrect = option === currentQuestion.correct_answer;

      if (isCorrect) {
        setPoints(prev => prev + (
          currentQuestion.difficulty === 'hard' ? 3 :
          currentQuestion.difficulty === 'medium' ? 2 : 1
        ));
      } 
      else if (mode === 'survival') {
        setLives(prev => prev - 1);
      }
      setSelected(null);
      // move on to next question if game still isnt over
      if (mode === 'endless' || (mode === 'survival' && lives > 0)) {
        handleAnswer();
      }
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
  // if current question is nothing, say so, give option to go home
  else if (!currentQuestion) {
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
  else if (!isOver) {
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
            <Text style={styles.statsText}>Points: {points}</Text>
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
  // should catch when the game is over (survival)
  else if (isOver) {
    return (
      <SafeAreaView style = {styles.safeArea}>
        <View style = {styles.container}>

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
                Game Over!
          </Animatable.Text>

          <View style={styles.statsContainer}>
              <Text style={styles.statsText}>You got {points} point(s)!</Text>
              <Text style={styles.statsText}>Category: {triviaCategories.find(c => c.id === category)?.name} </Text>
              <Text style={styles.statsText}>Difficulty: {difficulty} </Text>
          </View>

          <TextInput 
            style={styles.nameInput} 
            placeholder='Enter your name!' 
            placeholderTextColor={'black'}
            onChangeText={text => setName(text)}
            value={name}
          >
          </TextInput>

          <AnimatedButton title = "Submit Score" onPress = {handleScoreSubmission} isDisabled = {disabledSubmission}/>

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
    marginBottom: 15, 
    width: '100%', 
    alignItems: 'center',
    marginTop: 150 
  },
  nameInput: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 18,
    color: '#222',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
    marginTop: 20,
    marginBottom: 20
  },
});
