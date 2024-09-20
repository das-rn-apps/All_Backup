import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { getSharedProps } from '../lib/matchId';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const Commentary = () => {
    const prop = getSharedProps();
    console.log(prop, "Live");
    const [commentary, setCommentary] = useState([]);
    const [POM, setPOM] = useState("");

    useEffect(() => {
        console.log('useEffect is running');
        const fetchCommentary = async () => {
            try {
                const response = await fetch(`https://www.cricbuzz.com/api/cricket-match/commentary/${prop}`);
                const data = await response.json();

                if (data.commentaryList && data.commentaryList.length > 0) {
                    const firstCommentary = data.commentaryList;
                    setCommentary(firstCommentary);
                } else {
                    console.error('Invalid or empty commentary data:', data);
                }
                if (data.matchHeader) {
                    const matchHeader = data.matchHeader;
                    let fullName = null;
                    if (matchHeader.playersOfTheMatch[0]) {
                        fullName = matchHeader.playersOfTheMatch[0].fullName;
                    }
                    setPOM(fullName);
                } else {
                    console.error('Invalid or empty pom data:', data);
                }
            } catch (error) {
                console.error('Error fetching pom data:', error);
            }
        };

        fetchCommentary();
    }, [prop]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

            <ScrollView>
                <View style={{ flex: 1, justifyContent: "center", padding: 10, gap: 10 }}>
                    {POM ? (
                        <Text style={{ fontWeight: "bold", fontSize: 15, color: "#6495ED", textAlign: "center", paddingVertical: 5 }}>Player of the Match is - {POM}</Text>
                    ) : (
                        null
                    )}
                    {commentary.map((item, index) => (
                        <View key={index}>
                            <Text style={{ fontSize: 10, fontWeight: "500", color: "gray" }}>{new Date(parseInt(item.timestamp)).toLocaleString()}</Text>
                            {item.commText.includes("B0$") ? (
                                <Text>{item.commText.replace("B0$", item.commentaryFormats.bold.formatValue)} </Text>
                            ) : (
                                <Text>{item.commText}</Text>
                            )
                            }
                        </View>
                    ))}
                </View>
            </ScrollView>
        </GestureHandlerRootView>

    );
}

export default Commentary

const styles = StyleSheet.create({})

