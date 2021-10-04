import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,LogBox, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationCustom } from './navigation/StackNavigation';


Platform.OS === 'android'?LogBox.ignoreLogs(['Warning: ...']):'';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigationCustom />
      <StatusBar style = 'auto' />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
