import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { React, useState, useEffect } from 'react';
import { Text, FlatList, StyleSheet, Image, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/HomeScreen';

const SCREEN_WIDTH = Dimensions.get('screen').width;
export default function AddFriend({ navigation, route }) {
    const image = require('../assets/empty-avatar.jpg')
    const { nameCurrent, idCurrent, rootUser } = route.params
    var [group, setGroup] = useState([]);
    var [user, setUser] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const searchUser = async () => {
        axios.get("http://192.168.100.7:5000/api/auth/search", { search: searchTerm, _id: rootUser._id })
            .then(res => setSearchResults(res.data))
    }

    useEffect(() => {
        searchUser()
    }, [searchTerm]);


    return (
        <View style={styles.container}>
            <View style={{ height: 37, backgroundColor: '#3643ff', width: SCREEN_WIDTH }}></View>
            <View style={{ width: SCREEN_WIDTH, height: 50, backgroundColor: '#3989ff', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ width: 23, height: 15, marginLeft: 20 }} source={require("../assets/back-icon.png")} />
                </TouchableOpacity>
                <Image style={{ width: 20, height: 20, marginLeft: 20 }} source={require("../assets/search.png")} />
                <TextInput
                    onChangeText={(val) => setSearchTerm(val)}
                    style={{ height: 30, width: 250, borderWidth: 0.1, backgroundColor: '#3989ff', marginLeft: 20 }} placeholder='Tìm kiếm'></TextInput>
            </View>
            <FlatList
                data={searchResults}
                renderItem={({ item, index }) =>
                    item._id != rootUser._id ? <View style={{ height: 75, flexDirection: 'row', borderWidth: 1, borderColor: "#C4C4C4", backgroundColor: '#F6F6F6' }}>
                        <Image style={{ width: 70, height: 70, borderRadius: 30 }} source={require('../assets/empty-avatar.jpg')}></Image>
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontSize: 17, width: 200 }}>{item.username}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() =>
                                axios.post("http://192.168.100.7:5000/api/chat/accessChat", {
                                    user: rootUser,
                                    userId: item._id
                                }).then(res => {
                                    navigation.navigate('Chat', { item: res.data, idCurrent: rootUser._id, name: rootUser.username, user: rootUser })
                                    console.log(res.data)
                                    alert("Đã thêm bạn!")
                                })
                            }
                            style={{ justifyContent: 'center', marginRight: -20 }}>
                            <Image style={{ width: 40, height: 40, resizeMode: 'contain' }} source={require('../assets/add.png')}></Image>
                        </TouchableOpacity>
                    </View> : ""
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