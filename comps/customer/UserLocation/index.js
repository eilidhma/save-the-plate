import React from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput } from 'react-native';
import {
  useFonts,
  Raleway_700Bold,
  Raleway_400Regular,
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300, Quicksand_300Light, Quicksand_400Regular
} from '@expo-google-fonts/quicksand';
import styled from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialIcons, Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';

// #F3AD81

const Cont = styled.View`
  display:flex;
  flex-direction:row;
  width:90%;
  margin-bottom:15px;
`

const UserLocation = ({
  address="V6J 2G9, Vancouver"
}) =>{

  return <Cont>
    <SimpleLineIcons style={{marginRight:5}} name="location-pin" size={18} color="white" />
    <Text style={{fontSize:16, color:'white', fontFamily:'Raleway_400Regular'}}>Meals near <Text>{address}</Text></Text>
  </Cont>
  
  
}

export default UserLocation;