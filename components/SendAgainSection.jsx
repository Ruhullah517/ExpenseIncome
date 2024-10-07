import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');


const profiles = [
    { id: '1', image: require('../assets/image 8.png') },
    { id: '2', image: require('../assets/image 8.png') },
    { id: '3', image: require('../assets/image 8.png') },
    { id: '4', image: require('../assets/image 8.png') },
    { id: '5', image: require('../assets/image 8.png') },
];

const ProfileItem = ({ image }) => (
    <Image source={image} style={styles.profileImage} />
);

export default function SendAgainSection() {
    const [loaded] = useFonts({
        InterSemiBold: require('../assets/fonts/Inter 24pt SemiBold.ttf'),
        InterBold: require('../assets/fonts/Inter 24pt Bold.ttf'),
        InterRegular: require('../assets/fonts/Inter 24pt Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Send Again</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={profiles}
                renderItem={({ item }) => <ProfileItem image={item.image} />}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.profileList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: "3%",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: "7%",
    },
    title: {
        fontSize: 18,
        fontFamily: 'InterSemiBold',
    },
    seeAll: {
        color: '#666666',
        fontFamily: 'InterRegular',
        fontSize: 14,
    },
    profileList: {
        paddingHorizontal: "6%",
        paddingVertical: "5%",
        flexDirection: 'row',
        columnGap: 7,
    },
    profileImage: {
        width: windowWidth * 0.16,
        height: windowHeight * 0.08,
        borderRadius: 30,
    },
});
