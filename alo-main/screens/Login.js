import { StatusBar } from 'expo-status-bar';
import { Button, ImageBackground, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { useState } from 'react';
import axios from 'axios'

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var [obj, setObj] = useState([]);
  var [data, setData] = useState({})



  const handleSubmit = () => {
    axios.post(`http://192.168.100.7:5000/api/auth/login`, 
    {  email, password }
    ).then((res) => {
      console.log(res.data)
      setData(res.data)
      navigation.navigate('Home', {
        screen: 'Nhắn tin',
        params: { id: res.data.user._id, name: res.data.user.name, email: res.data.user.email , user: res.data.user },
      });
    }).then((err) => console.log(err))
    console.log(email)
    console.log(password)

  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/login_background.png')} resizeMode="cover" style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 10 }}>Đăng nhập</Text>
        </View>
        <View style={{ flex: 1, borderRadius: 10, backgroundColor: '#E7E9EB' }}>
          <TextInput style={{ height: 40, width: 250, margin: 12, borderWidth: 0.1, padding: 10, backgroundColor: '#ffffff', marginTop: 30 }} placeholder='Email đăng nhập' onChangeText={(val) => setEmail(val)}></TextInput>
          <TextInput style={{ height: 40, width: 250, margin: 12, borderWidth: 0.1, padding: 10, backgroundColor: '#ffffff' }} placeholder='Mật khẩu' onChangeText={(val) => setPassword(val)}></TextInput>
          <Text style={{ textAlign: 'right', marginRight: 10, marginTop: 5 }}>Quên mật khẩu?</Text>
          <View style={{ padding: 10, marginTop: 10 }}>
            <Button title='Đăng nhập' onPress={handleSubmit}></Button>
          </View>
          <View style={{ padding: 10, marginTop: -10 }}>
            <Button title='Đăng ký' onPress={() => navigation.navigate('Register', 5)}></Button>
          </View>
          <StatusBar style="auto" />
        </View>
        <View style={{ flex: 1 }}>
        </View>
      </ImageBackground>
    </View>
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