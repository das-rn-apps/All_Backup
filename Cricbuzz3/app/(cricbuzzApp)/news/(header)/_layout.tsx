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
                fontSize: 13,
                fontWeight: "bold"
            },
            tabBarScrollEnabled: true,

        }}>
        <MaterialTopTabs.Screen name='stories' options={{ title: "All Stories" }} />
        <MaterialTopTabs.Screen name='cricbuzzPlus' options={{ title: "Cricbuzz Plus" }} />
        <MaterialTopTabs.Screen name='categories' options={{ title: "Categories" }} />
        <MaterialTopTabs.Screen name='topics' options={{ title: "Topics" }} />
    </MaterialTopTabs>

}
export default layout;