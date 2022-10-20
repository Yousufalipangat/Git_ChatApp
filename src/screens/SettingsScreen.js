import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Icon  from "react-native-vector-icons/MaterialIcons";


export const SettingsScreen = ()=>{

    

    return(
        <View style={{backgroundColor:'white',width:"100%",height:'100%',alignItems:'center'}}>
            <View style={style.header}>
               
            </View>
                <Image style={{width:'100%',height:400, resizeMode:'contain'}} source={{uri:'https://img.freepik.com/premium-vector/business-management-icons-resource-management-recruitment-3d-vector-illustration_365941-586.jpg'}}/>
                <Text style={{color:"#555" ,fontSize:20}}> Settings</Text>

        </View>
    )
}

const style = StyleSheet.create({
    header:{
        width:'100%',
        height:55,
    }
})