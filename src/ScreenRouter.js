import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { ContactScreen } from "./screens/ContactScreen";
import { ChatScreen } from "./screens/ChatScreen";

import { CallScreen } from "./screens/CallScreen";
import { CameraScreen } from "./screens/CameraScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { StatusScreen } from "./screens/StatusScreen";
import  Icon  from "react-native-vector-icons/MaterialIcons";


const Stack = createStackNavigator()
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const gold  = 'rgb(255,142,7)';
const pink  = 'rgb(255,211,215)';
const grey = 'rgb(215,215,215)';

export const ScreenRouter = () => {

    const DrawerList = () => {
        return (
            <Drawer.Navigator
            screenOptions={{
               
                headerStyle:{height:70}
            }}
            >
                <Drawer.Screen
                name="Home"
                component={BottomTabList}
                options={{
                  // headerShown:false,
                    drawerIcon:({focused})=>focused ? <Icon name="home" size={25} color={gold} /> : <Icon name="home" size={24} color="#aaa" />
                }}
                />
                 <Drawer.Screen
                name="StatusScreen"
                component={StatusScreen}
                options={{
                   
                    title:'Status',
                    drawerIcon:({focused})=>focused ? <Icon name="amp-stories" size={25} color={gold} /> : <Icon name="amp-stories" size={24} color="#aaa" />
                }}
                />
                
                 <Drawer.Screen
                name="CallScreen"
                component={CallScreen}
                options={{
                  
                    title:'Call',
                    drawerIcon:({focused})=>focused ? <Icon name="call" size={25} color={gold} /> : <Icon name="call" size={24} color="#aaa" />
                }}
                />
                <Drawer.Screen
                name="CameraScreen"
                component={CameraScreen}
                options={{
                    title:'Camera',
                    drawerIcon:({focused})=>focused ? <Icon name="photo-camera" size={25} color={gold} /> : <Icon name="photo-camera" size={24} color="#aaa" />
                }}
                />
                <Drawer.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    title:'Settings',
                    drawerIcon:({focused})=>focused ? <Icon name="settings" size={25} color={gold} /> : <Icon name="settings" size={24} color="#aaa" />
                }}
                />

            </Drawer.Navigator>
        )
    }

    const BottomTabList = () =>{
        return(
            <BottomTab.Navigator
            screenOptions={{
                headerShown:false,
                tabBarShowLabel:false
            }}
            >
                <BottomTab.Screen
                name="ContactScreen"
                component={ContactScreen}
                options={{
                    tabBarIcon:({focused})=>focused ? <Icon name="contacts" size={25} color={gold} /> : <Icon name="contacts" size={24} color="#aaa" />
                }}
                />
                <BottomTab.Screen
                name="CallScreen"
                component={CallScreen}
                options={{
                    tabBarIcon:({focused})=>focused ? <Icon name="call" size={25} color={gold} /> : <Icon name="call" size={24} color="#aaa" />
                }}
                />
                <BottomTab.Screen
                name="CameraScreen"
                component={CameraScreen}
                options={{
                    tabBarIcon:({focused})=>focused ? <Icon name="photo-camera" size={25} color={gold} /> : <Icon name="photo-camera" size={24} color="#aaa" />
                }}
                />
                <BottomTab.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    tabBarIcon:({focused})=>focused ? <Icon name="settings" size={25} color={gold} /> : <Icon name="settings" size={24} color="#aaa" />
                }}
                />
            </BottomTab.Navigator>
        )
    }

    const StackList = () => {
        return (
            <Stack.Navigator
            screenOptions={{
                headerShown:false
            }}
            >
                <Stack.Screen
                    name="HomeScreen"
                    component={DrawerList} />
                <Stack.Screen
                    name="ChatScreen"
                    component={ChatScreen} />
            </Stack.Navigator>
        )
    }

    return(
        <NavigationContainer>
            <StackList />
        </NavigationContainer>
    )

    

}