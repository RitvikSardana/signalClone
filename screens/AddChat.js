import React,{useLayoutEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { db } from '../firebase'

const AddChat = ({navigation}) => {


    const [input,setInput] = useState("")

    const createChat = async () =>{
        input !== ""?
        await db
        .collection("chats")
        .add({
            chatName:input,
        })
        .then(() =>{
            navigation.goBack()
        })
        .catch((error) => alert(error))
        //else
        :alert("Add some chat name")
    }

    useLayoutEffect(() =>{
        navigation.setOptions({
            title:'Add a new Chat',
            headerBackTitle:'Chats',
            headerTitleAlign:'center',
        })
    },[navigation])


    return (
        <View style = {styles.container}>
            <Input 
                placeholder = "Enter Chat Name"
                value = {input}
                onChangeText = {(text)=>setInput(text)}
                leftIcon = {
                    <Icon 
                    name = "wechat" 
                    type = 'antdesign' 
                    size = {28}
                    color = 'black'
                    />
                }
                onSubmitEditing = {createChat}
            />
            <Button 
                disabled = {!input}
                title = "Add Chat"
                onPress = {createChat}
            />
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container:{
        padding:20,
        // height:'100%'
    }
})
