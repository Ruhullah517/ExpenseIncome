import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, BackHandler } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../components/context';

export default function AuthScreen() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigation = useNavigation();
    const { fetchUserDetails } = useContext(UserContext);


    const handleBackPress = () => {
        Alert.alert(
            'Exit App',
            'Are You Sure?',
            [{
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel'
            },
            {
                text: 'Exit App',
                onPress: () => BackHandler.exitApp()
            }]);
        return true;
    };
    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', handleBackPress)
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
            }
        }))

    const handleSubmit = () => {
        // Here you would typically handle the authentication logic
        console.log(isLogin ? 'Logging in' : 'Signing up', { email, password, name });
        if (isLogin) {
            handleLogin();
        } else {
            handleSignup();
        }
    };
    const handleSignup = () => {
        axios.post('https://expense-income-backend.vercel.app/signup', { email, password, name })
            .then(response => {
                alert('User created!');
                setIsLogin(true);
                // Clear the form after successful signup
                setEmail('');
                setName('');
                setPassword('');
            })
            .catch(error => {
                console.error('Signup error:', error); // Log the exact error
                alert('Error creating user');
            });
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://expense-income-backend.vercel.app/login', { email, password });
            console.log('Login response:', response.data);
            const { token } = response.data;

            await AsyncStorage.setItem('token', token);  // Ensure token is saved to AsyncStorage
            alert('User LoggedIn!');

            // Clear the form before navigating
            setEmail('');
            setPassword('');
            await fetchUserDetails()
            // Now navigate to MainApp after token is saved
            navigation.navigate('MainApp');
        } catch (error) {
            console.error('Login error:', error); // Log the exact error
            alert('Error logging in user');
        }
    };



    return (
        <LinearGradient
            colors={['#69AEA9', '#3F8782']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, isLogin && styles.activeTab]}
                        onPress={() => setIsLogin(true)}
                    >
                        <Text style={[styles.tabText, isLogin && styles.activeTabText]}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, !isLogin && styles.activeTab]}
                        onPress={() => setIsLogin(false)}
                    >
                        <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.form}>
                    {!isLogin && (
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            placeholderTextColor="#A0A0A0"
                            value={name}
                            onChangeText={setName}
                        />
                    )}
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#A0A0A0"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#A0A0A0"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#FFFFFF',
    },
    tabText: {
        color: '#E0E0E0',
        fontSize: 16,
    },
    activeTabText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    form: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 20,
        borderRadius: 10,
    },
    input: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#2C6460',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
