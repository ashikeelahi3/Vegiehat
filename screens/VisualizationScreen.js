import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { ItemsContext } from '../context/ItemsContext'; // Import the context
import { colors, spacing } from '../constants/theme';

export default function VisualizationScreen() {
  const { items } = useContext(ItemsContext); // Access the context

  // Define chart dimensions for a professional, centered layout
  const chartWidth = Math.min(Dimensions.get('window').width * 0.9, 350);

  // Prepare data for the chart
  const data = {
    labels: items.map((item) => item.itemName), // Item names as labels
    datasets: [
      {
        data: items.map((item) => parseFloat(item.price)), // Prices as data
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Price Visualization</Text>
      {items.length > 0 ? (
        <BarChart
          data={data}
          width={chartWidth} // Restrict chart width for better layout
          height={250}
          fromZero // Ensures bars start from zero
          showBarTops={false} // Hides the rounded tops of bars
          withInnerLines={false} // Removes gridlines for a cleaner look
          chartConfig={{
            backgroundColor: colors.background,
            backgroundGradientFrom: '#4CAF50', // Professional gradient (Green to Light Green)
            backgroundGradientTo: '#81C784',
            decimalPlaces: 2,
            barPercentage: 0.6, // Moderate bar width
            color: (opacity = 1) => `rgba(63, 81, 181, ${opacity})`, // Bars in blue
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black labels
          }}
          style={styles.chart}
        />
      ) : (
        <Text style={styles.noData}>No data available for visualization.</Text>
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
    padding: spacing.large,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.medium,
  },
  chart: {
    marginVertical: spacing.medium,
    borderRadius: 10,
    elevation: 3, // Shadow for better visual appeal
    backgroundColor: '#fff', // White background for a professional look
    padding: spacing.small, // Padding around the chart
  },
  noData: {
    fontSize: 16,
    color: colors.lightText,
    fontStyle: 'italic',
  },
});
