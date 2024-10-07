import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnBoarding from './screens/OnBoarding';
import { StatusBar } from 'react-native';
import CustomSplashScreen from './components/CustomSplashScreen'
import CommonStackNavigator from './components/CommonNavigator';

const Stack = createStackNavigator();

export default function App() {
  const [isSplashScreen, setIsSplashScreen] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsSplashScreen(false);
    }, 3000);

    // Cleanup function to clear the timeout
    return () => clearTimeout(timeoutId);
  }, []);

  if (isSplashScreen) {
    return <CustomSplashScreen />;
  }

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
          <Stack.Screen name="MainApp" component={CommonStackNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
