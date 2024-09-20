import { ScrollView, StyleSheet, View, Text } from 'react-native';
import React, { useCallback, useMemo } from 'react';
// import Messages from '../../../../components/messages';

const MessageScreen = () => {
    const data = useMemo(
        () =>
            Array(100)
                .fill(0)
                .map((_, index) => `INDEX-${index + 1}`),
        []
    );

    const renderItem = useCallback(
        (index: any) => (
            <View key={index} style={{ width: 400, backgroundColor: 'white', padding: 10, marginTop: 10, alignItems: 'center', borderRadius: 5 }}>
                {/* <Messages index={index} /> */}
                <Text>
                    Helloooooooooo
                </Text>
            </View>
        ),
        []
    );

    return (
        <View style={styles.container}>
            <ScrollView>
                {data.map((item, index) => renderItem(index))}
            </ScrollView>
        </View>
    );
};

export default MessageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
