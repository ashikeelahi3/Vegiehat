import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function VisualizationScreen({ items }) {
  const labels = items.map((item) => item.itemName);
  const data = items.map((item) => parseFloat(item.price));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Price Visualization</Text>
      {items.length > 0 ? (
        <BarChart
          data={{
            labels: labels,
            datasets: [
              {
                data: data,
              },
            ],
          }}
          width={Dimensions.get('window').width - 40} // Chart width
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 10,
            borderRadius: 16,
          }}
        />
      ) : (
        <Text style={styles.noData}>No data to visualize.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  noData: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});
