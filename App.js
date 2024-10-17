import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnBoarding from './screens/OnBoarding';
import CustomSplashScreen from './components/CustomSplashScreen';
import CommonStackNavigator from './components/CommonNavigator';
import AuthScreen from './screens/authScreen';
import Home from './screens/Home';

const Stack = createStackNavigator();

export default function App() {
  const [isSplashScreen, setIsSplashScreen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for token in AsyncStorage
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsLoggedIn(!!token);  // Simplified login check
      } catch (error) {
        console.error('Error checking token:', error);
      } finally {
        setIsLoading(false);  // Stop loading once token check is done
      };

    };

    // Display the splash screen initially and hide it after 2.5 seconds
    const timeoutId = setTimeout(() => {
      setIsSplashScreen(false);
      checkToken();

    }, 2500);

    return () => clearTimeout(timeoutId);  // Cleanup function to clear the timeout
  }, []);

  if (isSplashScreen) {
    return <CustomSplashScreen />;
  }
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Render different screens based on login status */}
          {!isLoggedIn ? <>
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
            <Stack.Screen name='AuthScreen' component={AuthScreen} />
            <Stack.Screen name="MainApp" component={CommonStackNavigator} />
          </>
            :
            <>
              <Stack.Screen name="MainApp" component={CommonStackNavigator} />
              <Stack.Screen name='AuthScreen' component={AuthScreen} />
            </>
          }
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
