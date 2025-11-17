import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { triviaCategories, TriviaCategory } from '@/constants/categories';

interface Props {
  selectedCategory: number; 
  onChangeCategory: (id: number) => void;
}

export default function CategoryDropdown({ selectedCategory, onChangeCategory }: Props) {
  const [open, setOpen] = useState(false);

  const handleSelect = (id: number) => {
    onChangeCategory(id);
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* button to open dropdown */}
      <TouchableOpacity onPress={() => setOpen(true)} style={styles.button}>
        <Text style={styles.buttonText}>
          {triviaCategories.find((cat) => cat.id === selectedCategory)?.name || 'Select Category'}
        </Text>
      </TouchableOpacity>

      {/* modal with scrollable list */}
      <Modal transparent visible={open} animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setOpen(false)}>
          <View style={styles.dropdown}>
            <ScrollView>
              {triviaCategories.map((cat: TriviaCategory) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => handleSelect(cat.id)}
                  style={styles.item}
                >
                  <Text style={styles.itemText}>{cat.name}</Text>
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
