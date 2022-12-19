import { StatusBar } from 'expo-status-bar';
import { React, useState } from 'react';
import { Text, ImageBackground, StyleSheet, Image, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/HomeScreen';
import AccountScreen from '../screens/AccountScreen';
import ContactScreen from '../screens/ContactScreen';
import { Menu, MenuItem } from 'react-native-material-menu';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const Tab = createBottomTabNavigator();
export default function TabNavigator({ navigation, route }) {
    const [visible, setVisible] = useState(false);
    const nameCurrent = route.params.params.name
    const idCurrent = route.params.params.id
    const email = route.params.params.email
    const rootUser = route.params.params.user
    // console.log(route.params.params)

    const addfriend = () => {
        setVisible(false)
        navigation.navigate('AddFriend', { nameCurrent: nameCurrent, idCurrent: idCurrent, rootUser: rootUser })
    };

    const createGroup = () => {
        setVisible(false)
        navigation.navigate('CreateGroup', { nameCurrent: nameCurrent, idCurrent: idCurrent, rootUser: rootUser })
    };
    const hideMenu = () => setVisible(false);
    return (
        <View style={styles.container}>
            <View style={{ height: 37, backgroundColor: '#3643ff', width: SCREEN_WIDTH }}></View>
            <View style={{ width: SCREEN_WIDTH, height: 50, backgroundColor: '#3989ff', flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ width: 20, height: 20, marginLeft: 20 }} source={require("../assets/search.png")} />
                <TextInput style={{ height: 30, width: 250, borderWidth: 0.1, backgroundColor: '#3989ff', marginLeft: 20 }} placeholder='Tìm kiếm'></TextInput>
                <View style={{ paddingLeft: 40 }}>
                    <Menu
                        visible={visible}
                        anchor={<TouchableOpacity onPress={() => setVisible(true)}><Image style={{ width: 22, height: 22 }} source={require("../assets/plus.png")} /></TouchableOpacity>}
                        onRequestClose={hideMenu}
                    >
                        <MenuItem onPress={addfriend}>
                            <Image style={{ width: 20, height: 20 }} source={require("../assets/addfriend.png")} />    Thêm bạn
                        </MenuItem>
                        <MenuItem onPress={()=> createGroup()}>
                            <Image style={{ width: 20, height: 20 }} source={require("../assets/addgroup.png")} />  Tạo nhóm
                        </MenuItem>
                    </Menu>
                </View>
            </View>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Nhắn tin" component={HomeScreen}
                    initialParams={{ user: rootUser }}
                    options={{
                        tabBarIcon: () => (<Image source={require("./../assets/message-icon.png")} style={{ width: 22, height: 20 }} />),
                    }} />
                <Tab.Screen name="Danh bạ" component={ContactScreen}
                    initialParams={{ id: idCurrent, name: nameCurrent }}
                    options={{
                        tabBarIcon: () => (<Image source={require("./../assets/contact.png")} style={{ width: 20, height: 20 }} />)
                    }} />
                <Tab.Screen name="Cá nhân" component={AccountScreen}
                    initialParams={{ id: idCurrent, name: nameCurrent, user: rootUser }}
                    options={{
                        tabBarIcon: () => (<Image source={require("./../assets/home.png")} style={{ width: 20, height: 20 }} />)
                    }} />
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});