import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import ArrowIcon from '../assets/arrow-down 1.svg';
import UpIcon from '../assets/Icons/up.svg';
import { UserContext } from './context';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

export default function FinancialCard() {
    const { currentAccount } = useContext(UserContext);
    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loaded] = useFonts({
        InterSemiBold: require('../assets/fonts/Inter 24pt SemiBold.ttf'),
        InterBold: require('../assets/fonts/Inter 24pt Bold.ttf'),
        InterMedium: require('../assets/fonts/Inter 24pt Medium.ttf'),
    });

    const fetchExpenses = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://expense-income-backend.vercel.app/accounts/${currentAccount.id}/expenses`);
            const expensesData = response.data.map(expense => ({
                id: expense.id,
                name: expense.name,
                amount: parseFloat(expense.amount),
                date: new Date(expense.date),
                logo: expense.image_path ? `https://expense-income-backend.vercel.app${expense.image_path}` : null,
                type: expense.type,
            }));

            const mockIncomeData = [
                { id: 101, name: 'Salary', date: new Date('2023-01-01'), amount: 3000, type: 'income' },
                { id: 102, name: 'Freelancing', date: new Date('2023-05-10'), amount: 1200, type: 'income' },
                { id: 103, name: 'Dividends', date: new Date('2024-09-25'), amount: 500, type: 'income' },
                { id: 104, name: 'Profit', date: new Date('2024-10-23'), amount: 700, type: 'income' },
            ];

            const combinedData = [...expensesData, ...mockIncomeData];

            // Calculate total income and expense
            const totalIncome = combinedData
                .filter(item => item.type === 'income')
                .reduce((sum, item) => sum + item.amount, 0);

            const totalExpense = combinedData
                .filter(item => item.type === 'expense')
                .reduce((sum, item) => sum + item.amount, 0);

            setIncome(totalIncome);
            setExpenses(totalExpense);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentAccount) {
            fetchExpenses();
        }
    }, [currentAccount]);

    useFocusEffect(
        React.useCallback(() => {
            if (currentAccount) {
                fetchExpenses();
            }
        }, [currentAccount])
    );

    if (!loaded || loading) {
        return <ActivityIndicator size="large" color="#2F7E79" />;
    }

    const totalBalance = income - expenses;

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Total Balance</Text>
                    <UpIcon />
                </View>
                <TouchableOpacity>
                    <Ionicons name="ellipsis-horizontal" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <Text style={styles.balance}>${totalBalance.toFixed(2)}</Text>
            <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                    <View style={styles.labelContainer}>
                        <View style={styles.arrowIconContainer}>
                            <ArrowIcon />
                        </View>
                        <Text style={styles.detailLabel}>Income</Text>
                    </View>
                    <Text style={styles.detailAmount}>${income.toFixed(2)}</Text>
                </View>
                <View style={styles.detailItem}>
                    <View style={styles.labelContainer}>
                        <View style={styles.arrowIconContainer2}>
                            <ArrowIcon />
                        </View>
                        <Text style={styles.detailLabel}>Expenses</Text>
                    </View>
                    <Text style={styles.detailAmount}>${expenses.toFixed(2)}</Text>
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
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
