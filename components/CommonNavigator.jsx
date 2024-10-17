import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Statistics from '../screens/Statistics';
import BottomNavBar from './BottomNavbar';
import Profile from '../screens/Profile';
import AddExpense from '../screens/AddExpense';
import AuthScreen from '../screens/authScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

export default function CommonStackNavigator({ initialRoute }) {
    const navigation = useNavigation();
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <BottomNavBar {...props} state={props.navigation.getState()} />} >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Statistics" component={Statistics} />
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="AddExpense" component={AddExpense} />
            {/* <Tab.Screen name="AuthScreen" component={AuthScreen} /> */}
        </Tab.Navigator >
    );
};
