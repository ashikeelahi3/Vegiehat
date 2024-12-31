import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function SubmitPriceScreen({ items, setItems }) {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    if (!itemName || !price || !category) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      Alert.alert('Error', 'Price must be a valid positive number!');
      return;
    }

    const newItem = { itemName, price, category };
    setItems([...items, newItem]); // Add new item to the existing list
    Alert.alert('Success', 'Price submitted successfully!');
    setItemName('');
    setPrice('');
    setCategory('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit Item Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});
