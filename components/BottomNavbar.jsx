import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeIcon from '../assets/Icons/HomeIcon.svg';
import StatsIcon from '../assets/Icons/StatsIcon.svg';
import AddIcon from '../assets/Icons/addIcon.svg';
import WalletIcon from '../assets/Icons/walletIcon.svg';
import UserIcon from '../assets/Icons/userIcon.svg';
import HomeFillIcon from '../assets/Icons/homeFill.svg';
import StatsFillIcon from '../assets/Icons/bar-chart-fill 1.svg';
import ProfileFillIcon from '../assets/Icons/user-fill 1.svg';

const BottomNavBar = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Home');

  const navigateAndSetActive = (screenName) => {
    setActiveTab(screenName);
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.tabBarContainer}>
      <View style={activeTab === 'Home' ? styles.tabBar : styles.tabBar1}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigateAndSetActive('Home')}>
          {activeTab === 'Home' ? <HomeFillIcon width={26} height={27} /> : <HomeIcon width={26} height={27} />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigateAndSetActive('Statistics')}>
          {activeTab === 'Statistics' ? <StatsFillIcon width={30} height={25} /> : <StatsIcon width={30} height={25} />}
        </TouchableOpacity>
        
        {activeTab === 'Home' && (
          <>
            <TouchableOpacity style={styles.addButton} onPress={() => navigateAndSetActive('AddExpense')}>
              <AddIcon width={25} height={25} />
            </TouchableOpacity>
            <View style={styles.curves}></View>
            <View style={styles.curves2}></View>
          </>
        )}
        
        <TouchableOpacity style={styles.tabItem}>
          <WalletIcon width={30} height={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigateAndSetActive('Profile')}>
          {activeTab === 'Profile' ? <ProfileFillIcon width={30} height={30} /> : <UserIcon width={30} height={30} />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // Enhanced shadow for iOS
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: -10  // Increased negative value for upward shadow
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,  // Increased shadow radius for a softer, more spread out shadow
    // Enhanced elevation for Android
    elevation: 35,  // Increased elevation for a more pronounced shadow effect
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 60,
  },
  tabBar1:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 60,
    gap:30
  },
  tabItem: {
    alignItems: 'center',
    
  },
  addButton: {
    backgroundColor: '#438883',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    position: "relative",
    top: -16,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    // Shadow for Android
    elevation: 8,
    zIndex:1
  },
  curves:{
    position:"absolute",
    top:0,
    left:"39.7%",
    right:"50%",
    // bottom:0,
    backgroundColor:"transparent",
    width:35,
    height:34,
    borderBottomLeftRadius:40,
    borderBottomWidth:6,
    borderLeftWidth:6,
    borderColor: "rgba(153, 153, 153, 0.1)",
    zIndex:0
  },
  curves2:{
    position:"absolute",
    top:0,
    left:"49.5%",
    right:"50%",
    // bottom:0,
    backgroundColor:"transparent",
    width:35,
    height:34,
    borderBottomRightRadius:40,
    borderBottomWidth:6,
    borderRightWidth:6,
    borderColor: "rgba(153, 153, 153, 0.1)",
    zIndex:0
  }
});

export default BottomNavBar;