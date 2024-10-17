import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions, BackHandler, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ellipse9 from '../assets/Ellipse 9.svg';
import Ellipse8 from '../assets/Ellipse 8.svg';
import Ellipse7 from '../assets/Ellipse 7.svg';
import HomeHeader from '../components/HomeHeader';
import HomeTransactionHistory from '../components/HomeTransactionHistory';
import SendAgainSection from '../components/SendAgainSection';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import { useFocusEffect } from '@react-navigation/native';

// Get device dimensions for responsive design
const { height: windowHeight } = Dimensions.get('window');

const Home = () => {
  const [userName, setUserName] = useState('');

  const handleBackPress = () => {
    Alert.alert(
      'Exit App',
      'Are You Sure?',
      [{
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel'
      },
      {
        text: 'Exit App',
        onPress: () => BackHandler.exitApp()
      }]);
    return true;
  };
  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress)
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
      }
    }))

  useEffect(() => {
    fetchUserDetails();

  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log("Token found:", token);  // Debugging log

      if (token) {
        const decoded = jwtDecode(token);  // Ensure jwtDecode is working correctly
        const userId = decoded.id;
        console.log("Decoded userId:", userId);  // Debugging log

        const response = await axios.get(`http://192.168.137.1:3000/users/${userId}`);
        console.log("User data fetched:", response.data);  // Debugging log

        setUserName(response.data.name);
      } else {
        console.log('No token found in storage');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  // Render header with gradient and SVG ellipses
  const renderHeader = () => (
    <View>
      <LinearGradient
        colors={['rgba(66,150,144,1)', 'rgba(42,124,118,1)']}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={styles.gradient}
      >
        {/* Positioned SVGs for decorative ellipses */}
        <Ellipse9 style={styles.ellipse9} />
        <Ellipse8 style={styles.ellipse8} />
        <Ellipse7 style={styles.ellipse7} />

        <View style={styles.content}>
          <HomeHeader userName={userName} />
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={<View style={styles.footer} />}
      data={[{ key: 'transactions' }]}
      renderItem={() => <><HomeTransactionHistory /><SendAgainSection /></>}
    />
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flexGrow: 1,
  },
  gradient: {
    height: windowHeight * 0.33, // Adjust height to 30% of window height for responsiveness
    position: 'relative',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  content: {
    flex: 1,
    paddingTop: "10%",
    paddingHorizontal: "4%"// Padding to avoid content overlapping with the status bar
  },
  // Responsive SVG positioning with percentage-based top and left values
  ellipse9: {
    position: 'absolute',
    top: '-5%',
    left: '35%',
  },
  ellipse8: {
    position: 'absolute',
    top: '-5%',
    left: '10%',
  },
  ellipse7: {
    position: 'absolute',
    top: '-5%',
    left: '-5%',
  },
  footer: {
    paddingBottom: '12%' // Space at the bottom (adjust as needed)
  },
});

export default Home;
