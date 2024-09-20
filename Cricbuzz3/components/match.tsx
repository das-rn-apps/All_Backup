import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Pressable } from 'react-native';



const Match = () => {
    const [teamScores, setTeamScores] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://m.cricbuzz.com/api/home');
                const data = await response.json();

                if (data.matches && Array.isArray(data.matches)) {
                    const extractedScores = data.matches.map((match: { match: { matchScore: { team1Score: { inngs1: { runs: any; wickets: any; overs: any; }; }; team2Score: { inngs1: { runs: any; wickets: any; overs: any; }; }; }; matchInfo: { team1: { teamName: any; teamSName: any; imageId: any; }; team2: { teamName: any; teamSName: any; imageId: any; }; status: any; seriesName: any; matchId: any; startDate: string; }; }; }) => {
                        // console.log("1", match.match.matchInfo.seriesName);z

                        let team1Score = null;
                        let team2Score = null;
                        let team1Wkt = null;
                        let team2Wkt = null;
                        let team1Over = null;
                        let team2Over = null;
                        if (
                            match.match.matchScore && match.match.matchScore.team1Score && match.match.matchScore.team1Score.inngs1
                        ) {
                            team1Score = match.match.matchScore.team1Score.inngs1.runs;
                            team1Wkt = match.match.matchScore.team1Score.inngs1.wickets;
                            team1Over = match.match.matchScore.team1Score.inngs1.overs;
                            // console.log("2", match.match.matchScore.team1Score.inngs1.runs, match.match.matchInfo.team1.teamName);
                        }
                        else {
                            // console.log("rejected");
                        }

                        if (
                            match.match.matchScore && match.match.matchScore.team2Score && match.match.matchScore.team2Score.inngs1
                        ) {
                            team2Score = match.match.matchScore.team2Score.inngs1.runs;
                            team2Wkt = match.match.matchScore.team2Score.inngs1.wickets;
                            team2Over = match.match.matchScore.team2Score.inngs1.overs;
                            // console.log("3", match.match.matchScore.team2Score.inngs1.runs, match.match.matchInfo.team2.teamName);
                        } else {
                            // console.log("rejected");
                        }

                        const team1Name = match.match.matchInfo.team1.teamName;
                        const team2Name = match.match.matchInfo.team2.teamName;

                        const team1SName = match.match.matchInfo.team1.teamSName;
                        const team2SName = match.match.matchInfo.team2.teamSName;


                        const team1Id = match.match.matchInfo.team1.imageId;
                        const team2Id = match.match.matchInfo.team2.imageId;


                        const status = match.match.matchInfo.status;
                        const seriesName = match.match.matchInfo.seriesName;
                        const matchId = match.match.matchInfo.matchId;
                        // console.log("4", match.match.matchInfo.status);


                        const startDate = new Date(parseInt(match.match.matchInfo.startDate)).toLocaleString('en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        });
                        return {
                            team1: { name: team1Name, score: team1Score, wkt: team1Wkt, ovr: team1Over, SName: team1SName, imgId: team1Id },
                            team2: { name: team2Name, score: team2Score, wkt: team2Wkt, ovr: team2Over, SName: team2SName, imgId: team2Id },
                            status: status,
                            seriesName: seriesName,
                            startDate: startDate,
                            matchId: matchId,
                        };
                    });

                    setTeamScores(extractedScores.filter(Boolean));
                } else {
                    console.error('Invalid data format:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    return (
        <View>
            <ScrollView>
                {teamScores.map((score, index) => (
                    <View key={index} style={{ padding: 5 }}>
                        <Pressable style={{
                            height: 150,
                            backgroundColor: "white",
                            borderRadius: 15,
                            // borderWidth: 1,
                            borderColor: "gray",
                            justifyContent: "center",
                            paddingHorizontal: 10
                        }}
                            onPress={() => {
                                // console.log("Pressed1");
                                router.push(`/singleMatch/(home)/${score.matchId}`)
                            }}
                        >
                            <View style={{ borderRadius: 5 }}>
                                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                    <View style={{ justifyContent: "center" }} >
                                        <Text style={{ fontWeight: "400", fontSize: 11 }}>{score.startDate}</Text>
                                    </View>
                                    <View style={{ justifyContent: "center" }} >
                                        <Text style={{ fontWeight: "400", color: "gray", fontSize: 12 }}>  {score.seriesName}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                    <View style={{ width: 35, marginRight: 5, justifyContent: "center" }}>
                                        <Image
                                            source={{ uri: `https://static.cricbuzz.com/a/img/v1/25x18/i1/c${score.team1.imgId}/${score.team1.name}.jpg` }}
                                            style={{ width: 25, height: 18 }}
                                        />
                                    </View>
                                    <View style={{ width: 160, }}>
                                        <Text style={styles.team}>{score.team1.SName}</Text>
                                    </View>
                                    {score.team1.score ? (
                                        <View>
                                            <Text style={styles.team}>{score.team1.score}-{score.team1.wkt} ({score.team1.ovr})</Text>
                                        </View>
                                    ) : (
                                        null
                                    )}

                                </View>
                                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                    <View style={{ width: 35, marginRight: 5, justifyContent: "center" }}>
                                        <Image
                                            source={{ uri: `https://static.cricbuzz.com/a/img/v1/25x18/i1/c${score.team2.imgId}/${score.team2.name}.jpg` }}
                                            style={{ width: 25, height: 18 }}
                                        />
                                    </View>
                                    <View style={{ width: 160 }}>
                                        <Text style={styles.team}>{score.team2.SName}</Text>
                                    </View>
                                    {score.team2.score ? (
                                        <View>
                                            <Text style={styles.team}>{score.team2.score}-{score.team2.wkt} ({score.team2.ovr})</Text>
                                        </View>
                                    ) : (
                                        null
                                    )}
                                </View>
                                <View>
                                    <Text style={{ fontSize: 13, color: "#2684FF", fontWeight: "500" }}>{score.status}</Text>
                                </View>
                            </View>
                        </Pressable >
                    </View>
                ))
                }
            </ScrollView >
        </View >
    );
};
export default Match;

const styles = StyleSheet.create({
    pagerView: {
        flex: 1,
        backgroundColor: 'red',
    },
    container: {
        flex: 1,
    },
    match: {
        height: 200,
        width: '100%',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "gray",
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
    },
    team: {
        fontSize: 15,
    },
    grad: {
        flex: 1,
        elevation: 5,
    }
});