import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Statistics from '../screens/Statistics';
import BottomNavBar from './BottomNavbar';
import Profile from '../screens/Profile';
import AddExpense from '../screens/AddExpense';




const Stack = createStackNavigator();
export default function CommonStackNavigator({ initialRoute }) {
    return (<>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
            <Stack.Screen name="Home" component={Home} />
             <Stack.Screen name="Statistics" component={Statistics} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="AddExpense" component={AddExpense} />
        </Stack.Navigator>
        <BottomNavBar />
    </>
    );
}