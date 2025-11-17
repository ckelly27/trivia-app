import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';

interface Props {
  selectedDifficulty: 'any' | 'easy' | 'medium' | 'hard';
  onChangeDifficulty: (difficulty: 'any' | 'easy' | 'medium' | 'hard') => void;
}

const difficulties: { label: string; value: 'any' | 'easy' | 'medium' | 'hard' }[] = [
  { label: 'Any', value: 'any' },
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
];

export default function DifficultyDropdown({ selectedDifficulty, onChangeDifficulty }: Props) {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: 'any' | 'easy' | 'medium' | 'hard') => {
    onChangeDifficulty(value);
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
        <Text style={styles.buttonText}>
          {difficulties.find(d => d.value === selectedDifficulty)?.label || 'Select Difficulty'}
        </Text>
      </TouchableOpacity>

      <Modal transparent visible={open} animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setOpen(false)}>
          <View style={styles.dropdown}>
            <ScrollView>
              {difficulties.map(d => (
                <TouchableOpacity key={d.value} style={styles.item} onPress={() => handleSelect(d.value)}>
                  <Text style={styles.itemText}>{d.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  button: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  dropdown: {
    width: '80%',
    maxHeight: '50%',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 8,
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
});
