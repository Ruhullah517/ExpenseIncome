import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Remove the curly braces from jwtDecode import
import React, { createContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({ userId: null, name: '' });
    const [currentAccount, setCurrentAccount] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const checkTokenAndFetchDetails = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                fetchUserDetails();
            }
        };
        checkTokenAndFetchDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log("Token found:", token);  // Debugging log

            if (token) {
                const decoded = jwtDecode(token);  // Ensure jwtDecode is working correctly
                const userId = decoded.id;
                console.log("Decoded userId:", userId);  // Debugging log

                const userResponse = await axios.get(`http://192.168.137.1:3000/users/${userId}`);
                console.log("User data fetched:", userResponse.data.name);  // Debugging log
                setCurrentUser({
                    userId: userId,          // userId from the decoded token
                    name: userResponse.data.name // name from the API response
                });

                // Fetch the user's current account
                const accountResponse = await axios.get(`http://192.168.137.1:3000/accounts/current/${userId}`);
                console.log("Account fetched:", accountResponse.data[0]);
                setCurrentAccount(accountResponse.data[0]); // Update currentAccount
            } else {
                console.log('No token found in storage');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };


    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, currentAccount, setCurrentAccount,fetchUserDetails }}>
            {children}
        </UserContext.Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});
