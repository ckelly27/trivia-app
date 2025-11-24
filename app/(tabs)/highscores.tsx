import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import { getHighscores } from '@/database/db';
import { useEffect, useState } from 'react';

interface QueryParams {
  category?: number;
  difficulty?: string
}

export default function TabTwoScreen() {
  const [data, setData] = useState<any[]>([]);
  const [params, setParams] = useState<QueryParams | null>(null);
  const [users, setUsers] = useState<string[]>([]);
  const [categories, setCategory] = useState<number[]>([]);
  const [difficulty, setDifficulty] = useState<string[]>([]);
  const [scores, setScores] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  // upon params changing, get respective results
  useEffect(() => {
    const fetchHighScores = async () => {
      const result = await getHighscores(params?.category, params?.difficulty)
      setData(result)
    }
    fetchHighScores();
  }), [params];

  // for initial fetch of results
  useEffect(() => {
    const fetchHighScores = async () => {
      const result = await getHighscores(params?.category, params?.difficulty)
      setData(result)
    }
    fetchHighScores();
  }), [];

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
            style={styles.headerTitle}>
              High Scores
        </Animatable.Text>


      </View>
    </SafeAreaView>
  );
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
    marginBottom: 8,
  },
});
