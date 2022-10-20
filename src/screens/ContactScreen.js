import React, { useEffect, useState } from "react";
import {

    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    ScrollView,
    FlatList,
    Image,
    TouchableOpacity,
    Alert,

} from 'react-native';

import firebase from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const gold = 'rgb(255,142,7)';
const pink = 'rgb(255,211,215)';
const grey = 'rgb(215,215,215)';

import { contacts } from '../contactList'

export const ContactScreen = () => {

    const navigation = useNavigation()

    const [sender, setsender] = useState("+918606884012")
    const [receiverData, setreceiverData] = useState()
    // const [contactList,setcontactList] = useState();
    const [snapshot, setsnapshot] = useState()

    useEffect(() => {
       
        if (receiverData) {
            checkUser()
            .then((validReceiver) => {
                if (validReceiver) {
                    checkChatRoom().then(hasValidChatRoom=>{
                        if (!hasValidChatRoom) {
                          createChatRoom()
                        }

                    })
                }
                else {
                    Alert.alert('info', "User doesn't have an account")
                }
            })
        }

        return ()=>{true}

    }, [receiverData])

    useEffect(() => {
      //  console.log(snapshot)
    }, [snapshot])

    const checkUser = async () => {
        
        try {
            let validUser = await firebase().collection('Users').doc(receiverData.phoneNumber).get()
        
            if (validUser.exists && receiverData.phoneNumber !== sender) {
                
                return validUser.data().userExist
            } else {

                return false
            }

        } catch (e) {
            console.log(String(e))
        }
    }

    const checkChatRoom = async () => {
        let receiver = receiverData.phoneNumber;
        let key1 = `[${sender}]-[${receiver}]`;
        let key2 = `[${receiver}]-[${sender}]`;
        let chatRoomID = undefined;
        await firebase().collection('ChatRooms').doc(key1).get().then((snap) => {
            if (snap.exists) { ({ chatRoomID } = snap.data()) }
        })
        if (chatRoomID) {
            navigation.navigate('ChatScreen', { chatRoomID: chatRoomID, sender: sender, receiverData: receiverData })
            setreceiverData("")
            return true
        }
        else {

            await firebase().collection('ChatRooms').doc(key2).get().then((snap) => {
                if (snap.exists) { ({ chatRoomID } = snap.data()) }
                
            
            })


            if (chatRoomID) {
                navigation.navigate('ChatScreen', { chatRoomID: chatRoomID, sender: sender, receiverData: receiverData })
                setreceiverData("")
                return true
            }
            else{

                return false
            }
        }


    }

    const createChatRoom = async () => {

            Alert.alert('info','creating chat with a new person')
            let receiver = receiverData.phoneNumber;
            let key = `[${sender}]-[${receiver}]`;
            await firebase().collection('ChatRooms').doc(key).set({ chatRoomID: key }).
                then(() => { 
                    navigation.navigate('ChatScreen', { chatRoomID: key, sender: sender, receiverData:receiverData }) })
                .catch((e) => { console.log(e) })

    }



    return (
        <View style={style.container}>
            <Text style={{ fontSize: 27, fontWeight: 'bold', color: 'black', }}>Contacts</Text>

            <View style={style.searchbar}>
                <Icon name="search" size={25} style={{ marginHorizontal: 15 }} />
                <TextInput style={{ fontSize: 18 }} placeholder="Search for Contacts" />
            </View>

            <View style={style.filterbar}>
                <Icon name="person-add" size={25} color={gold} />
                <Text style={{ color: gold, marginHorizontal: 15, fontSize: 18, fontWeight: 'bold' }}>Add contact</Text>

                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                    <Icon style={{ marginHorizontal: 5 }} name="sort-by-alpha" size={25} />
                    <Icon style={{ marginHorizontal: 5 }} name="filter-list" size={25} />
                </View>

            </View>

            <FlatList
                data={contacts}
                // keyExtractor={({ item }) =>  item.phoneNumber }
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={style.listItem}
                            onPress={() => {
                                setreceiverData(item)
                            }}

                        >
                            <Image source={{ uri: item.avatar }} style={{ height: 65, width: 65, borderRadius: 30, marginVertical: 8 }} />
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>{item.name}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="access-time" size={18} color='green' />
                                    <Text style={{ color: 'green', marginHorizontal: 10 }}>Online</Text>
                                </View>
                            </View>

                        </TouchableOpacity>
                    )
                }}

            />


        </View>
    )

}

const style = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 30,
        paddingTop: 15

    },
    searchbar: {
        width: '100%',
        height: 50,
        backgroundColor: '#eee',
        marginVertical: 15,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',

    },
    filterbar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20
    },
    listItem: {
        flexDirection: 'row'

    }
})