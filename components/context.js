import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({ userId: null, name: '' });
    useEffect(() => {
        fetchUserDetails();

    }, []);

    const fetchUserDetails = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log("Token found:", token);  // Debugging log

            if (token) {
                const decoded = jwtDecode(token);  // Ensure jwtDecode is working correctly
                const userId = decoded.id;
                console.log("Decoded userId:", userId);  // Debugging log

                const response = await axios.get(`http://192.168.137.1:3000/users/${userId}`);
                console.log("User data fetch", response);  // Debugging log
                setCurrentUser({
                    userId: userId,          // userId from the decoded token
                    name: response.data.name // name from the API response
                });
            } else {
                console.log('No token found in storage');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };
    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};
