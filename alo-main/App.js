import { StyleSheet, View, Button, Text, Image,Dimensions } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import AccountScreen from './screens/AccountScreen';
import Register from './screens/Register';
import TabNavigator from './navigations/TabNavigator';
import AddFriend from './screens/AddFriend';
import CreateGroup from './screens/CreateGroup';
import GroupManager from './screens/GroupManager';
import AddMember from './screens/AddMenber';
import ViewMember from './screens/ViewMember';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    < NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="AddFriend" component={AddFriend}/>
        <Stack.Screen name="CreateGroup" component={CreateGroup}/>
        <Stack.Screen name="GroupManager" component={GroupManager}/>
        <Stack.Screen name="AddMember" component={AddMember}/>
        <Stack.Screen name="ViewMember" component={ViewMember}/>
      </Stack.Navigator>
    </NavigationContainer >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
});
