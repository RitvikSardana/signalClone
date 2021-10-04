import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'

const ChatSender = ({data,id}) => {
    return (
        <View style = {styles.sender} key = {id}>
            <Avatar 
                rounded
                source = {{
                    uri:data.photoURL
                }}
                position = 'absolute'
                left = {-5}
                bottom = {-18}
                //WEB
                containerStyle = {{
                    position:'absolute',
                    left:-5,
                    bottom:-20
                }}
            />
            <Text style = {styles.senderText}>{data.message}</Text>
            <Text style = {styles.senderName}>{data.displayName}</Text>
        </View>
    )
}

export default ChatSender

const styles = StyleSheet.create({
    sender:{
        padding:15,
        backgroundColor:'#2b68e6',
        borderRadius:20,
        alignSelf:'flex-start',
        marginLeft:15,
        marginVertical:20,
        maxWidth:'80%',
        position:'relative'
    },
    senderName:{
        fontSize:10,
        left:10,
        color:'white',
        paddingRight:15
    },
    senderText:{
        color:'white',
        fontWeight:'500',
        marginLeft:10,
        marginBottom:15
    },
})
