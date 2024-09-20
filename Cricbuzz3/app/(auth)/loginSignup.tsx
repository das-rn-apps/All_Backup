// import React, { useState } from 'react';
// import { Alert, StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Pressable } from 'react-native';
// import { useForm, Controller, SubmitErrorHandler, FieldValues } from 'react-hook-form';
// import Constants from 'expo-constants';
// import { supabase } from '../../components/supabase';
// import { router } from 'expo-router';


// type FormData = {
//     email: string;
//     password: string;
//     phone: number;
//     username: string;
//     gender: string;
// };

// export default function Auth() {

//     const [emailError, setEmailError] = useState("");
//     const [passwordError, setPasswordError] = useState("");
//     const [login, setLogin] = useState("login");
//     const [loading, setLoading] = useState(false)


//     const { control, handleSubmit, reset, watch } = useForm<FormData>();

//     const watchFormData = watch();

//     const onSubmit = (data: FormData) => {
//         console.log(data);
//         setEmailError("");
//         setPasswordError("");
//     };

//     const onError: SubmitErrorHandler<FormData> = (errors, e) => {
//         console.log(errors);
//     };

//     const signInWithEmail = async () => {
//         setLoading(true)
//         try {
//             const { email, password } = watchFormData;
//             if (!email || !password) {
//                 Alert.alert("INVALID FORM", "Fill all required fields");
//                 return console.log("error");
//             }
//             const { error } = await supabase.auth.signInWithPassword({
//                 email,
//                 password,
//             });
//             if (error) {
//                 Alert.alert(error.message, "Try again");
//             } else {
//                 console.log(email, " Got signed in just now at ---------------" + new Date());
//                 router.push(`/(auth)/${email}`);
//             }
//         } catch (error) {
//             console.error("Error during sign-in:", error);
//         }
//         setLoading(false)
//     };

//     const signUpWithEmail = async () => {
//         setLoading(true)
//         try {
//             const { email, password } = watchFormData;
//             console.log(watchFormData)
//             if (!email || !password) {
//                 Alert.alert("No");
//                 return;
//             }

//             const { data, error } = await supabase.auth.signUp({
//                 email,
//                 password,
//             });

//             if (error) {
//                 Alert.alert(error.message);
//             } else {
//                 Alert.alert('Please check your inbox for email verification!');
//                 console.log(email, "just got registered at -------------" + new Date());
//             }
//         } catch (error) {
//             console.error("Error during sign-up:", error);
//         }
//         setLoading(false)
//     };

//     return (
//         <ScrollView style={styles.container}>
//             <View >
//                 <Text style={styles.label}>Email</Text>
//                 <Controller
//                     control={control}
//                     render={({ field: { onChange, onBlur, value } }) => (
//                         <>
//                             <TextInput
//                                 style={styles.input}
//                                 onBlur={onBlur}
//                                 onChangeText={(value) => {
//                                     onChange(value);
//                                     setEmailError(value ? "" : "Email is required");
//                                 }}
//                                 value={value}
//                                 placeholder="Enter email"
//                                 keyboardType="email-address"

//                             />
//                             {emailError && <Text style={styles.errorMessage}>{emailError}</Text>}
//                         </>
//                     )}
//                     name="email"
//                     rules={{
//                         required: 'Email is required',
//                         pattern: {
//                             value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                             message: 'Invalid email address',
//                         },
//                     }}
//                 />

//                 <Text style={styles.label}>Password</Text>
//                 <Controller
//                     control={control}
//                     render={({ field: { onChange, onBlur, value } }) => (
//                         <>
//                             <TextInput
//                                 style={styles.input}
//                                 onBlur={onBlur}
//                                 onChangeText={(value) => {
//                                     onChange(value);
//                                     setPasswordError(value ? "" : "Password is required");
//                                 }}
//                                 value={value}
//                                 secureTextEntry={true}
//                                 placeholder="Enter password"
//                             />
//                             {passwordError && <Text style={styles.errorMessage}>{passwordError}</Text>}
//                         </>
//                     )}
//                     name="password"
//                     rules={{ required: 'Password is required' }}
//                 />
//                 {
//                     login ? (
//                         <View>
//                             <TouchableOpacity
//                                 style={[styles.button, { alignItems: "center", justifyContent: "center", marginBottom: 30 }]}
//                                 onPress={signInWithEmail} disabled={loading}
//                             >
//                                 <Text style={styles.btntxt}>LogIn</Text>
//                             </TouchableOpacity>
//                             <Pressable onPress={() => { setLogin(null) }}>
//                                 <Text style={styles.btntxt}> Don't have account? SignUp.</Text>
//                             </Pressable>
//                         </View>

//                     ) : (
//                         <View>
//                             <Text style={styles.label}>Phone</Text>
//                             <Controller
//                                 control={control}
//                                 render={({ field: { onChange, onBlur, value } }) => (
//                                     <>
//                                         <TextInput
//                                             style={styles.input}
//                                             onBlur={onBlur}
//                                             onChangeText={(value) => {
//                                                 onChange(value);
//                                                 // setPasswordError(value ? "" : "Username is required");
//                                             }}
//                                             value={value ? value.toString() : ''}// Convert the value to a string
//                                             keyboardType="numeric"
//                                             placeholder="Enter mobile number"
//                                         />
//                                         {/* {passwordError && <Text style={styles.errorMessage}>{passwordError}</Text>} */}
//                                     </>
//                                 )}
//                                 name="phone"
//                                 rules={{ required: 'Phone is required' }}
//                             />
//                             <Text style={styles.label}>Username</Text>
//                             <Controller
//                                 control={control}
//                                 render={({ field: { onChange, onBlur, value } }) => (
//                                     <>
//                                         <TextInput
//                                             style={styles.input}
//                                             onBlur={onBlur}
//                                             onChangeText={(value) => {
//                                                 onChange(value);
//                                                 // setPasswordError(value ? "" : "Username is required");
//                                             }}
//                                             value={value}
//                                             placeholder="Enter username"
//                                         />
//                                         {/* {passwordError && <Text style={styles.errorMessage}>{passwordError}</Text>} */}
//                                     </>
//                                 )}
//                                 name="username"
//                                 rules={{ required: 'Username is required' }}
//                             />
//                             <TouchableOpacity
//                                 style={[styles.button, { alignItems: "center", justifyContent: "center", marginBottom: 30 }]}
//                                 onPress={signUpWithEmail} disabled={loading}
//                             >
//                                 <Text style={styles.btntxt}>SignUp</Text>
//                             </TouchableOpacity>
//                             <Pressable onPress={() => { setLogin("login") }}>
//                                 <Text style={styles.btntxt} > Already have account? Login.</Text>
//                             </Pressable>
//                         </View>
//                     )
//                 }
//                 {/* {watchFormData && <Text style={styles.errorMessage}>{watchFormData.email}</Text>}
//                 {watchFormData && <Text style={styles.errorMessage}>{watchFormData.password}</Text>} */}
//             </View>
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     label: {
//         // fontWeight: "bold",
//         marginTop: 20,
//         color: "white"
//     },
//     button: {
//         marginTop: 40,
//         height: 40,
//         backgroundColor: 'blue',
//         borderRadius: 4,
//     },
//     btntxt: {
//         color: "white",
//         textAlign: "center"
//     },
//     container: {
//         flex: 1,
//         paddingTop: Constants.statusBarHeight,
//         padding: 30,
//         backgroundColor: "black",
//     },
//     input: {
//         backgroundColor: 'white',
//         height: 40,
//         padding: 10,
//         borderRadius: 4,
//         marginBottom: 10,
//     },
//     errorMessage: {
//         color: 'red',
//         // marginBottom: 10,
//     },
// });
