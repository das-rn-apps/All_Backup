import React from 'react';
import { View, Text } from 'react-native';

const DetailsScreen = ({ route }) => {
    const { name } = route.params;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Name: {name}</Text>
        </View>
    );
};

export default DetailsScreen;
