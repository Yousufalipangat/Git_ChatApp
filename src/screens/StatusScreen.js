import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Icon  from "react-native-vector-icons/MaterialIcons";


export const StatusScreen = ()=>{

    

    return(
        <View style={{backgroundColor:'white',width:"100%",height:'100%',alignItems:'center'}}>
            <View style={style.header}>
               
            </View>
                <Image style={{width:'100%',height:400}} source={{uri:'https://img.freepik.com/premium-vector/young-woman-jane-holding-camera-taking-photo-smiling-professional-photographer-cameraman-concept-3d-vector-people-character-illustration_365941-567.jpg'}}/>
                <Text style={{color:"#555" ,fontSize:20}}> Soon this feature will be enabled !!</Text>

        </View>
    )
}

const style = StyleSheet.create({
    header:{
        width:'100%',
        height:55,
    }
})