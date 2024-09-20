import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { getSharedProps } from '../../../lib/matchId';
import fetchPlayerDetails from '../../../functions/squadFunction'
import { GestureHandlerRootView } from 'react-native-gesture-handler';



const match = () => {
    const prop = getSharedProps();
    // console.log(prop, "Squade");
    // const [commentary, setCommentary] = useState([]);
    const [squadeLeft, setSquadeLeft] = useState([]);
    const [squadeRight, setSquadeRight] = useState([]);
    const [flag, setFlag] = useState([]);
    const [team, setTeam] = useState([]);

    useEffect(() => {
        const fetchCommentary = async () => {
            try {
                const data = await fetchPlayerDetails(prop);

                if (data) {
                    setSquadeLeft(data[0]);
                    setSquadeRight(data[1]);
                    setFlag(data[2]);
                    setTeam(data[3]);
                    // console.log("Right data ----- ", data[1]);
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
                <View style={{ height: 60, }}>
                    <View style={{ flex: 1.3, flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginLeft: 10, gap: 10 }}>
                            <Image
                                source={{ uri: flag[0] }}
                                style={{ width: 30, height: 20 }}
                            />
                            <Text>
                                {team[0]}
                            </Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginRight: 10, justifyContent: "flex-end", gap: 10 }}>
                            <Text>
                                {team[1]}
                            </Text>
                            <Image
                                source={{ uri: flag[1] }}
                                style={{ width: 30, height: 20 }}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.squade}>
                        {squadeLeft.map((item, index) => (
                            <View key={index} style={{ flexDirection: "row", backgroundColor: "white", padding: 4, margin: 1 }}>
                                <View style={styles.container}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{ width: 30, height: 30, borderRadius: 15, borderWidth: 0.3, borderColor: "black" }}
                                    />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 12 }}>{item.name.split(' ')[0][0].toUpperCase()} {item.name.split(' ')[1]} {item.name.split(' ')[2]}</Text>
                                    <Text style={{ color: "gray", fontSize: 8 }}>{item.role}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={styles.squade}>
                        {squadeRight.map((item, index) => (
                            <View key={index} style={{ flexDirection: "row", backgroundColor: "white", padding: 4, margin: 1 }}>
                                <View style={styles.container}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{ width: 30, height: 30, borderRadius: 15, borderWidth: 0.3, borderColor: "black" }}
                                    />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 12 }}>{item.name.split(' ')[0][0].toUpperCase()} {item.name.split(' ')[1]} {item.name.split(' ')[2]}</Text>
                                    <Text style={{ color: "gray", fontSize: 8 }}>{item.role}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </GestureHandlerRootView>
    );
}

export default match

const styles = StyleSheet.create({
    squade: { flex: 1 },
    container: { width: 30, height: 30, marginRight: 5, justifyContent: "center", alignItems: "center" }
})

