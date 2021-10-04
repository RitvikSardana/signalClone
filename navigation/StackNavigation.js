import React from 'react'
import Login from '../screens/Login';
import Register from '../screens/Register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import AddChat from '../screens/AddChat';
import Chat from '../screens/Chat';

const Stack = createNativeStackNavigator();

const globalHeaderStyle = {
    headerStyle:{backgroundColor:'#2c6bed'},
    headerTitleStyle:{color:'white'},
    headerTintColor:'white',
    headerBackTitle:'Back to Login'
}

export const StackNavigationCustom = () =>{

    return (
        <Stack.Navigator
            screenOptions = {globalHeaderStyle}
            initialRouteName = "Login"
        >
            <Stack.Screen 
            name = "Login" 
            component = {Login}  
            />
            <Stack.Screen 
            name = "Register" 
            component = {Register}  
            />
            <Stack.Screen 
            name = "Home" 
            component = {Home}  
            />
            <Stack.Screen 
            name = "AddChat" 
            component = {AddChat}  
            />
            <Stack.Screen 
            name = "Chat" 
            component = {Chat}  
            />            
      </Stack.Navigator>
    )
}
