import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import YoutubeIcon from '../assets/Icons/youtube.svg';
import UpworkIcon from '../assets/Icons/upwork.svg';
import PaypalIcon from '../assets/Icons/paypal.svg';
import PersonIcon from '../assets/Icons/person.svg';
import { useFonts } from 'expo-font';
import { UserContext } from './context';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';


// const transactions = [
//   { id: '1', name: 'Upwork', date: 'Today', amount: 850, type: 'credit', icon: UpworkIcon },
//   { id: '2', name: 'Transfer', date: 'Yesterday', amount: -85, type: 'debit', icon: PersonIcon },
//   { id: '3', name: 'Paypal', date: 'Jan 30, 2022', amount: 1406, type: 'credit', icon: PaypalIcon },
//   { id: '4', name: 'Youtube', date: 'Jan 16, 2022', amount: -11.99, type: 'debit', icon: YoutubeIcon },
// ];
const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const TransactionItem = ({ item }) => (
  <View style={styles.transactionItem}>
    <View style={styles.iconContainer}>
      <Text>{item.name[0] + item.name[1]}</Text>
    </View>
    <View style={styles.transactionDetails}>
      <Text style={styles.transactionName}>{item.name}</Text>
      <Text style={styles.transactionDate}>{formatDate(item.date)}</Text>
    </View>
    <Text style={[styles.transactionAmount, { color: item.type === 'income' ? '#25A969' : '#F95B51' }]}>
      {item.type === 'income' ? '+' : '-'} ${Math.abs(item.amount).toFixed(2)}
    </Text>
  </View>
);

export default function HomeTransactionHistory() {
  const { currentAccount } = useContext(UserContext);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded] = useFonts({
    InterSemiBold: require('../assets/fonts/Inter 24pt SemiBold.ttf'),
    InterMedium: require('../assets/fonts/Inter 24pt Medium.ttf'),
    InterRegular: require('../assets/fonts/Inter 24pt Regular.ttf'),
  });

  useEffect(() => {
    if (currentAccount) {
      setExpenses([]);
      fetchExpenses();
    }
  }, [currentAccount]);
  // Fetch expenses when the Home screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      if (currentAccount) {
        fetchExpenses(); // Re-fetch expenses whenever the screen is focused
      }
    }, [currentAccount])
  );

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://192.168.137.1:3000/accounts/${currentAccount.id}/expenses`);
      setExpenses(response.data);
      console.log("expenses : ", response.data);

    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!loaded) {
    return <View><Text>Loading...</Text></View>;
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  if (!loading && expenses.length === 0) {
    return <Text>No transactions available.</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions History</Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>
      <FlatList
        data={expenses}
        renderItem={({ item, index }) => <TransactionItem item={item} style={index === expenses.length - 1 ? { marginBottom: 0 } : null} />}
        keyExtractor={item => item.id}
        initialNumToRender={4}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    marginHorizontal: "7%",
    marginTop: "30%"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: "InterSemiBold"
  },
  seeAll: {
    color: '#666666',
    fontFamily: "InterRegular",
    fontSize: 14
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  iconContainer: {
    backgroundColor: "#F0F6F5",
    width: 50,
    height: 50,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontFamily: "InterMedium"
  },
  transactionDate: {
    fontSize: 13,
    color: '#666666',
    fontFamily: "InterRegular"
  },
  transactionAmount: {
    fontSize: 18,
    fontFamily: "InterSemiBold"
  },
});