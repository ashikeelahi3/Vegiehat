import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ItemsProvider } from './context/ItemsContext'; // Import the provider
import HomeScreen from './screens/HomeScreen';
import SubmitPriceScreen from './screens/SubmitPriceScreen';
import VisualizationScreen from './screens/VisualizationScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <ItemsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Submit Price" component={SubmitPriceScreen} />
          <Stack.Screen name="Visualization" component={VisualizationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ItemsProvider>
  );
}

