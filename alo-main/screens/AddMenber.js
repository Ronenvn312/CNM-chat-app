import { StatusBar } from 'expo-status-bar';
import { Button, TouchableOpacity, StyleSheet, Text, TextInput, View, Image, FlatList } from 'react-native';
import { useState, useEffect } from 'react';

export default function AddMember({ navigation, route }) {
    const idGroup = route.params.idGroup
    const [idMember, setIdMember] = useState(route.params.idMember)
    const [temp, setTemp] = useState([])
    var [user, setUser] = useState([]);
    const [a, setA] = useState(0)
    // const x =

    useEffect(() => {
        fetch("https://633f923ee44b83bc73bc8cc7.mockapi.io/api/user")
            .then((res) => res.json())
            .then((data) => {
                setUser(user = data);
                const t = []
                for (let index = 0; index < data.length; index++) {
                    t.push(data[index].id)
                }
                setTemp(t)
                console.log(idMember)
                const x = temp.filter(item => !idMember.includes(item))
                for (let index = 0; index < x.length; index++) {
                    setUser(current => current.filter((user) => {
                        return user.id == x[index]
                    }))
                }
                if (temp.length === idMember.length)
                    setUser([])
            })
    }, [a]);

    useEffect(() => {
        fetch(`https://633f923ee44b83bc73bc8cc7.mockapi.io/api/group/${idGroup}`, {
            method: "PUT",
            body: JSON.stringify({ "id_member": idMember }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
    })

    return (
        <View style={styles.container}>
            <View style={{ height: 37, backgroundColor: '#3643ff', width: '100%' }}></View>
            <View style={{ width: '100%', height: 50, backgroundColor: '#3989ff', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ width: 23, height: 15, marginLeft: 20 }} source={require("../assets/back-icon.png")} />
                </TouchableOpacity>
                <TextInput style={{ height: 30, width: 290, borderWidth: 0.1, backgroundColor: '#3989ff', marginLeft: 10 }} placeholder='Tìm kiếm'></TextInput>
                <TouchableOpacity onPress={() => setA((a) => a + 1)}>
                    <Image style={{ width: 20, height: 20, marginLeft: 20 }} source={require("../assets/search.png")} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={user}
                renderItem={({ item }) =>
                    <View style={{ width: '97%', height: 70, flexDirection: 'row', borderWidth: 1, borderColor: "#E0E0E0", backgroundColor: '#F6F6F6', alignSelf: 'center', borderRadius: 40, alignItems: 'center', justifyContent: 'space-around', marginTop: 20 }}>
                        <Image style={{ width: 60, height: 60, borderRadius: 30, marginLeft: -25 }} source={require('../assets/empty-avatar.jpg')}></Image>
                        <View style={{ paddingLeft: 10, width: 150 }}>
                            <Text style={{ fontSize: 17 }}>{item.name}</Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            setIdMember(idMember.concat([item.id]))
                            setA((a) => a + 1)
                        }}>
                            <Image style={{ width: 40, height: 40 }} source={require("../assets/add.png")} />
                        </TouchableOpacity>
                    </View>}
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