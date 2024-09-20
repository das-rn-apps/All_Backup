import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { FontAwesome6, FontAwesome5, Feather } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import BottomSheetInsta from '../../components/BottomSheetInsta';

const Homepage = () => {
    const bottomSheetModalRef = useRef(null);
    const snapPoints = ["25%", "50%", "60%", "75%", "90%"];
    const [data, setData] = useState("");

    function handlePresentModal(info: string) {
        setData(info);
        bottomSheetModalRef.current?.present();
    }

    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: "gray" }}>
            <BottomSheetModalProvider>
                <View style={{ flex: 1 }}>
                    <View style={{ marginTop: 470, gap: 20, padding: 20, alignItems: "flex-end" }}>
                        <TouchableOpacity style={styles.box} onPress={() => handlePresentModal("Liked")}>
                            <FontAwesome5 name="heart" size={35} color="black" />
                        </TouchableOpacity >
                        <TouchableOpacity style={styles.box} onPress={() => handlePresentModal("Comment section")}>
                            <FontAwesome6 name="comment" size={35} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box} onPress={() => handlePresentModal("Messages")}>
                            <Feather name="send" size={35} color="black" />
                        </TouchableOpacity>
                        <StatusBar style="auto" />
                        <BottomSheetModal
                            ref={bottomSheetModalRef}
                            index={2}
                            snapPoints={snapPoints}
                        // style={{ borderRadius: 10 }}
                        >
                            <BottomSheetInsta prop={{ data, setData }} />
                        </BottomSheetModal>
                    </View>
                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView >
    )
}

export default Homepage

const styles = StyleSheet.create({
    box: {
        width: 60,
        padding: 10,
        height: 60,
        alignItems: "center",
        justifyContent: "center"
    }
})