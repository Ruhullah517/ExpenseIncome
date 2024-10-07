import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
// Import SVG components correctly
import { SvgUri } from 'react-native-svg'; // Adjust based on your SVG usage
import YoutubeIcon from '../assets/Icons/youtube.svg';
import UpworkIcon from '../assets/Icons/upwork.svg';
import PaypalIcon from '../assets/Icons/paypal.svg';
import PersonIcon from '../assets/Icons/person.svg';
import { useFonts } from 'expo-font';


const transactions = [
  { id: '1', name: 'Upwork', date: 'Today', amount: 850, type: 'credit', icon: UpworkIcon },
  { id: '2', name: 'Transfer', date: 'Yesterday', amount: -85, type: 'debit', icon: PersonIcon },
  { id: '3', name: 'Paypal', date: 'Jan 30, 2022', amount: 1406, type: 'credit', icon: PaypalIcon },
  { id: '4', name: 'Youtube', date: 'Jan 16, 2022', amount: -11.99, type: 'debit', icon: YoutubeIcon },
];

const TransactionItem = ({ item }) => (
  <View style={styles.transactionItem}>
    <View style={styles.iconContainer}>
      <item.icon width={30} height={30} style={styles.icon} />
      {/* <SvgUri width={30} height={30} source={item.icon} style={styles.icon} /> */}
    </View>
    <View style={styles.transactionDetails}>
      <Text style={styles.transactionName}>{item.name}</Text>
      <Text style={styles.transactionDate}>{item.date}</Text>
    </View>
    <Text style={[styles.transactionAmount, { color: item.type === 'credit' ? '#25A969' : '#F95B51' }]}>
      {item.type === 'credit' ? '+' : '-'} ${Math.abs(item.amount).toFixed(2)}
    </Text>
  </View>
);

export default function HomeTransactionHistory() {
  const [loaded] = useFonts({
    InterSemiBold: require('../assets/fonts/Inter 24pt SemiBold.ttf'),
    InterMedium: require('../assets/fonts/Inter 24pt Medium.ttf'),
    InterRegular: require('../assets/fonts/Inter 24pt Regular.ttf'),
  });


  if (!loaded) {
    return <View><Text>Loading...</Text></View>; 
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions History</Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>
      <FlatList
        data={transactions}
        renderItem={({ item, index }) => <TransactionItem item={item} style={index === transactions.length - 1 ? { marginBottom: 0 } : null} />}
        keyExtractor={item => item.id}
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