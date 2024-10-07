import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import SaveIcon from '../assets/Icons/saveIcon.svg';
import SortIcon from '../assets/Icons/sortIcon.svg';

const { width: screenWidth } = Dimensions.get('window');

// Mock data
const mockChartData = {
  Expense: {
    Day: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], data: [100, 600, 300, 400, 200, 800, 150] },
    Week: { labels: ['W1', 'W2', 'W3', 'W4'], data: [1500, 2000, 1800, 2200] },
    Month: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], data: [5000, 6000, 4500, 5500, 7000, 6500] },
    Year: { labels: ['2018', '2019', '2020', '2021', '2022'], data: [50000, 55000, 48000, 52000, 60000] },
  },
  Income: {
    Day: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], data: [500, 700, 600, 800, 400, 900, 700] },
    Week: { labels: ['W1', 'W2', 'W3', 'W4'], data: [2500, 3000, 2800, 3200] },
    Month: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], data: [7000, 8000, 7500, 8500, 9000, 8500] },
    Year: { labels: ['2018', '2019', '2020', '2021', '2022'], data: [70000, 75000, 78000, 82000, 90000] },
  }
};

const mockTransactions = {
  Expense: [
    { id: 1, name: 'Starbucks', date: 'Jan 12, 2022', amount: 150, logo: 'https://logo.clearbit.com/starbucks.com' },
    { id: 2, name: 'Amazon', date: 'Jan 15, 2022', amount: 250, logo: 'https://logo.clearbit.com/amazon.com' },
    { id: 3, name: 'Netflix', date: 'Jan 20, 2022', amount: 15, logo: 'https://logo.clearbit.com/netflix.com' },
    { id: 4, name: 'Uber', date: 'Jan 22, 2022', amount: 30, logo: 'https://logo.clearbit.com/uber.com' },
  ],
  Income: [
    { id: 1, name: 'Salary', date: 'Jan 1, 2022', amount: 5000, logo: null },
    { id: 2, name: 'Freelance', date: 'Jan 15, 2022', amount: 1000, logo: null },
    { id: 3, name: 'Dividends', date: 'Jan 20, 2022', amount: 200, logo: null },
    { id: 4, name: 'Rent', date: 'Jan 25, 2022', amount: 800, logo: null },
  ],
};

export default function StatisticsPage() {
  const [loaded] = useFonts({
    InterMedium: require('../assets/fonts/Inter 24pt Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter 24pt SemiBold.ttf'),
    InterRegular: require('../assets/fonts/Inter 24pt Regular.ttf'),
  });

  const [selectedPeriod, setSelectedPeriod] = useState('Day');
  const [selectedType, setSelectedType] = useState('Expense');
  const [chartData, setChartData] = useState(null);
  const [transactions, setTransactions] = useState(mockTransactions.Expense);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const chartWidth = screenWidth;

  useEffect(() => {
    setChartData(mockChartData[selectedType][selectedPeriod]);
    setTransactions(mockTransactions[selectedType]);
  }, [selectedPeriod, selectedType]);

  if (!loaded || !chartData) {
    return null;
  }

  const formattedChartData = {
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.data,
        color: () => `rgba(67, 136, 131, 1)`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={22} color="black" />
        <Text style={styles.headerTitle}>Statistics</Text>
        <SaveIcon />
      </View>

      <View style={styles.periodSelector}>
        {['Day', 'Week', 'Month', 'Year'].map((period) => (
          <TouchableOpacity
            key={period}
            style={[styles.periodButton, selectedPeriod === period && styles.selectedPeriod]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text style={[styles.periodText, selectedPeriod === period && styles.selectedPeriodText]}>
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.expenseTypeSelector}>
        <TouchableOpacity
          style={styles.expenseTypeButton}
          onPress={() => setShowTypeDropdown(!showTypeDropdown)}
        >
          <Text style={styles.expenseTypeText}>{selectedType} ▼</Text>
        </TouchableOpacity>
        {showTypeDropdown && (
          <View style={styles.typeDropdown}>
            <TouchableOpacity onPress={() => { setSelectedType('Expense'); setShowTypeDropdown(false); }}>
              <Text style={styles.dropdownItem}>Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setSelectedType('Income'); setShowTypeDropdown(false); }}>
              <Text style={styles.dropdownItem}>Income</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={formattedChartData}
          width={chartWidth}
          height={150}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => ` rgba(67,136,131,0.5)`,
            propsForLabels: {
              fontSize: 14,
              fontFamily: 'InterSemiBold',
            },
            propsForDots: {
              r: '5',
              strokeWidth: '8',
              stroke: 'rgba(67, 136, 131, 0.3)',
            },
          }}
          bezier
          style={styles.chart}
          withVerticalLines={false}
          withHorizontalLines={false}
          withDots={true}
          withInnerLines={false}
          withOuterLines={false}
          withVerticalLabels={true}
          withHorizontalLabels={false}
          hidePointsAtIndex={[]}
        />
      </View>

      <View style={styles.topSpendingHeader}>
        <Text style={styles.topSpendingTitle}>
          {selectedType === 'Expense' ? 'Top Spending' : 'Top Income'}
        </Text>
        <SortIcon />
      </View>
      <View style={{ marginHorizontal: "4%" }}>
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionItem}>
            {transaction.logo ? (
              <Image source={{ uri: transaction.logo }} style={styles.transactionLogo} />
            ) : (
              <View style={styles.transferLogo}>
                <Ionicons name={selectedType === 'Expense' ? "arrow-forward" : "arrow-back"} size={24} color="white" />
              </View>
            )}
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionName}>{transaction.name}</Text>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
            </View>
            <Text style={[
              styles.transactionAmount,
              { color: selectedType === 'Expense' ? '#F95B51' : '#00A86B' }
            ]}>
              {selectedType === 'Expense' ? '- ' : '+ '}
              $ {transaction.amount.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: "12%",
    paddingHorizontal: "5%",
    paddingBottom: "5%"
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'InterSemiBold'
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: "5%",
    paddingHorizontal: "5%"
  },
  periodButton: {
    paddingVertical: "2%",
    paddingHorizontal: "7%",
    borderRadius: 10,
  },
  selectedPeriod: {
    backgroundColor: '#438883',
  },
  periodText: {
    color: '#666666',
    fontFamily: 'InterRegular',
    fontSize: 13
  },
  selectedPeriodText: {
    color: '#fff',
  },
  expenseTypeSelector: {
    alignItems: 'flex-end',
    paddingRight: 16,
    marginBottom: 16,
    zIndex: 1,
  },
  expenseTypeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#666666',
  },
  expenseTypeText: {
    color: '#666666',
    fontFamily: 'InterRegular',
  },
  typeDropdown: {
    position: 'absolute',
    top: 40,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#666666',
    padding: 8,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontFamily: 'InterRegular',
  },
  chart: {
    marginVertical: "2%",
    borderRadius: 16,
    paddingBottom: 5
  },
  chartContainer: {
    marginHorizontal: "4%",
    alignItems: 'center'
  },
  topSpendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  topSpendingTitle: {
    fontSize: 18,
    fontFamily: 'InterSemiBold'
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: '#e0e0e0',
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    marginBottom: "3%"
  },
  transactionLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  transferLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1abc9c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 16,
  },
  transactionName: {
    fontSize: 16,
    fontFamily: 'InterMedium'
  },
  transactionDate: {
    fontSize: 13,
    color: '#666666',
    fontFamily: 'InterRegular'
  },
  transactionAmount: {
    fontSize: 18,
    fontFamily: 'InterSemiBold',
  },
});