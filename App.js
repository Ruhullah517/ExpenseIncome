import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnBoarding from './screens/OnBoarding';
import CustomSplashScreen from './components/CustomSplashScreen';
import CommonStackNavigator from './components/CommonNavigator';
import AuthScreen from './screens/authScreen';
import { UserProvider } from './components/context';

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
        setIsSplashScreen(false); // Hide the splash screen after checking login status
      }
    };

    checkToken();

    // Display the splash screen initially for 2.5 seconds
    const timeoutId = setTimeout(() => {
      setIsSplashScreen(false);
    }, 2500);

    return () => clearTimeout(timeoutId);  // Cleanup function to clear the timeout
  }, []);

  if (isSplashScreen || isLoading) {
    return <CustomSplashScreen />;
  }

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn ? (
              // Only show the main app screens if the user is logged in
              <>
                <Stack.Screen name="MainApp" component={CommonStackNavigator} />
                <Stack.Screen name="AuthScreen" component={AuthScreen} />
              </>
            ) : (
              // Show the onboarding and auth screens if the user is not logged in
              <>
                <Stack.Screen name="OnBoarding" component={OnBoarding} />
                <Stack.Screen name="AuthScreen" component={AuthScreen} />
                <Stack.Screen name="MainApp" component={CommonStackNavigator} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </>
  );
}
