import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { React, useState, useEffect } from 'react';
import { Text, FlatList, StyleSheet, Image, View, Dimensions, TextInput, TouchableOpacity, Button } from 'react-native';
import HomeScreen from '../screens/HomeScreen';

const SCREEN_WIDTH = Dimensions.get('screen').width;
export default function CreateGroup({ navigation, route }) {
    const {nameCurrent, idCurrent, rootUser} = route.params
    const array = []
    const [lastID, setLastID] = useState("0")
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")

    const [userPushToGroup, setUserPushToGroup] = useState([idCurrent])

    const searchUser = async () => {
        axios.get("http://192.168.100.7:5000/api/auth/users")
            .then(res => setSearchResults(res.data))
    }
    useEffect(() => {
        searchUser()
    }, []);

    var [nameGroup, setNameGroup] = useState("");
    var [idMember, setIdMember] = useState([idCurrent])
    var [nameMember, setNameMember] = useState([])
    const [m, setM] = useState([])

    useEffect(() => {
        console.log('hi')
        console.log(idMember)
        console.log(nameMember)
    }, [nameMember])

    const groupUser = {
        "name": nameGroup,
        "id_member": idMember,
        "isGroup": true,
        "id": lastID - 1,
        "idAdmin": idCurrent
    }

    return (
        <View style={styles.container}>
            <View style={{ height: 37, backgroundColor: '#3643ff', width: SCREEN_WIDTH }}></View>
            <View style={{ width: SCREEN_WIDTH, height: 50, backgroundColor: '#3989ff', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ width: 23, height: 15, marginLeft: 20 }} source={require("../assets/back-icon.png")} />
                </TouchableOpacity>
                <Image style={{ width: 20, height: 20, marginLeft: 20 }} source={require("../assets/search.png")} />
                <TextInput style={{ height: 30, width: 250, borderWidth: 0.1, backgroundColor: '#3989ff', marginLeft: 20 }} placeholder='Tìm kiếm'></TextInput>
            </View>
            <View style={{ height: 150, marginBottom: 20, marginTop: 5, borderWidth: 0.7, borderRadius: 10, width: '95%', alignSelf: 'center' }}>
                <Text style={{ alignSelf: 'center', fontSize: 18, color: '#003366' }}>Thành viên nhóm:</Text>
                <FlatList
                    data={m}
                    extraData={m}
                    refreshing={true}
                    renderItem={({ item, index }) =>
                        <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: "#C4C4C4", borderRadius: 20, backgroundColor: '#F6F6F6' }}>
                            <View style={{ padding: 10, width: 300 }}>
                                <Text style={{ fontSize: 17 }}>{item.name}</Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                                setM(current => current.filter((name) => {
                                    return name.name !== item.name;
                                }),);
                                setM(current => current.filter((id) => {
                                    return id.id !== item.id;
                                }),);
                                setIdMember(current => current.filter((id) => {
                                    return id !== item.id;
                                }))
                                setNameMember(current => current.filter((name) => {
                                    return name !== item.name
                                }))
                            }} style={{ justifyContent: 'center', marginRight: -20 }}>
                                <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../assets/remove.png')}></Image>
                            </TouchableOpacity>
                        </View>}
                />
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 20 }}>
                <TextInput style={{ height: 40, width: 200, marginRight: 15, borderRadius: 5, borderWidth: 0.5 }} placeholder='Nhập tên nhóm' onChangeText={(value) => setNameGroup(value)} value={nameGroup}></TextInput>
                <Button onPress={() => {
                    const name = ""
                    if (idMember.length > 2)
                        if (nameGroup.length == 0)
                            alert("Chưa nhập tên nhóm")
                        else {
                            axios.post("http://192.168.100.7:5000/api/chat/createGroupChat", {
                                name: nameGroup,
                                current_user_id: rootUser._id,
                                users: userPushToGroup
                              }).then(res => {
                                navigation.navigate('Chat', { item: res.data, idCurrent: rootUser._id, name : rootUser.username, user: rootUser})
                                console.log(res.data)
                                alert("Thành công!")
                              })
                                

                            setIdMember([idCurrent]);
                            setNameMember([]);
                            setM([])
                            setNameGroup("")
                            
                        }
                    else
                        alert("Nhóm phải có từ 3 thành viên trở lên")
                    console.log(groupUser)
                }} color={'green'} title='Tạo nhóm'></Button>
            </View>
            <FlatList
                data={searchResults}
                renderItem={({ item, index }) =>
                    item._id != rootUser._id? <View style={{ height: 75, flexDirection: 'row', borderWidth: 1, borderColor: "#C4C4C4", backgroundColor: '#F6F6F6' }}>
                        <Image style={{ width: 70, height: 70, borderRadius: 30 }} source={require('../assets/empty-avatar.jpg')}></Image>
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontSize: 17, width: 200 }}>{item.username}</Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            let x = 0
                            // if (typeof idMember === 'string')
                            for (let i = 0; i <= idMember.length; i++) {
                                if (idMember[i] === item._id) {
                                    console.log(item._id)
                                    x = 1
                                }
                            }
                            if (x == 0) {
                                userPushToGroup.push(item)
                                setIdMember(idMember.concat(item._id));
                                setNameMember(nameMember.concat(item.username));
                                setM(m.concat({ 'id': item._id, name: item.username }))
                            }
                        }} style={{ justifyContent: 'center', marginRight: -20 }}>
                            <Image style={{ width: 40, height: 40, resizeMode: 'contain' }} source={require('../assets/add.png')}></Image>
                        </TouchableOpacity>
                    </View>: ""
                    }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});