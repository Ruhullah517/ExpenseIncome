import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Ellipse9 from '../assets/Ellipse 9.svg';
import Ellipse8 from '../assets/Ellipse 8.svg';
import Ellipse7 from '../assets/Ellipse 7.svg';
import NotifyIcon from '../assets/Icons/NotifyIcon.svg';
import HalfCircle from '../assets/Icons/Halfcircle.svg';
import { useFonts } from 'expo-font';
import GlossyIcon from '../assets/diamond.png';
import UserFillIcon from '../assets/Icons/UserFillIcon.svg';
import DualUser from '../assets/Icons/DualUserIcon.svg';
import MessageIcon from '../assets/Icons/messageIcon.svg';
import LockIcon from '../assets/Icons/LockIcon.svg';
import SecureIcon from '../assets/Icons/SecureIcon.svg';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const menuData = [
    {
        title: "Invite Friends",

    },
    {
        title: "Account info",
        icon: "UserFillIcon"
    },
    {
        title: "Personal profile",
        icon: "DualUser"
    },
    {
        title: "Message center",
        icon: "MessageIcon"
    },
    {
        title: "Login and security",
        icon: "LockIcon"
    },
    {
        title: "Data and privacy",
        icon: "SecureIcon"
    }
]

const MenuItem = ({ icon, title }) => (
    <TouchableOpacity style={title === "Invite Friends" ? styles.menuItem1 : styles.menuItem}>
        {title === "Invite Friends" ? (
            <View style={styles.iconBack1}><Image source={GlossyIcon} style={styles.glossyIcon} /></View>
        ) : icon === "UserFillIcon" ? (
            <View style={styles.iconBack}><UserFillIcon width={25} height={25} /></View>
        ) : icon === "DualUser" ? (
            <View style={styles.iconBack}><DualUser width={25} height={25} /></View>
        ) : icon === "MessageIcon" ? (
            <View style={styles.iconBack}><MessageIcon width={24} height={24} /></View>
        ) : icon === "LockIcon" ? (
            <View style={styles.iconBack}><LockIcon width={24} height={24} /></View>
        ) : icon === "SecureIcon" ? (
            <View style={styles.iconBack}><SecureIcon width={24} height={24} /></View>
        ) : null}
        <Text style={styles.menuItemText}>{title}</Text>
    </TouchableOpacity>
);

const Profile = () => {
    const [loaded] = useFonts({
        InterMedium: require('../assets/fonts/Inter 24pt Medium.ttf'),
        InterSemiBold: require('../assets/fonts/Inter 24pt SemiBold.ttf'),
    });


    if (!loaded) {
        return null;
    }
    return (
        <ScrollView>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
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
                            <Ionicons name="chevron-back" size={22} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Profile</Text>
                        <View style={styles.iconContainer}>
                            <NotifyIcon />
                            <HalfCircle />
                            <View style={styles.notificationDot} />
                        </View>
                    </View>
                    <View style={styles.profileSection}>
                        <Image
                            source={{ uri: 'https://s3-alpha-sig.figma.com/img/d3d4/59c6/e858e6f489611c178f7e9a05bd359837?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SlHOO8ijiH2cGg3fHEw0kNY50tEnwuxA7JzV9xSGPDDglpcMuISg1Tv6ZR2~2Tt3h52tzhluIDdAelGjrv67Mge2JQBAnmt~WpkITYawWC1HAzaBYmF8tS8zrRZiH5ZfUTrEpCRAgz1tsQ5mL-jNFL3I352Tuu8NjhqxD6HhFnKfuU-VlEGf8y7Ipqh3Uhp0NJUzyw2kkOKBnvXQuLUFQiawLgclgsFjxt8zYyoc3v2yUC8~YcC~UpIEyqRFnot1l~ln2RL~Lz6rePvleXXduSFQw0ANKBzsV8cZ4w19xIA6ZhP8dre33~d5wBX1fr2Ywfe10ExLT4GIkf4t-jG4bw__' }}
                            style={styles.profileImage}
                        />

                    </View>
                </LinearGradient>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>Enjelin Morgeana</Text>
                    <Text style={styles.username}>@enjelin_morgeana</Text>
                </View>
                <View style={styles.menuSection}>
                    {menuData.map((item, index) => (
                        <MenuItem key={index} title={item.title} icon={item.icon} />
                    ))}
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
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
        paddingTop: "10%",
    },
    headerTitle: {
        color: 'white',
        fontSize: 18,
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
    profileSection: {
        alignItems: 'center',
        // paddingVertical: 20,
        // backgroundColor: '#2D8D8D',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        position: "relative",
        top: "40%"
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontFamily: 'InterSemiBold',
        color: 'rgba(34, 34, 34, 1)',
    },
    username: {
        fontSize: 14,
        color: 'rgba(67, 136, 131, 1)',
        fontFamily: 'InterSemiBold',
    },
    menuSection: {
        paddingTop: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    menuItem1: {
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    iconBack1: {
        backgroundColor: 'rgba(240, 246, 245, 1)',
        padding: 15,
        borderRadius: 40,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBack: {
        // backgroundColor: 'rgba(240, 246, 245, 1)',
        padding: 15,
        borderRadius: 40,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuItemText: {
        marginLeft: 20,
        fontSize: 16,
        color: 'rgba(0, 0, 0, 1)',
        fontFamily: 'InterMedium',
    },
    nameContainer: {
        position: 'relative',
        top: '7%',
        alignItems: 'center',
        marginBottom: 40,
    },
    glossyIcon: {
        width: 30,
        height: 30,
    }
});
export default Profile;
