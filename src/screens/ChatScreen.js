import React, { useEffect, useState } from "react";
import {

    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    Image,
    ImageBackground,

} from 'react-native';

import firestore from "@react-native-firebase/firestore";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";

const gold = 'rgb(255,142,7)';
const pink = 'rgb(255,211,215)';
const grey = 'rgb(215,215,215)';

export const ChatScreen = ({ route }) => {

    const [messageText, setmessageText] = useState();
    const { sender, receiverData, chatRoomID } = route.params;
    const [messageList, setmessageList] = useState([])
    const [onLongPress, setonLongPress] = useState(false);
    const [longPressMessageID,setlongPressMessageID] = useState()
    const [modify,setmodify] =useState(false);
    const navigation = useNavigation();
    useEffect(() => {
        // fetchData()

        let subscriber = firestore().collection('ChatRooms').doc(chatRoomID).collection('Messages').orderBy('timeStamp').onSnapshot((docs) => {
            setmessageList([])
            docs.forEach((doc) => {
                //  console.log(doc.data());
                setmessageList((prev) => (
                    [...prev, doc.data()]
                )
                )
            })
        })

        return () => subscriber();
    }, [])

    const createMessageTemplate = (key) => {
        return {
            messageID: key,
            messageText: messageText,
            timeStamp: firestore.FieldValue.serverTimestamp(),
            sender: sender,
            receiver: receiverData.phoneNumber,

        }
    }

    const sendMessage = () => {

        if (messageText) {
            if(onLongPress && modify){
                firestore().collection('ChatRooms').doc(chatRoomID).collection('Messages').doc(longPressMessageID).update({messageText:messageText})
                setmessageText("")
                setonLongPress(false)
                setlongPressMessageID("")
                setmodify(false)

            }
            else{
            let key = firestore().collection('ChatRooms').doc(chatRoomID).collection('Messages').doc().id
            let message = createMessageTemplate(key)
            firestore().collection('ChatRooms').doc(chatRoomID).collection('Messages').doc(key).set(message)
            setmessageText("")
            }
        }
    }

    
    const deleteMessage = ()=>{
        if (messageText) {
            if(onLongPress){
                firestore().collection('ChatRooms').doc(chatRoomID).collection('Messages').doc(longPressMessageID).delete()
                setmessageText("")
                setonLongPress(false)
                setlongPressMessageID("")

            }
    }}

    const fetchData = async () => {

        await firestore().collection('ChatRooms').doc(chatRoomID).collection('Messages').orderBy('timeStamp').get().then((docsnap) => {
            setmessageList([])
            docsnap.forEach((doc) => {

                setmessageList((prev) => ([...prev, doc.data()]))
                setmessageText("")
            })


        })


    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Icon name="arrow-back" size={25} onPress={() => { navigation.goBack() }} />
                <Entypo name="dots-three-vertical" size={20} />
            </View>
                <View style={style.upperProfile}>
                    <Image source={{ uri: receiverData.avatar }} style={{ height: 65, width: 65, borderRadius: 30, marginVertical: 8 }} />
                    <View style={{ justifyContent: 'center', marginHorizontal: 10 }}>
                        <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>{receiverData.name}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="access-time" size={18} color='green' />
                            <Text style={{ color: 'green', marginHorizontal: 10 }}>Online</Text>
                        </View>
                    </View>
            {onLongPress === true ?
                    <View style={{ flexDirection: "row", flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Icon name="delete" size={24} style={{ marginHorizontal: 15 }} onPress={()=>{deleteMessage()}}/>
                        <Entypo name="pencil" size={24} style={{ marginHorizontal: 15 }} onPress={()=>{setmodify(true)}}/>
                        <Icon name="cancel" size={24} style={{ marginHorizontal: 15 }} onPress={()=>{setonLongPress(false);setmodify(false);setmessageText("")}}/>
                    </View>
            
                    :
                    <View style={{ flexDirection: "row", flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Icon name="call" size={24} style={{ marginHorizontal: 15 }} />
                        <Icon name="chat" size={24} style={{ marginHorizontal: 15 }} />
                   
                    </View>

                    }

</View>

            <View style={{ width: '100%', flex: 1 }}>
                <ImageBackground style={{ width: '100%', flex: 1, paddingBottom: 5 }} source={{ uri: "https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg" }}>
                    <FlatList showsVerticalScrollIndicator={false}
                        style={{ flex: 1, paddingHorizontal: 15, paddingTop: 10 }}
                        data={messageList}
                        renderItem={({ item }) => (
                            <View style={{ width: '100%' }} >
                                {item.sender === sender ?
                                    <View style={[style.senderText,onLongPress && longPressMessageID == item.messageID ? {backgroundColor:'lightblue'}:{backgroundColor:pink}]}>
                                        <Text onLongPress={() => {
                                            setonLongPress(true);
                                            setlongPressMessageID(item.messageID);


                                            setmessageText(item.messageText)}}
                                            
                                            
                                            style={{ color: '#333' }}>{item.messageText}</Text>
                                        <View>
                                            <Text>{"17:30"}</Text>
                                        </View>
                                    </View>
                                    :
                                    <View on style={style.receiverText}>
                                        <Text style={{ color: '#333' }}>{item.messageText}</Text>
                                        <View>
                                            <Text>{"5:20"}</Text>
                                        </View>
                                    </View>

                                }
                            </View>

                        )}

                    />
                </ImageBackground>


            </View>
            <View style={style.messageBar}>
                <Entypo name="attachment" size={24} />
                <View style={{ flexDirection: 'row', backgroundColor: '#eee', borderRadius: 20, flex: 1, marginHorizontal: 10, paddingHorizontal: 10, alignItems: 'center' }}>
                    <TextInput editable={!onLongPress && !modify || onLongPress && modify} value={(onLongPress && modify) || (!onLongPress && !modify)? messageText :""} onChangeText={(text) => { setmessageText(text) }} placeholder="Messages..." style={{ flex: 1, paddingHorizontal: 15, marginHorizontal: 1 }} />
                    <Icon name="mic" size={28} />
                </View>
                <Icon name="send" size={28} onPress={() => { sendMessage() }} />

            </View>
        </View>
    )

}

const style = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',

    }
    ,
    header: {
        flexDirection: 'row',
        paddingVertical: 15,
        justifyContent: 'space-between',
        paddingHorizontal: 15

    },
    upperProfile: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 15
    },
    messageBar: {
        flexDirection: 'row',
        alignItems: 'center', height: 80,
        backgroundColor: 'rgb(250,250,250)',
        paddingHorizontal: 15
    },
    senderText: {
        minWidth: '30%',
        maxWidth: '80%',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        backgroundColor: pink,
        marginVertical: 5,
        padding: 10,
        borderRadius: 15
    },
    receiverText: {
        minWidth: '30%',
        maxWidth: '80%',
        alignSelf: 'flex-start',
        backgroundColor: grey,
        marginVertical: 5,
        padding: 10,
        borderRadius: 15

    }
})