import { Image, StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useRef, useEffect } from 'react'
import { Menu, MenuItem } from 'react-native-material-menu';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
// import io from "socket.io-client"
// const socket = io.connect("http://localhost:5000")

// import Realm from 'realm';

const SCREEN_WIDTH = Dimensions.get('screen').width;
export default function ChatScreen({ navigation,route }) {
  // const route = useRoute();
  const {item, idCurrent, user} = route.params
  var [name, setName] = useState(route.params.name)
  useEffect(() => {
    console.log(name)
  }, [])
  // console.log(user.current)
  const [messages, setMessages] = useState([])
  const obj = []
  const [lastID, setLastID] = useState("")
  const [currentMessage, setCurrentMessage] = useState('');

  const getAllMessOfAGroup = async () => {
    const messList = await axios.get("http://192.168.100.7:5000/api/groupmessage",{
      params: {
        room: item._id
      }
    })

    console.log(messList)
    setMessages(messList.data)
  }
  useEffect(() => {
    getAllMessOfAGroup()
  }, [])

  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  const millis = new Date();
  // console.log(millis.getHours() + ":" + millis.getMinutes());

  const scrollView = useRef();

  const Message = ({ time, isLeft, title, id, image }) => {
    const isOnLeft = (type) => {
      if (isLeft && type === "titleContainer") {
        return {
          alignSelf: "flex-start",
          backgroundColor: "#f0f0f0",
          borderTopLeftRadius: 0,
        };
      } else if (isLeft && type === "message") {
        return {
          color: "#000000",
        };
      } else if (isLeft && type === "time") {
        return {
          color: "darkgray",
        };
      } else {
        return {
          borderTopRightRadius: 0,
        };
      }
    };
    return (
      <View style={[]}>
        <View style={[styles.messageContainer, isOnLeft("titleContainer"),]}>
          <View style={styles.messageView}>
            <Text style={[styles.message, isOnLeft("message")]}>{title}</Text>
          </View>
          <View style={styles.timeView}>
            <Image source={{ uri: image }} style={{ resizeMode: 'contain', minWidth: 20 }} />
            <Text >{id}</Text>
            <View style={styles.menu}>
              <Menu
                visible={visible}
                anchor={<TouchableOpacity onPress={() => setVisible(true)}><Image style={{ width: 22, height: 22 }} source={require("../assets/more.png")} /></TouchableOpacity>}
                onRequestClose={hideMenu}
              >
                <MenuItem onPress={hideMenu}><Image style={{ width: 18, height: 18 }} source={require("../assets/delete.png")} />   Xóa</MenuItem>
                <MenuItem onPress={() => {
                  messages[_id].message = 'Đã thu hồi';
                  console.log(_id)
                  setVisible(false);
                }}><Image style={{ width: 20, height: 20 }} source={require("../assets/undo.png")} />  Thu hồi</MenuItem>
              </Menu>
            </View>
            <Text style={[styles.time, isOnLeft("time")]}>{time}</Text>
          </View>
        </View>
      </View>
    )
  };


  const saveMessage = async (messData) => {
    await axios.post("http://192.168.100.7:5000/api/groupmessage/saveMessage", messData)
  }
  const sendMessage = async () => {
    const messageData = {
      room: item._id,
      author: name,
      message: currentMessage,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
    }

    saveMessage(messageData)
    setMessages((list) => [...list, messageData])
    setCurrentMessage('')
  }


  return (
    <View style={styles.container}>
      <View style={{ height: 37, backgroundColor: '#3643ff', width: SCREEN_WIDTH }}></View>
      <View style={{ width: SCREEN_WIDTH, height: 50, backgroundColor: '#3989ff', flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={{ width: 23, height: 15, marginLeft: 20 }} source={require("../assets/back-icon.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { if (item.isGroupChat) navigation.navigate("GroupManager", { item: item, idCurrent: idCurrent }) }}>
          <Image style={{ width: 40, height: 40, borderRadius: 30, marginLeft: 5 }} source={require('../assets/empty-avatar.jpg')}></Image>
        </TouchableOpacity>
        <View style={{ marginLeft: 5 }}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>{item.chatName}</Text>
          <Text style={{ fontSize: 12, fontWeight: '350', color: 'white', marginLeft: 3 }}>Truy cập 5 phút trước</Text>
        </View>
      </View>
      <ScrollView style={{ backgroundColor: 'white', flex: 1 }}
        ref={ref => scrollView.current = ref}
        onContentChange={() => { scrollView.current.scrollToEnd({ animated: true }) }}>
        {messages.map((message, index) => (
          <Message
            key={index}
            time={message.time}
            isLeft={message.author != user.username}
            title={message.message}
            id={message.author}
            // image={message.file}
          />
        ))}
      </ScrollView>
      <View style={{ width: SCREEN_WIDTH, height: 45, flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', backgroundColor: '#f0f0f0', borderRadius: 10 }}>
        <Image style={{ width: 28, height: 28, marginLeft: 10 }} source={require("../assets/sticker-icon.png")} />
        <TextInput style={{ width: 230 }} placeholder='Tin nhắn ' value={currentMessage} onChangeText={(val) => setCurrentMessage(val)}></TextInput>
        <TouchableOpacity>
          <Image style={{ width: 28, height: 28, marginLeft: 5 }} source={require("../assets/more.png")} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={{ width: 28, height: 28, marginLeft: 5 }} source={require("../assets/galery.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> sendMessage()}>
          <Image style={{ width: 40, height: 40, marginLeft: 10 }} source={require("../assets/send.png")} />
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
  messageContainer: {
    backgroundColor: '#99ccff',
    maxWidth: "80%",
    alignSelf: "flex-end",
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
    marginTop: 10
  },
  messageView: {
    backgroundColor: "transparent",
    maxWidth: "80%",
    flexDirection: 'column'
  },
  timeView: {
    flexDirection: 'row',
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    paddingLeft: 10,
  },
  message: {
    color: "black",
    alignSelf: "flex-start",
    fontSize: 15,
  },
  time: {
    color: "black",
    alignSelf: "flex-end",
    fontSize: 10,
  },
  menu: {
    marginRight: 10,
    alignSelf: "flex-end",
    marginBottom: -5
  }
});