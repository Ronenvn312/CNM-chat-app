import { StatusBar } from 'expo-status-bar';
import { Button, TouchableOpacity, StyleSheet, Text, TextInput, View, Image, FlatList } from 'react-native';
import { useState, useEffect } from 'react';

export default function ViewMember({ navigation, route }) {
    const [shouldShow, setShouldShow] = useState(false)
    const idCurrent = route.params.idCurrent
    const [idMember, setIdMember] = useState(route.params.idMember)
    const idGroup = route.params.idGroup
    const [a, setA] = useState(0)
    const [admin, setAdmin] = useState("")
    const [idAdmin, setIdAdmin] = useState(route.params.idAdmin)
    var [user, setUser] = useState([]);

    useEffect(() => {
        fetch("https://633f923ee44b83bc73bc8cc7.mockapi.io/api/group")
            .then((res) => res.json())
            .then((data) => {
                for (let index = 0; index < data.length; index++) {
                    if (data[index].id == idGroup) {
                        setIdAdmin(data[index].idAdmin)
                    }
                }
            })
    }, [a]);

    const [temp, setTemp] = useState([])
    const t = []
    useEffect(() => {
        fetch("https://633f923ee44b83bc73bc8cc7.mockapi.io/api/user")
            .then((res) => res.json())
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    t.push(data[i].id)
                }
                setTemp(t)
            })
    }, [a]);
    
    const temp1 = idMember.filter(id => {
        return id !== idAdmin
    })
    const x = temp.filter(item => !temp1.includes(item))

    useEffect(() => {
        fetch("https://633f923ee44b83bc73bc8cc7.mockapi.io/api/user")
            .then((res) => res.json())
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == idAdmin)
                        setAdmin(data[i].name)
                }
                setUser(data);
                for (let index = 0; index < x.length; index++) {
                    setUser(current => current.filter((user) => {
                        return user.id !== x[index]
                    }))
                }
            })
    }, [x.length]);
    useEffect(() => { if (idAdmin == idCurrent) { setShouldShow(true) } else setShouldShow(false) }, [a])

    return (
        <View style={styles.container}>
            <View style={{ height: 37, backgroundColor: '#3643ff', width: '100%' }}></View>
            <View style={{ width: '100%', height: 50, backgroundColor: '#3989ff', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ width: 23, height: 15, marginLeft: 20 }} source={require("../assets/back-icon.png")} />
                </TouchableOpacity>
                <TextInput style={{ height: 30, width: 230, borderWidth: 0.1, backgroundColor: '#3989ff', marginLeft: 20 }} placeholder='Tìm kiếm'></TextInput>
                {shouldShow ?
                    <TouchableOpacity onPress={() => navigation.navigate('AddMember',{idGroup:idGroup, idMember:idMember})}>
                        <Image style={{ width: 25, height: 22, marginLeft: 20 }} source={require("../assets/addfriend.png")} />
                    </TouchableOpacity> : null
                }
                <TouchableOpacity onPress={() => setA((a) => a + 1)}>
                    <Image style={{ width: 20, height: 20, marginLeft: 20 }} source={require("../assets/search.png")} />
                </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 18, margin: 5 }}>Thành viên({idMember.length})</Text>
            <View style={{ width: '97%', height: 70, marginBottom: 20, flexDirection: 'row', borderWidth: 1, borderColor: "#E0E0E0", backgroundColor: '#F6F6F6', alignSelf: 'center', borderRadius: 40, alignItems: 'center' }}>
                <Image style={{ width: 60, height: 60, borderRadius: 30, marginLeft: 3 }} source={require('../assets/empty-avatar.jpg')}></Image>
                <View style={{ paddingLeft: 10 }}>
                    <Text style={{ fontSize: 17 }}>{admin}</Text>
                    <Text>Trưởng nhóm</Text>
                </View>
            </View>
            <FlatList
                data={user}
                renderItem={({ item }) =>
                    <View style={{ width: '97%', height: 70, flexDirection: 'row', borderWidth: 1, borderColor: "#E0E0E0", backgroundColor: '#F6F6F6', alignSelf: 'center', borderRadius: 40, alignItems: 'center', justifyContent: 'space-around' }}>
                        <Image style={{ width: 60, height: 60, borderRadius: 30, marginLeft: -2 }} source={require('../assets/empty-avatar.jpg')}></Image>
                        <View style={{ paddingLeft: 10, width: 180 }}>
                            <Text style={{ fontSize: 17 }}>{item.name}</Text>
                        </View>
                        {shouldShow ?
                            <TouchableOpacity onPress={() => {
                                fetch(`https://633f923ee44b83bc73bc8cc7.mockapi.io/api/group/${idGroup}`, {
                                    method: "PUT",
                                    body: JSON.stringify({ "idAdmin": item.id }),
                                    headers: { "Content-type": "application/json; charset=UTF-8" }
                                });
                                setA((a) => a + 1)
                            }}>
                                <Image style={{ width: 23, height: 25, marginLeft: 20 }} source={require("../assets/admin.png")} />
                            </TouchableOpacity> : null
                        }
                        {shouldShow ?
                            <TouchableOpacity onPress={() => {
                                setIdMember(id => id.filter((id) => {
                                    return id !== item.id
                                }))
                                x.concat(item.id)
                                fetch(`https://633f923ee44b83bc73bc8cc7.mockapi.io/api/group/${idGroup}`, {
                                    method: "PUT",
                                    body: JSON.stringify({ "id_member": idMember }),
                                    headers: { "Content-type": "application/json; charset=UTF-8" }
                                });
                                setA((a) => a + 1)
                            }}>
                                <Image style={{ width: 23, height: 25, marginLeft: 20, marginRight: 5 }} source={require("../assets/user-delete.png")} />
                            </TouchableOpacity> : null
                        }
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