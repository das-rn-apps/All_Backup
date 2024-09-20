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
                fontWeight: "bold"
            },
            tabBarScrollEnabled: true,
            tabBarShowLabel: true,
        }}>

        <MaterialTopTabs.Screen name='[live]' options={{ title: "Live" }} />
        <MaterialTopTabs.Screen name='info' options={{ title: "Info" }} />
        <MaterialTopTabs.Screen name='scorecard' options={{ title: "Scorecard" }} />
        <MaterialTopTabs.Screen name='squads' options={{ title: "Squads" }} />
        <MaterialTopTabs.Screen name='overs' options={{ title: "Overs" }} />
    </MaterialTopTabs>

}
export default layout;