import React, { useState, useEffect, use } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CategoryDropdown from './CategoryDropdown';
import DifficultyDropdown from './DifficultyDropdown';
import AnimatedButton from './AnimatedButton';
import * as Animatable from 'react-native-animatable';

interface SurvivalProps {
  goHome: () => void;
}

export default function Survival({ goHome }: SurvivalProps) {

    const [selectedCategory, setSelectedCategory] = useState<number>(8);
    const [selectedDifficulty, setSelectedDifficulty] = useState<'any' | 'easy' | 'medium' | 'hard'>('any');

    const categoryEndpoint = "https://opentdb.com/api.php?amount=10" +
    (selectedCategory !== 8 ? `&category=${selectedCategory}` : '') +
    (selectedDifficulty !== 'any' ? `&difficulty=${selectedDifficulty}` : '');

    useEffect(() => {
        console.log('Updated API Endpoint:', categoryEndpoint);
    }, [categoryEndpoint]);

    const playSurvival = () => {
        console.log('Playing Survival Mode with Endpoint:', categoryEndpoint);
    }

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
                Survival Mode
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

            <AnimatedButton
                title="Play Survival Mode"
                onPress={playSurvival}
                style={{ marginTop: 10 }}
            />

            <View style={styles.difficultyContainer}>
                <Text style={styles.difficultyTitle}>Question Point System</Text>
                <Text style={styles.difficultyText}>Hard: 3 • Medium: 2 • Easy: 1</Text>
            </View>

            <AnimatedButton
                title="Back to Home"
                onPress={goHome}
                style={{ marginTop: 175 }}
            />

        </View>
    );
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
    endpointText: {
        fontSize: 16,
        color: 'white',
        marginTop: 16,
        marginBottom: 4,
    },
    endpoint: {
        fontSize: 14,
        color: 'white',
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
