import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Register({ navigation, route }) {
  const [data, setData] = useState({})
  // console.log(route.params) 
  const [username,setUsername] =useState("")
  const [email,setEmail] =useState("")
  const [password,setPassword] =useState("")
  const [confirmPassword,setConfirmPassword] =useState("")

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleRegister = () => {
    axios.post(`http://192.168.100.7:5000/api/auth/register`,
      {username, email, password }
    ).then((res) => {
      console.log(res.data)
      setData(res.data)
      navigation.navigate('Login', {
        screen: 'Đăng nhập',
        params: { data: data },
      });
    }).then((err) => console.log(err))
    console.log(email)
    console.log(password)
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/login_background.png')} resizeMode="cover" style={{ flex: 1 }}>
        <View style={{ height: 300, justifyContent: 'flex-end' }}>
          <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 10 }}>Đăng ký</Text>
        </View>
        <View style={{ height: 340, borderRadius: 10, backgroundColor: '#E7E9EB' }}>
          <TextInput
            type='text'
            placeholder='Tên đăng nhập:'
            name='username'
            onChangeText={(val) => setUsername(val)}
            style={{ height: 40, width: 250, margin: 12, borderWidth: 0.1, padding: 10, backgroundColor: '#ffffff', marginTop: 30 }} ></TextInput>
          <TextInput
            type='email'
            placeholder='Email'
            name='email'
            onChangeText={(val) => setEmail(val)}
            style={{ height: 40, width: 250, margin: 12, borderWidth: 0.1, padding: 10, backgroundColor: '#ffffff' }} ></TextInput>
          <TextInput
            type='password'
            placeholder='Mật khẩu'
            name='password'
            onChangeText={(val) => setPassword(val)}
            style={{ height: 40, width: 250, margin: 12, borderWidth: 0.1, padding: 10, backgroundColor: '#ffffff' }} ></TextInput>
          <TextInput
            type='password'
            placeholder='Nhập lại mật khẩu:'
            name='confirmPassword'
            onChangeText={(val) => setConfirmPassword(val)}
            style={{ height: 40, width: 250, margin: 12, borderWidth: 0.1, padding: 10, backgroundColor: '#ffffff' }} ></TextInput>
          <View style={{ margin: 10 }}>
            <Button title='Đăng ký' onPress={() => handleRegister()}></Button>
          </View>
          <View style={{ margin: 10 }}>
            <Button title='Đăng nhập' onPress={() => navigation.navigate('Login')}></Button>
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