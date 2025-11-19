import { View, Text, Button, StyleSheet } from 'react-native';
import { triviaCategories, TriviaCategory } from '@/constants/categories';
import { useState, useEffect } from 'react';

interface GameProps {
  mode: 'endless' | 'survival';
  goHome: () => void;
  category: number;
  difficulty: 'any' | 'easy' | 'medium' | 'hard';
  endpoint: string;
}


export default function GameScreen({ mode, goHome, category, difficulty, endpoint }: GameProps) {

  const [lives, setLives] = useState(3)

  return (
    <View>
      <Text>Game Screen</Text>
      <Text>Mode: {mode}</Text>
      <Text>Category: {category}</Text>
      <Text>Difficulty: {difficulty}</Text>
      <Text>Endpoint: {endpoint}</Text>

      <Button title="Go Home" onPress={goHome} />
    </View>
  );
}