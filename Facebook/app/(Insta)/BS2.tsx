import { StyleSheet, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { Button } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Switching from '../../components/Switching'

const BS2 = () => {
    const bottomSheetModalRef = useRef(null);
    const snapPoints = ["50%"];
    const [dark, setDark] = useState(false);

    function handlePresentModal() {
        bottomSheetModalRef.current?.present();
    }
    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: "gray" }}>
            <BottomSheetModalProvider>
                <View style={{ flex: 1, justifyContent: 'center', width: "70%", alignSelf: "center", }}>
                    <Button
                        title={'Bottom sheet'}
                        onPress={handlePresentModal}
                    />
                    <StatusBar style="auto" />
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={0}
                        snapPoints={snapPoints}
                        style={{ borderRadius: 10 }}
                    >
                        <Switching prop={{ dark, setDark }} />
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView >
    )
}

export default BS2

const styles = StyleSheet.create({})