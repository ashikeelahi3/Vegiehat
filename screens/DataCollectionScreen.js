import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet, ScrollView } from 'react-native';

export default function DataCollectionScreen() {
  const [selectedItem, setSelectedItem] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [data, setData] = useState([]);

  const handleSubmit = () => {
    if (selectedItem && price && category) {
      const newData = {
        item: selectedItem,
        price: parseFloat(price),
        category,
      };
      setData([...data, newData]);
      setSelectedItem('');
      setPrice('');
      setCategory('');
      alert('Data submitted successfully!');
    } else {
      alert('Please fill all fields!');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Data Collection</Text>

      {/* Item Picker */}
      <Text style={styles.label}>Select an Item:</Text>
      <Picker
        selectedValue={selectedItem}
        onValueChange={(itemValue) => setSelectedItem(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Item" value="" />
        <Picker.Item label="Rice" value="rice" />
        <Picker.Item label="Lentils" value="lentils" />
        <Picker.Item label="Salt" value="salt" />
        <Picker.Item label="Sugar" value="sugar" />
      </Picker>

      {/* Price Input */}
      <Text style={styles.label}>Enter Price:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter price"
        value={price}
        onChangeText={(text) => setPrice(text)}
      />

      {/* Category Picker */}
      <Text style={styles.label}>Select a Category:</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Category" value="" />
        <Picker.Item label="Grains" value="grains" />
        <Picker.Item label="Spices" value="spices" />
        <Picker.Item label="Sweeteners" value="sweeteners" />
      </Picker>

      {/* Submit Button */}
      <Button title="Submit" onPress={handleSubmit} />

      {/* Display Data */}
      <View style={styles.dataContainer}>
        <Text style={styles.subTitle}>Collected Data:</Text>
        {data.map((entry, index) => (
          <Text key={index} style={styles.dataText}>
            {entry.item} - ${entry.price} ({entry.category})
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  dataContainer: {
    marginTop: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dataText: {
    fontSize: 14,
    marginBottom: 5,
  },
});
