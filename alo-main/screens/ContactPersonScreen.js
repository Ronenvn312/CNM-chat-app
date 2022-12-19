import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, View, Dimensions, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

const SCREEN_WIDTH = Dimensions.get('screen').width;
export default function ContactPersonScreen({ route }) {
  const nameCurrent = route.params.name
  const idCurrent = route.params.id

  const [obj, setObj] = useState([]);
  const contact = []
  useEffect(() => {
    fetch("https://633f923ee44b83bc73bc8cc7.mockapi.io/api/group")
      .then((res) => res.json())
      .then((data) => {
        for (let index = 0; index < data.length; index++) {
          for (let i = 0; i < data[index].id_member.length; i++) {
            if (data[index].id_member[i] == idCurrent && !data[index].isGroup)
              contact.push(data[index])
          }
        }
        setObj(contact)
      })
  }, [idCurrent]);

  const nameGroup = () => {
    for (let index = 0; index < obj.length; index++) {
      for (let i = 0; i < obj[index].name.length; i++) {
        if (obj[index].name[i] !== nameCurrent) {
          // console.log(obj[index].name[i])
          obj[index].name[0] = obj[index].name[i]
        }
      }
    }
  }
  nameGroup()
  return (
    <View style={styles.container}>
      <FlatList
        data={obj}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => navigation.navigate('Chat', { name: item.name, id: item.id, idCurrent: idCurrent, isGroup: item.isGroup, idMember: item.id_member, idAdmin: item.idAdmin, idGroup: item.id, nameCurrent: nameCurrent })} style={{ height: 75, flexDirection: 'row', borderWidth: 1, borderColor: "#C4C4C4", backgroundColor: '#F6F6F6' }}>
            <Image style={{ width: 70, height: 70, borderRadius: 30 }} source={require('../assets/empty-avatar.jpg')}></Image>
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 17 }}>{item.name[0]}</Text>
            </View>
          </TouchableOpacity>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});