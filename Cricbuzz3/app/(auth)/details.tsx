// import * as React from 'react';
// import { Text, View, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
// import { useForm, Controller, SubmitErrorHandler } from 'react-hook-form';
// import Constants from 'expo-constants';
// import { useState } from 'react';
// import { router } from 'expo-router';
// import { Alert } from 'react-native';


// type FormData = {
//     email: string;
//     password: string;
//     firstName: string;
//     lastName: string;
//     mobileNumber: number;
//     title: string;
//     developer: string;
// };

// export default function App() {
//     const [emailError, setEmailError] = useState("");
//     const [passwordError, setPasswordError] = useState("");
//     const [firstNameError, setFirstNameError] = useState("");
//     const [lastNameError, setLastNameError] = useState("");
//     const [mobileNumberError, setMobileNumberError] = useState("");

//     const { control, handleSubmit, reset } = useForm<FormData>();
//     // const { control, handleSubmit, reset } = useForm<FormData>({
//     //     defaultValues: {
//     //         email: 'das@example.com',
//     //         password: 'das7777777',
//     //     },
//     // });

//     const onSubmit = (data: FormData) => {
//         console.log(data);
//         setEmailError("");
//         setPasswordError("");
//         setFirstNameError("");
//         setLastNameError("");
//         setMobileNumberError("");
//         router.push("/(auth)/home");
//     };

//     const onError: SubmitErrorHandler<FormData> = (errors, e) => {
//         console.log(errors);
//         Alert.alert("INVALID FORM", "Fill all required fields");
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
//                                 onChangeText={value => {
//                                     onChange(value);
//                                     if (value) { setEmailError(""); } else { setEmailError("Email is required"); }
//                                 }}
//                                 value={value}
//                                 placeholder="Enter email"
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
//                                 onChangeText={value => {
//                                     onChange(value);
//                                     if (value) { setPasswordError(""); } else { setPasswordError("Password is required"); }
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

//                 <Text style={styles.label}>First Name</Text>
//                 <Controller
//                     control={control}
//                     render={({ field: { onChange, onBlur, value } }) => (
//                         <>
//                             <TextInput
//                                 style={styles.input}
//                                 onBlur={onBlur}
//                                 onChangeText={value => {
//                                     onChange(value);
//                                     if (value) { setFirstNameError(""); } else { setFirstNameError("First Name is required"); }
//                                 }}
//                                 value={value}
//                                 placeholder="Enter First Name"
//                             />
//                             {firstNameError && <Text style={styles.errorMessage}>{firstNameError}</Text>}
//                         </>
//                     )}
//                     name="firstName"
//                     rules={{ required: 'First Name is required', maxLength: 80 }}
//                 />

//                 <Text style={styles.label}>Last Name</Text>
//                 <Controller
//                     control={control}
//                     render={({ field: { onChange, onBlur, value } }) => (
//                         <>
//                             <TextInput
//                                 style={styles.input}
//                                 onBlur={onBlur}
//                                 onChangeText={value => {
//                                     onChange(value);
//                                     if (value) { setLastNameError(""); } else { setLastNameError("Last Name is required"); }
//                                 }}
//                                 value={value}
//                                 placeholder="Enter Last Name"
//                             />
//                             {lastNameError && <Text style={styles.errorMessage}>{lastNameError}</Text>}
//                         </>
//                     )}
//                     name="lastName"
//                     rules={{ required: 'Last Name is required', maxLength: 100 }}
//                 />

//                 <Text style={styles.label}>Mobile Number</Text>
//                 <Controller
//                     control={control}
//                     render={({ field: { onChange, onBlur, value } }) => (
//                         <>
//                             <TextInput
//                                 style={styles.input}
//                                 onBlur={onBlur}
//                                 onChangeText={value => {
//                                     onChange(value);
//                                     if (value) { setMobileNumberError(""); } else { setMobileNumberError("Mobile Number is required"); }
//                                 }}
//                                 value={value ? value.toString() : ''}// Convert the value to a string
//                                 keyboardType="numeric"
//                                 placeholder="Enter mobile number"
//                             />
//                             {mobileNumberError && <Text style={styles.errorMessage}>{mobileNumberError}</Text>}
//                         </>
//                     )}
//                     name="mobileNumber"
//                     rules={{ required: 'Mobile Number is required', minLength: 6, maxLength: 12 }}
//                 />

//                 <Text style={styles.label}>Title</Text>
//                 <Controller
//                     control={control}
//                     render={({ field: { onChange, onBlur, value } }) => (
//                         <>
//                             <TextInput
//                                 style={styles.input}
//                                 onBlur={onBlur}
//                                 onChangeText={value => onChange(value)}
//                                 value={value}
//                                 placeholder="Enter Title"
//                             />
//                         </>
//                     )}
//                     name="title"
//                     rules={{ required: 'Title is required' }}
//                 />

//                 <Text style={styles.label}>Developer</Text>
//                 <Controller
//                     control={control}
//                     render={({ field: { onChange, onBlur, value } }) => (
//                         <>
//                             <TextInput
//                                 style={styles.input}
//                                 onBlur={onBlur}
//                                 onChangeText={value => onChange(value)}
//                                 value={value}
//                                 placeholder="Are you a Developer? (Yes/No)"
//                             />
//                         </>
//                     )}
//                     name="developer"
//                     rules={{ required: 'Developer information is required' }}
//                 />
//                 <Pressable
//                     style={[styles.button, { alignItems: "center", justifyContent: "center", marginBottom: 60 }]}
//                     onPress={handleSubmit(onSubmit, onError)}
//                 >
//                     <Text style={styles.btntxt}>Submit</Text>
//                 </Pressable>
//             </View>
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     label: {
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
//         marginBottom: 15,
//     },
//     errorMessage: {
//         color: 'red',
//         marginBottom: 10,
//     },
// });
