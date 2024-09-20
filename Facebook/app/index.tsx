import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import colors from '../colors/ColorsCode.json';

const Stack = createStackNavigator();

function Index() {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={
            {
                headerShown: false,
                headerTintColor: "white",
                headerStyle: { backgroundColor: colors.primary },
                headerTitleAlign: "center",
                headerStatusBarHeight: 0,
            }
        }>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: true, title: "Details" }} />
        </Stack.Navigator>
    );
}

export default Index;
