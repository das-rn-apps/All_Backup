import React from 'react';
import { View, Text, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import colors from '../../colors/ColorsCode.json';



const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <StatusBar style="auto" backgroundColor={colors.primary} />
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details', { name: "Deepak" })}
            />
        </View>
    );
};

export default HomeScreen;
