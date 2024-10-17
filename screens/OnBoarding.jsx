import React from 'react';
import { View, Text, StyleSheet, Image, Platform, SafeAreaView, StatusBar } from 'react-native';
import GetStartedComponent from '../components/GetStarted';
// Import SVGs properly if using react-native-svg
import { useNavigation } from '@react-navigation/native';
import Ellipse3 from '../assets/Ellipse 3.svg';
import Ellipse4 from '../assets/Ellipse 4.svg';
import Ellipse5 from '../assets/Ellipse 5.svg';

const OnBoarding = () => {
    const navigation = useNavigation();

    const handleGetStarted = () => {
        navigation.navigate('AuthScreen');
    };

    console.log("OnBoarding component rendering");

    return (
        <View style={styles.safeArea}>
            <StatusBar backgroundColor="transparent" />
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Ellipse3 style={styles.ellipse} />
                    <Ellipse4 style={styles.ellipse} />
                    <Ellipse5 style={styles.ellipse} />
                    <Image
                        source={require('../assets/Donut.png')}
                        resizeMode='contain'
                        style={styles.donut}
                    />
                    <Image
                        source={require('../assets/Coint.png')}
                        resizeMode='contain'
                        style={styles.coint}
                    />
                    <Image
                        source={require('../assets/Man.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('../assets/shadows.png')}
                        resizeMode="contain"
                        style={styles.shadow}
                    />
                    <View style={styles.triangle} />
                </View>
                <GetStartedComponent onGetStartedPress={handleGetStarted} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#EEF8F7',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "65%",
        backgroundColor: '#EEF8F7',
        position: 'relative',
        paddingTop: StatusBar.currentHeight || 0,
    },
    ellipse: {
        position: 'absolute',
        width: Platform.OS === 'ios' ? '100%' : '100%',
    },
    image: {
        position: 'relative',
        top: "9%",
        width: "100%",
        height: "85%",
    },
    shadow: {
        position: "relative",
        top: "7%",
    },
    donut: {
        position: 'absolute',
        top: "25%",
        right: "15%",
        width: "17%",
        height: "17%",
    },
    coint: {
        position: 'absolute',
        top: "15%",
        left: "15%",
        width: "18%",
        height: "18%",
    },
    triangle: {
        position: 'absolute',
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderBottomWidth: 50,
        borderRightWidth: 360,
        borderBottomColor: '#FFFFFF',
        borderRightColor: 'transparent',
        bottom: 0,
        left: 0,
        zIndex: -1,
    },
});

export default OnBoarding;
