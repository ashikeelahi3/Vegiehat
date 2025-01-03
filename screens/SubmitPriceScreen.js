import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { ItemsContext } from '../context/ItemsContext';
import { colors, spacing } from '../constants/theme';
import alert from '../alert';

export default function SubmitPriceScreen({ route }) { // Destructure route from props
  const { items, setItems } = useContext(ItemsContext);
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    if (route.params?.item) {
      const { itemName, price, category, id } = route.params.item;
      setItemName(itemName);
      setPrice(price.toString());
      setCategory(category);
      setEditingItemId(id);
    }
  }, [route.params]);

  const handleSubmit = () => {
    if (!itemName || !price || !category) {
      alert('Error', 'All fields are required!');
      return;
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      alert('Error', 'Price must be a valid positive number!');
      return;
    }

    const newItem = { id: editingItemId || Date.now().toString(), itemName, price: parseFloat(price), category };

    if (editingItemId) {
      // Update existing item
      setItems(items.map(item => item.id === editingItemId ? newItem : item));
      alert('Success', 'Item updated successfully!');
    } else {
      // Add new item
      setItems([...items, newItem]);
      alert('Success', 'Price submitted successfully!');
    }

    setItemName('');
    setPrice('');
    setCategory('');
    setEditingItemId(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{editingItemId ? 'Edit Item' : 'Submit Item Price'}</Text>
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
        <Button title={editingItemId ? "Update" : "Submit"} onPress={handleSubmit} color={colors.primary} />
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
