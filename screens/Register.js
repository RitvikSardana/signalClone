import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet,  View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Button,Image,Text,Input } from 'react-native-elements'
import { auth } from '../firebase'
import { db } from '../firebase'

const Register = ({navigation}) => {


    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [imageURL,setImageURL] = useState('')

    useLayoutEffect(() =>{
        navigation.setOptions({
            title:'Back To Login'
        })
    },[navigation])


    const register = () =>{
        auth.createUserWithEmailAndPassword(email,password)
        .then(authUser =>{
            authUser.user.updateProfile({
                displayName:name,
                photoURL:imageURL===""?  "https://www.connectingcouples.us/wp-content/uploads/2019/07/avatar-placeholder.png":imageURL,
                // photoURL:imageURL ||  "https://www.connectingcouples.us/wp-content/uploads/2019/07/avatar-placeholder.png"
            })
            // console.log(authUser);
        }).catch(error => alert(error.message))
    }


    return (
        <View style = {styles.container}>
            <StatusBar animated = {true} style = 'light' />
            <Text h3 style = {styles.textRegister}>Create a signal account</Text>

            <View style = {styles.inputContainer}>
                <Input 
                    placeholder = 'Full Name'
                    autoFocus
                    type = 'text'
                    value = {name}
                    onChangeText = {(text) => setName(text)}
                />
                <Input 
                    placeholder = 'Email'
                    type = 'email'
                    value = {email}
                    onChangeText = {(text) =>{
                        setEmail(text)
                        // console.log(email)
                    }}
                />            
                <Input 
                    placeholder = 'Password'
                    secureTextEntry
                    type='password'
                    value = {password}
                    onChangeText = {(text) =>setPassword(text)}
                />
                <Input 
                    placeholder = 'Display Pic URL(optional)'
                    type='text'
                    value = {imageURL}
                    onChangeText = {(text) =>setImageURL(text)}
                    onSubmitEditing = {register}
                />
            </View>
            <Button 
                title = "Submit"
                containerStyle ={styles.button}
                onPress = {register}
                raised
            />
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'white'
    },
    textRegister:{
        marginVertical:10
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
