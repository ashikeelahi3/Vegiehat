import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const ItemsContext = createContext();

// Provide the context to the application
export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Load items from local storage when the app starts
  useEffect(() => {
    const loadItems = async () => {
        try {
            const storedItems = await AsyncStorage.getItem('items')
            if (storedItems) {
                setItems(JSON.parse(storedItems));
            }
        } catch (err) {
            console.error('Error loading items from local storage:', err);
        }
    }
    loadItems();
  }, [])

  // Save items to local storage when the app state changes
  useEffect(() => {
    const saveItems = async () => {
        try {
            await AsyncStorage.setItem('items', JSON.stringify(items));
        } catch (err) {
            console.error('Error saving items to local storage:', err);
        }
    }
    saveItems();
  }, [items])
  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  );
};
