import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SvgUri } from 'react-native-svg'; // Adjust based on your SVG usage

import NotifyIcon from '../assets/Icons/NotifyIcon.svg';
import HalfCircle from '../assets/Icons/Halfcircle.svg';
import { useFonts } from 'expo-font';
import FinancialCard from './FinancialCard';
import axios from 'axios';
import { UserContext } from './context';


export default function HomeHeader() {
  const { currentUser } = useContext(UserContext);


    const [loaded] = useFonts({
        InterMedium: require('../assets/fonts/Inter 24pt Medium.ttf'),
        InterSemiBold: require('../assets/fonts/Inter 24pt SemiBold.ttf'),
    });
   

    if (!loaded) {
        return <View><Text>Loading...</Text></View>;
    }
    if(!currentUser.name){
        return <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" />
        </View>
    }
    return (<>
        <View style={styles.header}>
            <View style={styles.textContainer}>
                <Text style={styles.greeting}>Good afternoon,</Text>
                <Text style={styles.name}>{currentUser.name}</Text>
            </View>
            <View style={styles.iconContainer}>
                <NotifyIcon />
                <HalfCircle />
                {/* <SvgUri source={NotifyIcon}  />
                <SvgUri source={HalfCircle}  /> */}

                <View style={styles.notificationDot} />
            </View>
        </View>
        <View style={styles.financialCardContainer}>
            <FinancialCard />
        </View>
    </>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: "10%",
        paddingBottom: "10%",
        paddingHorizontal: "4%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    textContainer: {
        flex: 1,
    },
    greeting: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'InterMedium',
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'InterSemiBold',
    },
    iconContainer: {
        position: 'relative',
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 10,
        borderRadius: 10,
        width: 40,
        height: 40,
    },
    notificationDot: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 8,
        height: 8,
        backgroundColor: '#FFAB7B',
        borderRadius: 5,
    },
    financialCardContainer: {
        alignItems: 'center',
        zIndex: 1,
        position: "relative",
        top: "-10%"
    }
});