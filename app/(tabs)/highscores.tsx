import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';

export default function TabTwoScreen() {
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
