import React from 'react';
import { Image, StyleSheet, View,Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {useFonts} from 'expo-font';

export default function CustomSplashScreen() {
    const [loaded, error] = useFonts({
        InterBold: require('../assets/fonts/Inter 24pt Bold.ttf'),
    });

    if (error) {
        console.error("Error loading font:", error);
        return null; // Optionally, return a fallback UI
    }

    if (!loaded) {
        return null;
    }
  return (
    <View style={styles.container}>
      <LinearGradient
         colors={['#69AEA9', '#3F8782']}   // The colors for the gradient
         start={{ x: 0.5, y: -0.17 }}      // Equivalent to 180deg
         end={{ x: 0.5, y: 1.23 }}
        style={styles.gradient}
      >
       <Text style={styles.text}>mono</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 50,
    fontFamily: 'InterBold',
  },
});