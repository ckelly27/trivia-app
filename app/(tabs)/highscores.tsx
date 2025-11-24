import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import { getHighscores } from '@/database/db';
import { useEffect, useState } from 'react';
import { triviaCategories } from '@/constants/categories';

interface QueryParams {
  category?: number;
  difficulty?: string
}

interface Highscore {
  id: number;
  player_name: string;
  score: number;
  category: number;
  difficulty: string;
}

export default function TabTwoScreen() {
  const [data, setData] = useState<any | Highscore[]>([]);
  const [params, setParams] = useState<QueryParams | null>(null);
  // for filters
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  useEffect(() => {
    const fetchHighScores = async () => {
      const result = await getHighscores(params?.category, params?.difficulty);
      setData(result);
    };
    fetchHighScores();
  }, [params]);

  const renderItem = ({ item, index }: { item: Highscore; index: number }) => (
    <View style={styles.row}>
      <Text style={styles.rank}>{index + 1}</Text>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{item.player_name}</Text>
        <Text style={styles.details}>
          {`Category: ${triviaCategories.find(c => c.id === Number(item.category))?.name ?? 'Unknown'} | ${item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}`}
        </Text>
      </View>
      <Text style={styles.score}>{item.score}</Text>
    </View>
  );

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

        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          style={{ width: '100%', marginTop: 20 }}
        /> 
        
           

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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  rank: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    width: 30,
    textAlign: 'center',
  },
  nameContainer: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  score: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
});
