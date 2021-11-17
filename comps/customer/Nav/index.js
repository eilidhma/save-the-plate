import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput } from 'react-native';
import {
  useFonts,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300, Quicksand_300Light, Quicksand_400Regular
} from '@expo-google-fonts/quicksand';
import styled from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Cont = styled.Pressable`
  display:flex;
  flex-direction:row;
  width:100%;
  position:absolute;
  bottom:0;
  height:100px;
  border-color:white;
  border-top-width:2px;
  background-color:#FE4265;
  z-index:5;
`

const IconCont = styled.Pressable`
  display:flex;
  border-radius:20px;
  border:2px solid white;
  width:50px;
  height:50px;
  justify-content:center;
  align-items:center;
  background-color:${props=>props.backgroundColor};
`

const Nav = ({ 
  home="white",
  orders="white",
  cart="white",
  account="white",
  page
}) =>{

  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  const [nav, setNav] = useState(0)

const onPressHome=()=>{
  navigation.navigate('Home')
}
const onPressOrders=()=>{
  navigation.navigate('Orders')
}
const onPressCart=()=>{
  navigation.navigate('Cart')
}
const onPressAccount=()=>{
  navigation.navigate('Account')
}
  
  return <Cont >
    <LinearGradient style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-evenly', alignItems:'center'}} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(243,173,129)', 'rgba(243,173,129,0.5)', 'rgb(243,173,129)']}>
    <IconCont onPress={onPressHome} backgroundColor={page === "Home" ? "rgba(250,250,250,0.3)" : "rgba(250,250,250,0)"}>
      <Feather name="home" size={24} color={home} />
    </IconCont>
    <IconCont onPress={onPressOrders} backgroundColor={page === "Orders" ? "rgba(250,250,250,0.3)" : "rgba(250,250,250,0)"}>
      <MaterialIcons name="restaurant-menu" size={24} color={orders} />
    </IconCont>
    <IconCont onPress={onPressCart} backgroundColor={page === "Cart" ? "rgba(250,250,250,0.3)" : "rgba(250,250,250,0)"}>
      <Ionicons name="cart-outline" size={24} color={cart} />
    </IconCont>
    <IconCont onPress={onPressAccount} backgroundColor={page === "Account" ? "rgba(250,250,250,0.3)" : "rgba(250,250,250,0)"}>
      <MaterialCommunityIcons name="account-outline" size={24} color={account} />
    </IconCont>

  </LinearGradient>
  </Cont>
  
  
}

export default Nav;