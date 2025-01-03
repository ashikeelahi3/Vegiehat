import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ItemsContext } from '../context/ItemsContext';
import { colors, spacing } from '../constants/theme';

export default function HomeScreen({ navigation }) {
  const { items, setItems } = useContext(ItemsContext);

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
    alert('Success', 'Item deleted successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to VegieHat! 🚀</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Submit Item Price"
          onPress={() => navigation.navigate('Submit Price')}
          color={colors.primary}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="View Visualization"
          onPress={() => navigation.navigate('Visualization', { items })}
          color={colors.secondary}
        />
      </View>

      <Text style={styles.submittedTitle}>Submitted Items:</Text>
      {items && items.length > 0 ? (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>
                {item.itemName} - ${item.price} ({item.category})
              </Text>
              <View style={styles.buttonContainer_2}>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Submit Price', { item })}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </View>
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
    backgroundColor: colors.background,
    padding: spacing.medium,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.medium,
  },
  buttonContainer: {
    marginVertical: spacing.small,
  },
  submittedTitle: {
    marginTop: spacing.large,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  item: {
    padding: spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightText,
  },
  itemText: {
    fontSize: 16,
    color: colors.text,
  },
  noItems: {
    marginTop: spacing.small,
    fontSize: 16,
    color: colors.lightText,
    fontStyle: 'italic',
  },
  deleteText: {
    color: 'red',
    marginLeft: 5,
  },
  editText: {
    color: 'blue', 
    marginLeft: 5,
  },
  buttonContainer_2: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
  
});