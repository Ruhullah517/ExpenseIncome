import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, TextInput, Modal, FlatList, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Ellipse9 from '../assets/Ellipse 9.svg';
import Ellipse8 from '../assets/Ellipse 8.svg';
import Ellipse7 from '../assets/Ellipse 7.svg';
import Calendar from 'react-native-calendars/src/calendar';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { UserContext } from '../components/context';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

export default function AddExpense() {
    const { currentUser } = useContext(UserContext);
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [amount, setAmount] = useState(''); // State to track the amount
    const [name, setName] = useState(''); // State to track the name
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState(null);

    // Function to handle image picking
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, // Allow editing
            aspect: [4, 3], // Aspect ratio
            quality: 1, // Image quality
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            // For edited images, result.assets[0].uri contains the image path
            setSelectedImage(result.assets[0].uri); // Set the selected image URI
        }
    };
    const onDateSelect = (day) => {
        setDate(new Date(day.dateString));
        setShowCalendar(false);
    };
    const addExpense = async () => {
        if (!name || !amount || !date || !selectedImage) {
            alert("Please fill in all fields and add an image.");
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('amount', amount);
        // Format the date to 'YYYY-MM-DD' string before appending
        const formattedDate = date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
        formData.append('date', formattedDate);
        formData.append('type', 'expense'); 
        formData.append('created_by', currentUser.userId);  
        // Get the file extension from the selected image URI
        const fileType = selectedImage.split('.').pop(); // Extracts the file extension (either jpg or png)
        // Set the MIME type dynamically based on the file type
        const mimeType = fileType === 'png' ? 'image/png' : 'image/jpeg';
        // Set the file name dynamically as well
        const fileName = `expense_image.${fileType}`;
        // Append the image file
        formData.append('image', {
            uri: Platform.OS === 'android' ? selectedImage : selectedImage.replace(/^file:\/\//, ''),
            name: fileName,
            type: mimeType,
        });
        console.log(formData);
        try {
            const response = await axios.post('http://192.168.137.1:3000/add-expense', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(formData);

            if (response.status === 200) {
                // Clear form fields after successful submission
                setName('');
                setAmount('');
                setDate(new Date());
                setSelectedImage(null);
                Alert.alert('Success', 'Expense added successfully!');
            } else {
                Alert.alert('Error', 'Failed to add expense');
            }
        } catch (error) {
            if (error.response) {
                // Server responded with a status code out of the range 2xx
                console.log('Error Response Data:', error.response.data);
                console.log('Error Response Status:', error.response.status);
                console.log('Error Response Headers:', error.response.headers);
            } else if (error.request) {
                // Request was made, but no response was received
                console.log('Error Request:', error.request);
            } else {
                // Something happened while setting up the request
                console.log('Error Message:', error.message);
            }
            console.log('Error Config:', error.config);
        }
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
                    <TouchableOpacity onPress={() => navigation.goBack()}>
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
                    <View style={styles.input}>

                        <TextInput
                            style={styles.inputText}
                            placeholder="XYZ"
                            value={name}
                            onChangeText={setName} />
                    </View>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>AMOUNT</Text>
                    <View style={styles.input}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="0.00"
                            keyboardType='numeric'
                            value={amount}
                            onChangeText={setAmount} />
                        <TouchableOpacity onPress={() => setAmount('')}>
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
                    <TouchableOpacity style={styles.addInvoice} onPress={pickImage}>
                        <View style={styles.addInvoiceContainer}>
                            <Ionicons name="add-circle" size={24} color="rgba(102, 102, 102, 1)" />
                            <Text style={styles.addInvoiceText}>Add Invoice</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* Display the selected image if there is one */}
                {selectedImage && (
                    <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                )}
                <View style={styles.btnContainer}>
                    <TouchableOpacity onPress={addExpense}>
                        <LinearGradient

                            colors={['#69AEA9', '#3F8782']} // Specify the start and end colors
                            start={{ x: 0.5, y: -0.17 }}    // Gradient direction (similar to 180deg)
                            end={{ x: 0.5, y: 1.23 }}
                            style={styles.button}      // Corresponding to the given gradient stops
                        >
                            <Text style={styles.buttonText}>Add expense</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>

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
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: windowWidth * 0.5,
        paddingVertical: 10,
        paddingHorizontal: 10,
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
    selectedImage: {
        width: 100,
        height: 100,
        marginTop: 10,
        borderRadius: 8,
    },
});