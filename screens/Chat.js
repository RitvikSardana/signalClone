import React, { useEffect, useLayoutEffect, useState } from 'react'

import { StyleSheet, Text, View,TouchableOpacity,SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Keyboard,TouchableWithoutFeedback,TextInput, Alert } from 'react-native'
import { Avatar, Input } from 'react-native-elements'

import {Ionicons,FontAwesome} from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { db,auth } from '../firebase'
import  firebase from 'firebase'
import ChatReceiver from '../Components/ChatReceiver'
import ChatSender from '../Components/ChatSender'

const Chat = ({route,navigation}) => {


    const chatName = route.params.chatName
    const chatId = route.params.id

    const [input,setInput] = useState("");
    const [messages,setMessages] = useState([])
    
    useLayoutEffect(() =>{
        navigation.setOptions({
            headerTitleAlign:'left',
            headerTitle :() => (
                <View style = {styles.headerContainer}>
                    <Avatar 
                        rounded
                        source = {{
                            uri:
                            messages?.[messages.length-1]?.data?.photoURL
                             ||"https://www.connectingcouples.us/wp-content/uploads/2019/07/avatar-placeholder.png"
                        }}
                    />
                    <Text style = {styles.headerTitle}>{chatName}</Text>
                </View>
            ),
            headerRight:() =>(
                <View style = {styles.iconsContainer}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <FontAwesome name = 'video-camera' size = {24} color = 'white' />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}
                    >
                        <Ionicons name = 'call' size = {24} color = 'white' />
                    </TouchableOpacity>
                </View>
            )
        })
    },[navigation,messages])

    useEffect(() =>{
        const unsubscribe = db.collection('chats').doc(chatId).collection('messages').orderBy('timestamp','asc').onSnapshot((snapshot) => setMessages(
            snapshot.docs.map(doc =>({
                id:doc.id,
                data:doc.data()
            }))
        ))
        return unsubscribe
    },[route])


    // Function to send msg to the database in collection chats.messages
    const sendMessage = () =>{
        Keyboard.dismiss()
        input !== "" ?
        db.collection('chats').doc(chatId).collection('messages').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(), // using timestamp as people could be in differnt locations so to keep the timestamp uniform
            message:input,
            displayName:auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL:auth.currentUser.photoURL
        })
        :Alert.alert("Enter atleast 1 figure")
        setInput("")
    }

    return (
        <SafeAreaView style = {{flex:1}}>
            <StatusBar style = 'light' />
            <KeyboardAvoidingView
                // behavior = {Platform.OS==="ios"?"padding":"height"}
                style = {styles.chatContainer}
            >
                <>
                <ScrollView  style = {{height:'100%'}} key = {chatId}>

                {/* Logic for Chat Receive and Send */}
                {messages.map(({chatId,data}) => (
                    data.email === auth.currentUser.email?
                    ( <ChatReceiver data = {data} id = {chatId} />)
                    :
                    ( <ChatSender data = {data} id = {chatId}  />)
                ))}
                </ScrollView>
                <View style = {styles.chatFooter} >
                    <TextInput
                        placeholder = "Signal message"
                        style = {styles.chatInput}
                        value = {input}
                        onChangeText = {(text) =>setInput(text)}
                        onSubmitEditing = {sendMessage}
                    />
                    <TouchableOpacity onPress = {sendMessage} activeOpacity = {0.5}>
                        <Ionicons name = 'send' size = {24} color = "#2b68e6" />
                    </TouchableOpacity>
                </View>
                </>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Chat

const styles = StyleSheet.create({

    headerContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    headerTitle:{
        fontSize:20,
        fontWeight:'700',
        marginLeft:10,
        color:'white'
    },
    iconsContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:80,
        marginRight:20
    },
    chatContainer:{
        height:'100%',
        width:'100%'
    },
    chatFooter:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        padding:'6%',
    },
    chatInput:{
        flex:1,
        padding:10,
        marginRight:10,
        borderRadius:30,
        color:'gray',
        backgroundColor:'#ececec',
    },
})
