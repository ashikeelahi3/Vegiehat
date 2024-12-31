import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import SubmitPriceScreen from './screens/SubmitPriceScreen';
import VisualizationScreen from './screens/VisualizationScreen';

const Stack = createStackNavigator();

export default function App() {
  const [items, setItems] = useState([]);

  // Load items from AsyncStorage when the app starts
  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('items');
        if (storedItems) {
          setItems(JSON.parse(storedItems));
        }
      } catch (error) {
        console.error('Failed to load items:', error);
      }
    };
    loadItems();
  }, []);

  // Save items to AsyncStorage whenever they are updated
  useEffect(() => {
    const saveItems = async () => {
      try {
        await AsyncStorage.setItem('items', JSON.stringify(items));
      } catch (error) {
        console.error('Failed to save items:', error);
      }
    };
    saveItems();
  }, [items]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} items={items} />}
        </Stack.Screen>
        <Stack.Screen name="Submit Price">
          {(props) => <SubmitPriceScreen {...props} items={items} setItems={setItems} />}
        </Stack.Screen>
        <Stack.Screen name="Visualization">
          {(props) => <VisualizationScreen {...props} items={items} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
