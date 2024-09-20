import {
    createMaterialTopTabNavigator, MaterialTopTabNavigationOptions, MaterialTopTabNavigationEventMap
} from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { TabNavigationState, ParamListBase } from '@react-navigation/native';


const { Navigator } = createMaterialTopTabNavigator();
export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

const layout = () => {
    return <MaterialTopTabs
        screenOptions={{
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "#C4C0C0",
            tabBarStyle: {
                backgroundColor: "#009170",
            },
            tabBarLabelStyle: {
                // textTransform: "capitalize",
                fontSize: 14,
                fontWeight: "bold"
            },

        }}>
        <MaterialTopTabs.Screen name='live' options={{ title: "Live" }} />
        <MaterialTopTabs.Screen name='upcoming' options={{ title: "Upcoming" }} />
        <MaterialTopTabs.Screen name='recent' options={{ title: "Recent" }} />
    </MaterialTopTabs>

}
export default layout;