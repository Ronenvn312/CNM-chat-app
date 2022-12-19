import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { React, useState, useEffect } from 'react';
import { Text, Alert, StyleSheet, Image, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;
export default function GroupManager({ navigation, route }) {
    const [shouldShow, setShouldShow] = useState(false)
    const name = route.params.name
    const idCurrent = route.params.idCurrent
    const item = route.params.item
    const [members, setMembers] = useState([])
    const [user, setUser] = useState({})

    const getCurrentUsser = () => {
        item.users.map((members) => {
            if(members._id === idCurrent){
                setUser(members)
            }
        })
    }

    useEffect(() => {
        getCurrentUsser()
        console.log(item.users)
        if (item.groupAdmin === idCurrent) { setShouldShow(true) }
        else setShouldShow(false)
    }, [shouldShow])

    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 30, height: 37 }}>
                <Image style={{ width: 15, height: 27, marginLeft: 20, marginTop: -155 }} source={require("../assets/back-black.png")} />
            </TouchableOpacity>
            <Image style={{ width: 120, height: 120, borderRadius: 30, alignSelf: 'center', marginTop: -50 }} source={require('../assets/empty-avatar.jpg')}></Image>
            <Text style={{ textAlign: 'center', fontSize: 22, marginTop: 10 }}>{name}</Text>
            <TouchableOpacity style={{margin:20, height: 80, marginTop: 90, justifyContent: 'center' }}>
                <View style={{flexDirection: 'row' , alignItems: 'center', marginBottom:10}}>
                    <Image style={{width:30, height:30}} source={require('../assets/home/themthanhvien.png')}></Image>
                <Text style={{fontSize: 17, fontWeight:'bold', color:'gray'}}>Thành viên nhóm: </Text>
                </View>
                {item.users.map((member) => {
                    return (
                        <TouchableOpacity style={{marginLeft: 20, marginBottom:4, flexDirection: 'row', alignItems: 'center'}}>
                            <Image style={{width:30,height:30, marginRight: 10}} source={require('../assets/home/Avatar.png')}></Image>
                            <Text style={{fontWeight: 'bold', fontSize: 16}}>{member.username}</Text>
                            {
                                item.groupAdmin == member._id? (
                                    <Image style={{ marginLeft:10, width:17,height:17}} source={require('../assets/admin.png')}></Image>
                                ): ""
                            }
                        </TouchableOpacity>
                    )
                })}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                if (idCurrent === item.groupAdmin)
                    Alert.alert(
                        "Không thể rời nhóm",
                        "Bạn cần phải trao lại quyền Admin trưóc khi rời khỏi nhóm",
                        [
                            {
                                text: "Cancel"
                            },
                            { text: "OK" }
                        ]
                    );
                else {
                    axios.put("http://192.168.100.7:5000/api/chat/removeFromGroup",{
                        chatId: item._id,
                        userId: idCurrent
                    }).then(res => {
                        console.log(res)
                        navigation.navigate.pop()
                    })
                   
                }
            }} style={{ height: 40, borderWidth: 1, borderColor: "#C4C4C4", backgroundColor: '#F6F6F6', marginTop: 20, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Rời nhóm</Text>
            </TouchableOpacity>
            {shouldShow ? <TouchableOpacity onPress={() => {
                if (idCurrent === item.groupAdmin) {
                    axios.delete(`http://192.168.100.7:5000/api/chat/deleteGroup?chat_id=${item._id}`)
                    .then(res => {
                        console.log(res)
                    })
                    navigation.navigate('Home', {
                        screen: 'Nhắn tin',
                        params: { id: idCurrent, name: user.username, email: user.email , user: user },
                      });
                }
            }} style={{ height: 40, borderWidth: 1, borderColor: "#C4C4C4", backgroundColor: '#F6F6F6', marginTop: 20, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Xóa nhóm</Text>
            </TouchableOpacity> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
});