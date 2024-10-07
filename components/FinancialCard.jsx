import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { SvgUri } from 'react-native-svg'; // Adjust based on your SVG usage

import ArrowIcon from '../assets/arrow-down 1.svg';
import UpIcon from '../assets/Icons/up.svg';

export default function FinancialCard() {
    const [loaded] = useFonts({
        InterSemiBold: require('../assets/fonts/Inter 24pt SemiBold.ttf'),
        InterBold: require('../assets/fonts/Inter 24pt Bold.ttf'),
        InterMedium: require('../assets/fonts/Inter 24pt Medium.ttf'),
    });


    if (!loaded) {
        return <View><Text>Loading...</Text></View>; 
    }


    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Total Balance</Text>
                    <UpIcon />
                    {/* <SvgUri source={UpIcon} /> */}

                </View>
                <TouchableOpacity>
                    <Ionicons name="ellipsis-horizontal" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <Text style={styles.balance}>$ 2,548.00</Text>
            <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                   
                    <View style={styles.labelContainer}>
                        <View style={styles.arrowIconContainer}>
                            <ArrowIcon />
                            {/* <SvgUri source={ArrowIcon} /> */}

                        </View>
                        <Text style={styles.detailLabel}>Income</Text>
                    </View>
                    <Text style={styles.detailAmount}>$ 1,840.00</Text>
                </View>
                <View style={styles.detailItem}>
                    <View style={styles.labelContainer}>
                        <View style={styles.arrowIconContainer2}>
                            <ArrowIcon />
                            {/* <SvgUri source={ArrowIcon} /> */}
                        </View>
                        <Text style={styles.detailLabel}>Expenses</Text>
                    </View>
                    <Text style={styles.detailAmount}>$ 284.00</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#2F7E79',
        borderRadius: 20,
        padding: 15,
        width: '95%',
        maxWidth: 350,
        position: 'relative',
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        // Android shadow
        elevation: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    headerText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'InterSemiBold'
    },
    headerTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 5
    },
    balance: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'InterBold',
        marginBottom: 20,
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailItem: {
        alignItems: 'center',
    },
    detailLabel: {
        color: '#D0E5E4',
        fontSize: 16,
        marginVertical: 5,
        fontFamily: 'InterMedium'
    },
    detailAmount: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'InterSemiBold'
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 5,
    },
    arrowIconContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 5,
        borderRadius: 20
    },
    arrowIconContainer2: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 5,
        borderRadius: 20,
        transform: [{ rotate: '180deg' }]
    }
});