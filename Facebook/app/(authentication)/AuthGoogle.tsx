import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { Redirect, router } from 'expo-router';
import { View, Text } from 'react-native';
import { supabase } from '../../lib/supabase';
// import Account from './Account';
import Acc from '../Acc';


const AuthGoogle = () => {

    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        webClientId: "308007803800-ku1r07pvo8j33js4iijotn7li62r2v4n.apps.googleusercontent.com"
    });
    return (
        <View>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={async () => {
                    try {
                        await GoogleSignin.hasPlayServices();
                        const userInfo = await GoogleSignin.signIn();
                        if (userInfo.idToken) {
                            const { data, error } = await supabase.auth.signInWithIdToken({ provider: "google", token: userInfo.idToken })
                            console.log(error, data);
                            router.push("Acc")
                        }
                        else {
                            throw new Error("Tocken not generated")
                        }
                        console.log("Userinfo-------", JSON.stringify(userInfo, null, 2))
                    } catch (error: any) {
                        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                            console.log("// user cancelled the login flow")
                        } else if (error.code === statusCodes.IN_PROGRESS) {
                            console.log("// operation (e.g. sign in) is in progress already")

                        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                            console.log("play services not available or outdated")
                        } else {
                            console.log("// some other error happened")
                        }
                    }
                }}
            />
        </View>
    )
}

export default AuthGoogle;
