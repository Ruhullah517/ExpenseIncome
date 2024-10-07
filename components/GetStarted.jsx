import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';


const GetStartedComponent = ({ onGetStartedPress, onLoginPress }) => {
    const navigation = useNavigation();
    const [loaded] = useFonts({
        InterSemiBold: require('../assets/fonts/Inter 24pt SemiBold.ttf'),
        InterRegular: require('../assets/fonts/Inter 24pt Regular.ttf'),
    });


    if (!loaded) {
        return null;
    }
    return (
        <View style={styles.container}>
            {/* Heading Text */}
            <Text style={styles.heading}>Spend Smarter{"\n"}Save More</Text>

            {/* Get Started Button */}
            <TouchableOpacity onPress={onGetStartedPress}>
                <LinearGradient
                    colors={['#69AEA9', '#3F8782']} // Specify the start and end colors
                    start={{ x: 0.5, y: -0.17 }}    // Gradient direction (similar to 180deg)
                    end={{ x: 0.5, y: 1.23 }}
                    style={styles.button}      // Corresponding to the given gradient stops
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </LinearGradient>
            </TouchableOpacity>

            {/* Log In Text */}
            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already Have Account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('')}>
                    <Text style={styles.loginLink}>Log In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 20, // Adjust to fit below the 3D image
    },
    heading: {
        fontSize: 36,
        fontFamily: 'InterBold',
        textAlign: 'center',
        color: '#438883', // Color of the text as per the design
    },

    button: {
        paddingVertical: 15,
        paddingHorizontal: 100,
        borderRadius: 30,
        marginVertical: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#3b9c8b',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 13,
                backgroundColor: '#16b799', // or any base color of your button
                shadowColor: '#16b799',
            },
        }),
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'InterSemiBold',
        textAlign: 'center',
    },
    loginContainer: {
        flexDirection: 'row', // To align the "Already Have Account?" and "Log In" text in one line
        alignItems: 'center',
    },
    loginText: {
        fontSize: 14,
        color: '#707070',
        fontFamily: 'InterRegular', // Light grey text color
    },
    loginLink: {
        fontSize: 14,
        color: '#438883', // Same color as the button for the link
        fontFamily: 'InterRegular',
    },
});

export default GetStartedComponent;
