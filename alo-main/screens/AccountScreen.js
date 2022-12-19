import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, TextInput, FlatList, } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios'
const SCREEN_WIDTH = Dimensions.get('screen').width;
export default function AccountScreen({ navigation, route }) {
  const { id, name, user } = route.params
  const image = require('../assets/empty-avatar.jpg')
  const [email, setEmail] = useState("")
  useEffect(() => {
    console.log(user)
  }, [])
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
      >
        <Image source={image} />

      </TouchableOpacity>
      <View  style={{ flex: 0.2, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'left' , marginLeft:30}} >
        <Text style={{fontWeight: 'bold'}}>Thông tin người dùng:</Text>
        <TouchableOpacity
          style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'flext-start', alignItems: 'center' }}>
          <Text style={{width: 100,fontSize: 17}}>Tên: </Text>
          <Text style={{fontSize: 17}}>{user.username}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{width:100,fontSize: 17}}>Email: </Text>
          <Text style={{fontSize: 17}}>{user.email}</Text>
        </TouchableOpacity>
        

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});