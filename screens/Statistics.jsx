import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, ActivityIndicator, Platform, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import SaveIcon from '../assets/Icons/saveIcon.svg';
import SortIcon from '../assets/Icons/sortIcon.svg';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { UserContext } from '../components/context';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing'; // To share or download the file
import XLSX from 'xlsx';
import * as MediaLibrary from 'expo-media-library';



const { width: screenWidth } = Dimensions.get('window');

export default function StatisticsPage() {
  const { currentAccount } = useContext(UserContext);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded] = useFonts({
    InterMedium: require('../assets/fonts/Inter 24pt Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter 24pt SemiBold.ttf'),
    InterRegular: require('../assets/fonts/Inter 24pt Regular.ttf'),
  });

  const [selectedPeriod, setSelectedPeriod] = useState('Day');
  const [selectedType, setSelectedType] = useState('Expense');
  const [chartData, setChartData] = useState(null);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const navigation = useNavigation();
  const chartWidth = screenWidth; // Adjust as needed or use Dimensions API

  useEffect(() => {
    if (currentAccount) {
      fetchExpenses();
    }
  }, [currentAccount]);

  useFocusEffect(
    React.useCallback(() => {
      if (currentAccount) {
        fetchExpenses();
      }
    }, [currentAccount])
  );

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://expense-income-backend.vercel.app/accounts/${currentAccount.id}/expenses`);

      // Transform the expense data
      const transformedExpenses = response.data.map(expense => ({
        id: expense.id,
        name: expense.name,
        amount: parseFloat(expense.amount),
        date: new Date(expense.date),
        logo: expense.image_path ? `https://expense-income-backend.vercel.app${expense.image_path}` : null,
        type: expense.type, // Assuming 'expense' type is returned from the API
      }));

      const mockIncomeData = [
        { id: 101, name: 'Salary', date: new Date('2023-01-01'), amount: 3000, type: 'income' },
        { id: 102, name: 'Freelancing', date: new Date('2023-05-10'), amount: 1200, type: 'income' },
        { id: 103, name: 'Dividends', date: new Date('2024-09-25'), amount: 500, type: 'income' },
        { id: 104, name: 'Profit', date: new Date('2024-10-23'), amount: 700, type: 'income' },
      ];

      const combinedData = [...transformedExpenses, ...mockIncomeData];
      setExpenses(combinedData);

      // Generate chart data based on combinedData and selectedPeriod
      generateChartData(combinedData, selectedPeriod);
    } catch (error) {
      console.error('Error fetching expenses and income:', error);
    } finally {
      setLoading(false);
    }
  };
  // Filter expenses based on selectedType
  const filteredExpenses = expenses.filter(expense =>
    selectedType === 'Expense' ? expense.type.toLowerCase() === 'expense' : expense.type.toLowerCase() === 'income'
  );

  const generateChartData = (expensesData, period) => {
    // Initialize labels and data
    let labels = [];
    let data = [];
    const now = new Date();

    // Filter expensesData based on the selected type (Expense or Income)
    const filteredData = expensesData.filter(item =>
      selectedType === 'Expense' ? item.type.toLowerCase() === 'expense' : item.type.toLowerCase() === 'income'
    );

    let groupedExpenses = {};

    // Handle data grouping and labels based on selected period
    switch (period) {
      case 'Day':
        // Get current week's start (Monday) and end (Sunday)
        const currentWeekStart = new Date(now.setDate(now.getDate() - now.getDay() + 1)); // Monday
        const currentWeekEnd = new Date(now.setDate(now.getDate() + 6)); // Sunday

        // Initialize days of the week
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        // Group filteredData by day of the current week
        filteredData.forEach(expense => {
          const expenseDate = new Date(expense.date);
          if (expenseDate >= currentWeekStart && expenseDate <= currentWeekEnd) {
            const dayOfWeek = expenseDate.getDay() === 0 ? 6 : expenseDate.getDay() - 1; // 0 is Sunday, shift it to end
            if (groupedExpenses[dayOfWeek]) {
              groupedExpenses[dayOfWeek] += expense.amount;
            } else {
              groupedExpenses[dayOfWeek] = expense.amount;
            }
          }
        });

        // Populate data for each day
        for (let i = 0; i < labels.length; i++) {
          data.push(groupedExpenses[i] || 0);
        }
        break;

      case 'Week':
        // Initialize weeks of the current month
        labels = ['W1', 'W2', 'W3', 'W4', 'W5'];
        filteredData.forEach(expense => {
          const expenseDate = new Date(expense.date);
          if (expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear()) {
            const weekOfMonth = getWeekNumber(expenseDate) - getWeekNumber(new Date(expenseDate.getFullYear(), expenseDate.getMonth(), 1)) + 1;
            if (groupedExpenses[weekOfMonth]) {
              groupedExpenses[weekOfMonth] += expense.amount;
            } else {
              groupedExpenses[weekOfMonth] = expense.amount;
            }
          }
        });

        // Populate data for each week
        for (let i = 1; i <= 5; i++) {
          data.push(groupedExpenses[i] || 0);
        }
        break;

      case 'Month':
        // Initialize months of the current year
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Group filteredData by month of the current year
        filteredData.forEach(expense => {
          const expenseDate = new Date(expense.date);
          if (expenseDate.getFullYear() === now.getFullYear()) {
            const month = expenseDate.getMonth(); // Month is 0-indexed
            if (groupedExpenses[month]) {
              groupedExpenses[month] += expense.amount;
            } else {
              groupedExpenses[month] = expense.amount;
            }
          }
        });

        // Populate data for each month
        for (let i = 0; i < 12; i++) {
          data.push(groupedExpenses[i] || 0);
        }
        break;

      case 'Year':
        // Initialize last 4 years, including the current year
        labels = [now.getFullYear() - 3, now.getFullYear() - 2, now.getFullYear() - 1, now.getFullYear()];

        // Group filteredData by year
        filteredData.forEach(expense => {
          const expenseYear = new Date(expense.date).getFullYear();
          if (expenseYear >= now.getFullYear() - 3 && expenseYear <= now.getFullYear()) {
            if (groupedExpenses[expenseYear]) {
              groupedExpenses[expenseYear] += expense.amount;
            } else {
              groupedExpenses[expenseYear] = expense.amount;
            }
          }
        });

        // Populate data for each year
        for (let i = 0; i < labels.length; i++) {
          data.push(groupedExpenses[labels[i]] || 0);
        }
        break;

      default:
        break;
    }

    setChartData({ labels, data });
  };


  // Helper function to get week number
  const getWeekNumber = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
  };

  // Update chart data whenever selectedPeriod changes
  useEffect(() => {
    if (expenses.length > 0) {
      generateChartData(expenses, selectedPeriod);
    }
  }, [selectedPeriod, expenses, selectedType]);

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

  const downloadExcel = async () => {
    try {
      // Prepare the data for the Excel file
      const worksheetData = expenses.map(expense => ({
        Name: expense.name,
        Amount: expense.amount,
        Date: expense.date.toISOString().split('T')[0], // Format date
        Type: expense.type,
      }));

      // Create a worksheet and workbook
      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Statistics');

      // Convert workbook to Base64-encoded string
      const base64String = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });

      // Get current date and format it as YYYY-MM-DD
      const currentDate = new Date().toISOString().split('T')[0]; // e.g., '2024-10-23'

      // Define file path with the current date in the file name
      const fileUri = `${FileSystem.documentDirectory}statistics_${currentDate}.xlsx`;

      // Write the file as Base64
      await FileSystem.writeAsStringAsync(fileUri, base64String, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Save the file to the device's local storage (Android/iOS)
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === 'granted') {
          const asset = await MediaLibrary.createAssetAsync(fileUri);
          const album = await MediaLibrary.getAlbumAsync('Download');
          if (album == null) {
            await MediaLibrary.createAlbumAsync('Download', asset, false);
          } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
          }
          Alert.alert('Download Complete', `The file has been downloaded as statistics_${currentDate}.xlsx.`);
        } else {
          Alert.alert('Permission Denied', 'Permission to access media library is required.');
        }
      }


      // Share the file if sharing is available
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert('Error', 'Sharing is not available on your device.');
      }
    } catch (error) {
      console.error('Error generating Excel file:', error);
      Alert.alert('Error', 'Failed to generate the Excel file.');
    }
  };


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!loading && expenses.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No transactions available.</Text>
      </View>
    );
  }



  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Statistics</Text>
        <TouchableOpacity onPress={downloadExcel}>
          <SaveIcon />
        </TouchableOpacity>
      </View>

      {/* Period Selector */}
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

      {/* Type Selector */}
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

      {/* Chart */}
      <View style={styles.chartContainer}>
        <LineChart
          data={formattedChartData}
          width={chartWidth}
          height={150}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2, // Adjust decimal places as needed
            color: (opacity = 1) => `rgba(67,136,131, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForLabels: {
              fontSize: 12,
              fontFamily: 'InterSemiBold',
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: 'rgba(67, 136, 131, 0.5)',
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

      {/* Top Spending/Income Header */}
      <View style={styles.topSpendingHeader}>
        <Text style={styles.topSpendingTitle}>
          {selectedType === 'Expense' ? 'Top Spending' : 'Top Income'}
        </Text>
        <SortIcon />
      </View>

      {/* Transactions List */}
      <View style={{ marginHorizontal: "4%" }}>
        {filteredExpenses.map((expense) => (
          <View key={expense.id} style={styles.transactionItem}>
            <View style={styles.transferLogo}>
              <Text>{expense.name[0] + expense.name[1]}</Text>
              {/* <Ionicons name={selectedType === 'Expense' ? "arrow-forward" : "arrow-back"} size={24} color="white" /> */}
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionName}>{expense.name}</Text>
              <Text style={styles.transactionDate}>
                {expense.date.toLocaleDateString()} {/* Format as needed */}
              </Text>
            </View>
            <Text style={[
              styles.transactionAmount,
              { color: selectedType === 'Expense' ? '#F95B51' : '#00A86B' }
            ]}>
              {selectedType === 'Expense' ? '- ' : '+ '}
              $ {expense.amount.toFixed(2)}
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
    paddingBottom: 5,
  },
  chartContainer: {
    alignItems: 'center',
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
