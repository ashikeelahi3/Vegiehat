import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { ItemsContext } from '../context/ItemsContext'; // Import the context
import { colors, spacing } from '../constants/theme';
import alert from '../alert';

export default function SubmitPriceScreen() {
  const { items, setItems } = useContext(ItemsContext); // Access the context
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    if (!itemName || !price || !category) {
      alert('Error', 'All fields are required!');
      return;
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      alert('Error', 'Price must be a valid positive number!');
      return;
    }

    const newItem = { id: Date.now().toString(), itemName, price: parseFloat(price), category };
    setItems([...items, newItem]); // Update the global state
    alert('Success, Price submitted successfully!');
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
        placeholderTextColor={colors.lightText}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        placeholderTextColor={colors.lightText}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        placeholderTextColor={colors.lightText}
      />
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} color={colors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.large,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.large,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: colors.lightText,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: spacing.medium,
    marginBottom: spacing.medium,
    color: colors.text,
  },
  buttonContainer: {
    marginTop: spacing.medium,
  },
});
