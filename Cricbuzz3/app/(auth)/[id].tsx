import { Pressable, StyleSheet, Text, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router';



const match = () => {
    const prop = useLocalSearchParams();

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 10 }}>
            <View style={{ backgroundColor: "green", padding: 20, borderRadius: 10, paddingVertical: 40, width: 330 }}>
                <Text style={{ fontSize: 35, textAlign: "center", fontWeight: "bold", color: "white" }}>
                    Welcome
                </Text>
                <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
                    {prop.id}
                </Text>
            </View>
            {/* <Pressable onPress={() => router.push("/(cricbuzzApp)/home/(header)/featured")}> */}
            <Pressable onPress={() => router.push("/(auth)/details")}>
                <Text>
                    Go to home page
                </Text>
            </Pressable>
        </View>
    );
}

export default match;

