import React, { useEffect, useState } from 'react'
import {  StyleSheet, Text, View,KeyboardAvoidingView, Keyboard} from 'react-native'

import { Button,Image,Input } from 'react-native-elements'
import {StatusBar} from 'expo-status-bar'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { auth } from '../firebase'



const Login = ({navigation}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')


    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser){
                navigation.replace("Home")
            }
        });
        return unsubscribe;
    },[])

    const signIn = () =>{
        auth.signInWithEmailAndPassword(email,password) //returns a promise
        .catch(error => alert(error))
    }

    return (
        <KeyboardAvoidingView behavior = 'padding' style = {styles.container}>
            <StatusBar style='light' />
            <Image 
            source = {{
                uri:'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png',
                }}
            style = {styles.img}
            />
            <View style = {styles.inputContainer}>
                <Input 
                    placeholder = 'Email'
                    autoFocus
                    type='email'
                    value = {email}
                    onChangeText = {(text) => setEmail(text)}
                />
                <Input 
                    placeholder = 'Password'
                    secureTextEntry
                    type='password'
                    value = {password}
                    onChangeText = {(text) => setPassword(text)}
                    onSubmitEditing = {signIn}
                />
            </View>
            <Button title = "Login" containerStyle = {styles.button}  onPress = {signIn} />
            <Button title = "Register" containerStyle = {styles.button} type = 'clear' onPress={() => navigation.navigate('Register')} />
        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'white'
    },
    img:{
        width:200,
        height:200
    },
    inputContainer:{
        width:300
    },
    button:{
        width:200,
        marginTop:10,
        borderRadius:10
    },
})
