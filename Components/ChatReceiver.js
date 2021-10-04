import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'

const ChatReceiver = ({data,id}) => {
    return (
        <View style = {styles.receiver} key = {id}>
            <Text style = {styles.receiverText}>{data.message}</Text>

            <Avatar
                rounded
                source = {{
                    uri:data.photoURL
                }}
                position = 'absolute'
                right = {-5}
                bottom = {-18}
                //WEB
                containerStyle = {{
                    position:'absolute',
                    right:-5,
                    bottom:-20
                }}
            />
        </View>
    )
}

export default ChatReceiver

const styles = StyleSheet.create({
    receiver:{
        padding:15,
        backgroundColor:'#ececec',
        borderRadius:20,
        alignSelf:'flex-end',
        marginRight:15,
        marginVertical:20,
        minWidth:'20%',
        maxWidth:'80%',
        position:'relative',
    },
    receiverText:{
        color:'black',
        fontWeight:'500',
        marginLeft:5,
    },
})
