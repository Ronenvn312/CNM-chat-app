import { Image, StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SCREEN_WIDTH = Dimensions.get('screen').width;
export default function HomeScreen({ navigation, route }) {
  const { user } = route.params
  const [idCurrent, setIdCurrent] = useState(route.params)
  var [nameCurrent, setNameCurrent] = useState(route.params.name)
  useEffect(() => {
    if (route.params != null)
      setIdCurrent(route.params.id)
  }, []);

  var [obj, setObj] = useState([]);
  var group = []

  function getAllChatGroup() {
    axios.get("http://192.168.100.7:5000/api/chat/groups", {
      params: {
        user_id: idCurrent
      }
    }).then((res) => {
      // res.json()
      console.log(res.data)
      setObj(res.data)
    })
    console.log(obj)
    // setObj(res.data.reverse())

  }
  useEffect(() => {
    getAllChatGroup()
  }, [idCurrent]);


  const image = require('../assets/empty-avatar.jpg')

  return (
    <View style={styles.container}>
      <TouchableOpacity 
      onPress={getAllChatGroup}
      style={styles.container}>
        <FlatList
          data={obj}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={() => navigation.navigate('Chat', { item: item, idCurrent: user._id, name: user.username, user: user })} style={{ height: 75, flexDirection: 'row', borderWidth: 1, borderColor: "#C4C4C4", backgroundColor: '#F6F6F6' }}>
              <Image style={{ width: 70, height: 70, borderRadius: 30 }} source={image}></Image>
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 17 }}>{item.chatName}</Text>
              </View>
            </TouchableOpacity>}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});