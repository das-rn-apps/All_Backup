import { ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getSharedProps } from '../lib/matchId';
import scorecardFunction from '../functions/scorecardFunction';

const Scorecard = () => {

    const prop = getSharedProps();

    // console.log("scorecard-------------", prop);
    const [score1, setScore1] = useState([]);
    const [score2, setScore2] = useState([]);
    const [team1, setTeam1] = useState([]);
    const [team2, setTeam2] = useState([]);

    useEffect(() => {
        const fetchCommentary = async () => {
            const data = await scorecardFunction(prop);
            if (data) {
                setScore1(data[0]);
                setScore2(data[1]);
                setTeam1(data[3]);
                setTeam2(data[4]);
            } else {
                console.error('Invalid or empty pom data:', data);
            }
        };
        fetchCommentary();
    }, [prop]);


    return (
        <ScrollView>
            <View style={{ marginBottom: 40 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                    <Text>
                        {team1[0]}
                    </Text>
                    <Text>
                        {team1[1]}
                    </Text>
                </View>
                <View>
                    <View style={{ flexDirection: "row", backgroundColor: "gray", padding: 4, marginHorizontal: 5, flex: 1 }}>
                        <View style={{ padding: 4, margin: 1, flex: 3 }} >
                            <Text style={{ fontSize: 10, fontWeight: "bold" }}>Player Name</Text>
                        </View>
                        <View style={{ padding: 4, margin: 1, flex: 1, marginLeft: 5 }} >
                            <Text style={{ fontSize: 10, fontWeight: "bold" }}>Runs</Text>
                        </View>
                        <View style={{ padding: 4, margin: 1, flex: 1 }} >
                            <Text style={{ fontSize: 10, fontWeight: "bold" }}>Balls</Text>
                        </View>
                        <View style={{ padding: 4, margin: 1, flex: 1 }} >
                            <Text style={{ fontSize: 10, fontWeight: "bold" }}>Fours</Text>
                        </View>
                        <View style={{ padding: 4, margin: 1, flex: 1 }} >
                            <Text style={{ fontSize: 10, fontWeight: "bold" }}>Sixes</Text>
                        </View>
                        <View style={{ padding: 4, margin: 1, flex: 1.8 }} >
                            <Text style={{ fontSize: 10, fontWeight: "bold" }}>StrikeRate</Text>
                        </View>
                    </View>
                </View>
                <View >
                    {score1.map((item, index) => (<View key={index} >
                        {
                            item.Dismissal ? (<View style={{ flexDirection: "row", backgroundColor: "white", padding: 4, marginHorizontal: 5, flex: 1 }}>
                                <View style={{ padding: 4, margin: 1, flex: 3 }} >
                                    <Text style={{ fontSize: 12 }}>{item.Player}</Text>
                                    <Text style={{ color: "gray", fontSize: 8 }}>{item.Dismissal}</Text>
                                </View>
                                <View style={{ padding: 4, margin: 1, flex: 1, marginLeft: 5 }} >
                                    <Text style={{ fontSize: 12 }}>{item.Runs}</Text>
                                </View>
                                <View style={{ padding: 4, margin: 1, flex: 1 }} >
                                    <Text style={{ fontSize: 12 }}>{item.Balls}</Text>
                                </View>
                                <View style={{ padding: 4, margin: 1, flex: 1 }} >
                                    <Text style={{ fontSize: 12 }}>{item.Fours}</Text>
                                </View>
                                <View style={{ padding: 4, margin: 1, flex: 1 }} >
                                    <Text style={{ fontSize: 12 }}>{item.Sixes}</Text>
                                </View>
                                <View style={{ padding: 4, margin: 1, flex: 1.8 }} >
                                    <Text style={{ fontSize: 12 }}>{item.StrikeRate}</Text>
                                </View>
                            </View>
                            ) : (
                                null
                            )
                        }

                    </View>
                    ))}
                </View>
                {/* {
                score2.length > 0 ? (
                    <View> */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, marginTop: 30 }}>
                    <Text>
                        {team2[0]}
                    </Text>
                    <Text>
                        {team2[1]}
                    </Text>
                </View>
                <View>
                    <View style={{ flexDirection: "row", backgroundColor: "gray", padding: 4, marginHorizontal: 5, flex: 1 }}>
                        <View style={{ padding: 4, margin: 1, flex: 3 }} >
                            <Text style={{ fontSize: 10, fontWeight: "bold" }}>Player Name</Text>
                        </View>
                        <View style={{ padding: 4, margin: 1, flex: 1, marginLeft: 5 }} >
                            <Text style={{ fontSize: 10, fontWeight: "bold" }}>Runs</Text>
                        </View>
                        <View style={{ padding: 4, margin: 1, flex: 1 }} >
                            <Text style={{ fontSize: 10, fontWeight: "bold" }}>Balls</Text>
                        </View>
                        <View style={{ padding: 4, margin: 1, flex: 1 }} >
                            <Text style={{ fontSize: 10, fontWeight: "bold" }}>Fours</Text>
                        </View>
                        <View style={{ padding: 4, margin: 1, flex: 1 }} >
                            <Text style={{ fontSize: 10, fontWeight: "bold" }}>Sixes</Text>
                        </View>
                        <View style={{ padding: 4, margin: 1, flex: 1.8 }} >
                            <Text style={{ fontSize: 10, fontWeight: "bold" }}>StrikeRate</Text>
                        </View>
                    </View>
                </View>
                <View >
                    {score2.map((item, index) => (
                        <View key={index} >
                            {
                                item.Dismissal ? (<View style={{ flexDirection: "row", backgroundColor: "white", padding: 4, marginHorizontal: 5, flex: 1 }}>
                                    <View style={{ padding: 4, margin: 1, flex: 3 }} >
                                        <Text style={{ fontSize: 12 }}>{item.Player}</Text>
                                        <Text style={{ color: "gray", fontSize: 8 }}>{item.Dismissal}</Text>
                                    </View>
                                    <View style={{ padding: 4, margin: 1, flex: 1, marginLeft: 5 }} >
                                        <Text style={{ fontSize: 12 }}>{item.Runs}</Text>
                                    </View>
                                    <View style={{ padding: 4, margin: 1, flex: 1 }} >
                                        <Text style={{ fontSize: 12 }}>{item.Balls}</Text>
                                    </View>
                                    <View style={{ padding: 4, margin: 1, flex: 1 }} >
                                        <Text style={{ fontSize: 12 }}>{item.Fours}</Text>
                                    </View>
                                    <View style={{ padding: 4, margin: 1, flex: 1 }} >
                                        <Text style={{ fontSize: 12 }}>{item.Sixes}</Text>
                                    </View>
                                    <View style={{ padding: 4, margin: 1, flex: 1.8 }} >
                                        <Text style={{ fontSize: 12 }}>{item.StrikeRate}</Text>
                                    </View>
                                </View>
                                ) : (
                                    null
                                )
                            }
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}

export default Scorecard;

