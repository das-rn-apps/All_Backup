import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { getSharedProps } from '../../../lib/matchId';
import scorecardFunction from '../../../functions/scorecardFunction';
import Scorecard from '../../../components/scorecard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



const match = () => {
    const prop = getSharedProps();
    // console.log(prop, "scorecard");

    const [status, setStatus] = useState("");

    useEffect(() => {
        const fetchCommentary = async () => {
            try {
                const data = await scorecardFunction(prop);
                if (data) {
                    setStatus(data[2]);
                } else {
                    console.error('Invalid or empty pom data:', data);
                }
            } catch (error) {
                console.error('Error fetching pom data info:', error);
            }
        };
        fetchCommentary();
    }, [prop]);


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView >
                <View style={{ height: 40, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "red" }}>
                        {status}
                    </Text>
                </View>
                <View >
                    <Scorecard />
                </View>
            </ScrollView>
        </GestureHandlerRootView>
    );
}

export default match

const styles = StyleSheet.create({
})

