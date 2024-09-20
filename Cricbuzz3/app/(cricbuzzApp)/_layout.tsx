import React from 'react';
import { Tabs } from 'expo-router/tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const AppLayout = () => {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: "#4B4949",
            tabBarStyle: {
                minHeight: 60,
                backgroundColor: "white",
                paddingBottom: 8,
            },
        }}>
            <Tabs.Screen
                name="home"
                options={{
                    headerShown: false,
                    title: "Home",
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="home" size={28} color="black" />
                        ) : (
                            <Ionicons name="home-outline" size={28} color="black" />
                        ),
                }}
            />
            <Tabs.Screen
                name="matches"
                options={{
                    headerShown: false,
                    title: "Matches",
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="menu" size={28} color="black" />
                        ) : (
                            <Ionicons name="menu-outline" size={28} color="black" />
                        ),
                }}
            />
            <Tabs.Screen
                name="videos"
                options={{
                    headerShown: false,
                    title: "Videos",
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="videocam" size={28} color="black" />
                        ) : (
                            <Ionicons name="videocam-outline" size={28} color="black" />
                        ),
                }}
            />
            <Tabs.Screen
                name="news"
                options={{
                    headerShown: false,
                    title: "News",
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="newspaper" size={28} color="black" />
                        ) : (
                            <Ionicons name="newspaper-outline" size={28} color="black" />
                        ),
                }}
            />
            <Tabs.Screen
                name="more"
                options={{
                    headerShown: false,
                    title: "More",
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <MaterialCommunityIcons name="dots-vertical-circle" size={28} color="black" />
                        ) : (
                            <MaterialCommunityIcons name="dots-vertical-circle-outline" size={28} color="black" />
                        ),
                }}
            />
        </Tabs>
    );
};

export default AppLayout;
