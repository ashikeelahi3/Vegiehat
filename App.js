import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SubmitPriceScreen from './screens/SubmitPriceScreen';

const Stack = createStackNavigator();

export default function App() {
  const [items, setItems] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} items={items} />}
        </Stack.Screen>
        <Stack.Screen name="Submit Price">
          {(props) => <SubmitPriceScreen {...props} items={items} setItems={setItems} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
