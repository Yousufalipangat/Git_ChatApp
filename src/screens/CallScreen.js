import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Icon  from "react-native-vector-icons/MaterialIcons";


export const CallScreen = ()=>{

    

    return(
        <View style={{backgroundColor:'white',width:"100%",height:'100%',alignItems:'center'}}>
            <View style={style.header}>
               
            </View>
                <Image style={{width:'100%',height:400}} source={{uri:'https://img.freepik.com/premium-vector/book-textbook-with-bookmark-3d-vector-icon-cartoon-minimal-style_365941-675.jpg'}}/>
                <Text style={{color:"#555" ,fontSize:20}}> You dont have any call logs !!</Text>

        </View>
    )
}

const style = StyleSheet.create({
    header:{
        width:'100%',
        height:55,
    }
})