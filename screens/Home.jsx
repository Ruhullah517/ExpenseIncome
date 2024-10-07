import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgUri } from 'react-native-svg'; // Adjust based on your SVG usage
import Ellipse9 from '../assets/Ellipse 9.svg';
import Ellipse8 from '../assets/Ellipse 8.svg';
import Ellipse7 from '../assets/Ellipse 7.svg';
import HomeHeader from '../components/HomeHeader';
import HomeTransactionHistory from '../components/HomeTransactionHistory';
import SendAgainSection from '../components/SendAgainSection';

// Get device dimensions for responsive design
const { height: windowHeight } = Dimensions.get('window');

const Home = () => {
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
        {/* <SvgUri width="100%" height="100%" source={Ellipse9} style={styles.ellipse9} />
        <SvgUri width="100%" height="100%" source={Ellipse8} style={styles.ellipse8} />
        <SvgUri width="100%" height="100%" source={Ellipse7} style={styles.ellipse7} /> */}
        <View style={styles.content}>
          <HomeHeader />
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
