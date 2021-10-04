import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem,Avatar } from 'react-native-elements'
import { db,auth } from '../firebase'

const CustomListItem = ({id,chatName,enterChat}) => {


    const [chatMessages,setChatMessages] = useState([])

    useEffect(() =>{
        const unsubscribe = db
        .collection('chats')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp','asc')
        .onSnapshot((snapshot) => setChatMessages(
            snapshot.docs.map(doc => doc.data())
        ))
        return unsubscribe
    },[])


    const subtitleDisplay = () => {
        if(chatMessages[chatMessages.length - 1]?.displayName === undefined){
            return 'none'
        }
        return 'flex'
    }


    return (
        <ListItem onPress = {() => enterChat(id,chatName)} key = {id} topDivider>
            <Avatar 
                rounded
                source = {{
                    uri:
                    chatMessages[chatMessages.length - 1]?.photoURL
                    ||
                    "https://www.connectingcouples.us/wp-content/uploads/2019/07/avatar-placeholder.png"
                }}
            />
            <ListItem.Content key = {id}>
                <ListItem.Title style = {{fontWeight:'bold'}}>
                   {chatName}
                </ListItem.Title>
                <ListItem.Subtitle 
                    numberOfLines = {1} ellipsizeMode = 'tail'  
                    style = {{display: subtitleDisplay() }}
                
                >
                {chatMessages[chatMessages.length - 1]?.displayName + " : " + chatMessages[chatMessages.length - 1]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
