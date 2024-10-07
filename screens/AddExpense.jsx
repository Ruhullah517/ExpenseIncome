import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, TextInput, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Ellipse9 from '../assets/Ellipse 9.svg';
import Ellipse8 from '../assets/Ellipse 8.svg';
import Ellipse7 from '../assets/Ellipse 7.svg';
import Calendar from 'react-native-calendars/src/calendar';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

export default function AddExpense() {
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedItem, setSelectedItem] = useState({ name: 'Netflix', logo: require('../assets/netflix.png') });
    const [showDropdown, setShowDropdown] = useState(false);

    const dropdownItems = [
        { name: 'Netflix', logo: require('../assets/netflix.png') },
        { name: 'Spotify', logo: require('../assets/netflix.png') },
        { name: 'Amazon', logo: require('../assets/netflix.png') },
        // Add more items as needed
    ];

    const renderDropdownItem = ({ item }) => (
        <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
                setSelectedItem(item);
                setShowDropdown(false);
            }}
        >
            <View style={styles.logoContainer}>
                <Image source={item.logo} style={styles.logo} />
            </View>
            <Text style={styles.dropdownItemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const onDateSelect = (day) => {
        setDate(new Date(day.dateString));
        setShowCalendar(false);
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(66,150,144,1)', 'rgba(42,124,118,1)']}
                start={{ x: 0.3, y: 0 }}
                end={{ x: 0.9, y: 1 }}
                style={styles.gradient}
            >
                {/* Positioned SVGs for decorative ellipses */}
                <Ellipse9 style={styles.ellipse9} />
                <Ellipse8 style={styles.ellipse8} />
                <Ellipse7 style={styles.ellipse7} />
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Ionicons name="chevron-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Add Expense</Text>
                    <TouchableOpacity>
                        <Ionicons name="ellipsis-horizontal" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <View style={styles.card}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>NAME</Text>
                    <TouchableOpacity style={styles.input} onPress={() => setShowDropdown(true)}>
                        <View style={styles.logoContainer}>
                            <Image source={selectedItem.logo} style={styles.logo} />
                        </View>
                        <Text style={styles.inputText}>{selectedItem.name}</Text>
                        <Ionicons name="chevron-down" size={20} color="#ccc" />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>AMOUNT</Text>
                    <View style={styles.input}>
                        <TextInput style={styles.inputText} placeholder="$ 48.00" />
                        <TouchableOpacity>
                            <Text style={styles.clearButton}>Clear</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>DATE</Text>
                    <TouchableOpacity style={styles.input} onPress={() => setShowCalendar(true)}>
                        <Text style={styles.inputText}>{date.toDateString()}</Text>
                        <Ionicons name="calendar-outline" size={24} color="#ccc" />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>INVOICE</Text>
                    <TouchableOpacity style={styles.addInvoice}>
                        <View style={styles.addInvoiceContainer}>
                            <Ionicons name="add-circle" size={24} color="rgba(102, 102, 102, 1)" />
                            <Text style={styles.addInvoiceText}>Add Invoice</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                visible={showDropdown}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowDropdown(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowDropdown(false)}
                >
                    <View style={styles.dropdownList}>
                        <FlatList
                            data={dropdownItems}
                            renderItem={renderDropdownItem}
                            keyExtractor={(item) => item.name}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
            {/* Calendar Modal */}
            <Modal
                visible={showCalendar}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowCalendar(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowCalendar(false)}
                >
                    <View style={styles.calendarContainer}>
                        <Calendar
                            onDayPress={onDateSelect}
                            markedDates={{
                                [date.toISOString().split('T')[0]]: { selected: true, selectedColor: '#2ecc71' }
                            }}
                            theme={{
                                backgroundColor: '#ffffff',
                                calendarBackground: '#ffffff',
                                textSectionTitleColor: '#b6c1cd',
                                selectedDayBackgroundColor: '#2ecc71',
                                selectedDayTextColor: '#ffffff',
                                todayTextColor: '#2ecc71',
                                dayTextColor: '#2d4150',
                                textDisabledColor: '#d9e1e8',
                                dotColor: '#00adf5',
                                selectedDotColor: '#ffffff',
                                arrowColor: '#2ecc71',
                                monthTextColor: '#2d4150',
                                indicatorColor: '#2ecc71',
                                textDayFontWeight: '300',
                                textMonthFontWeight: 'bold',
                                textDayHeaderFontWeight: '300',
                                textDayFontSize: 16,
                                textMonthFontSize: 16,
                                textDayHeaderFontSize: 16
                            }}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    gradient: {
        height: windowHeight * 0.33, // Adjust height to 30% of window height for responsiveness
        position: 'relative',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    // Responsive SVG positioning with percentage-based top and left values
    ellipse9: {
        position: 'absolute',
        top: '-5%',
        left: '35%',
    },
    ellipse8: {
        position: 'absolute',
        top: '-5%',
        left: '10%',
    },
    ellipse7: {
        position: 'absolute',
        top: '-5%',
        left: '-5%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 15,
        // backgroundColor: '#2D8D8D',
        paddingTop: "15%",
    },
    headerTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 16,
        paddingHorizontal: 16,
        position: 'relative',
        top: '-20%',
        paddingVertical: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6.84,
        elevation: 6, // for Android
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 12,
        color: 'rgba(102, 102, 102, 1)',
        marginBottom: 4,
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#eee',
        padding: 10,
        borderRadius: 8,
    },
    inputText: {
        fontSize: 16,
        flex: 1,
        color: 'rgba(102, 102, 102, 1)',
    },
    logoContainer: {
        width: 34,
        height: 34,
        backgroundColor: 'black',
        // padding: 5,
        marginRight: 8,

        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 8, // for Android
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 34,
        height: 34,
        // marginRight: 8,
        // backgroundColor: 'black',
        padding: 5,
        borderRadius: 5,
        // Add shadow properties
       
    },
    clearButton: {
        color: '#2ecc71',
    },
    addInvoice: {
        alignItems: 'center',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: 'rgba(221, 221, 221, 1)',
        borderRadius: 8,
        padding: 12,
    },
    addInvoiceText: {
        marginLeft: 8,
        color: 'rgba(102, 102, 102, 1)',
    },
    addInvoiceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dropdownList: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        width: '80%',
        maxHeight: 300,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    dropdownItemText: {
        fontSize: 16,
        marginLeft: 10,
    },
    calendarContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        width: '90%',
        maxHeight: 400,
    },
});