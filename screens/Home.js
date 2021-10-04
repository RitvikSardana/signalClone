import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View,SafeAreaView, ScrollView,Button,TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import {MaterialIcons,AntDesign} from '@expo/vector-icons'
import CustomListItem from '../Components/CustomListItem'
import {auth,db} from '../firebase'
import { StatusBar } from 'expo-status-bar'

const Home = ({navigation}) => {
    const [chats,setChats] = useState([])

    const signOut = () =>{
        auth.signOut()
        .then(()=>{
            navigation.replace('Login')
        })
    }
    
    useEffect(()=>{
        const unsubscribe = db.collection('chats').onSnapshot((snapshot)=>{
            setChats(snapshot.docs.map(doc => ({ // return an object with an id and data and hence ( outside an {})                
                id:doc.id,
                data:doc.data(),
            })))
        })
        return unsubscribe
    },[])

    useLayoutEffect(() =>{
        navigation.setOptions({
            title:'Signal',
            headerStyle : {backgroundColor:'#fff'},
            headerTitleStyle:{color:'black'},
            headerTintColor:'black',
            headerTitleAlign:'center',
            headerLeft: () =>(
                <TouchableOpacity 
                    activeOpacity ={0.5} 
                    onPress = {signOut} 
                    style = {{marginLeft:10}}
                >
                    <Avatar 
                        rounded
                        source = {{uri:auth?.currentUser?.photoURL}}
                    />
                </TouchableOpacity>
            ),
            headerRight:() =>(
                <View style = {styles.iconsContainer}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <MaterialIcons name = 'photo-camera' size = {24} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}
                        onPress = {() => navigation.navigate('AddChat')}
                    >
                        <MaterialIcons name = 'add-circle' size = {24} />
                    </TouchableOpacity>
                </View>
            )
        })
    },[navigation])


    const enterChat= (id,chatName) =>{
        navigation.navigate('Chat',{
            id,
            chatName
        });
    }

    return (
        <SafeAreaView>
            <StatusBar style = 'light'/>
            <ScrollView style = {{height:'100%'}}>
                {chats.map(({id,data: {chatName}}) => (
                    <CustomListItem 
                        key = {id} 
                        id = {id} 
                        chatName = {chatName} 
                        enterChat = {enterChat} 
                    />
                ))}

            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    iconsContainer:{
        justifyContent:'center',
        alignContent:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        width:80,
        marginRight:'1%'
    }
})
