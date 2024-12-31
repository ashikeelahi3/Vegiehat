import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation, items }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Vegiehat! 🚀</Text>
      <Button
        title="Submit Item Price"
        onPress={() => navigation.navigate('Submit Price')}
      />
      <Button
        title="View Visualization"
        onPress={() => navigation.navigate('Visualization')}
      />

      <Text style={styles.submittedTitle}>Submitted Items:</Text>
      {items.length > 0 ? (
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>
                {item.itemName} - ${item.price} ({item.category})
              </Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noItems}>No items submitted yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  submittedTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  noItems: {
    marginTop: 10,
    fontSize: 16,
    fontStyle: 'italic',
  },
});
