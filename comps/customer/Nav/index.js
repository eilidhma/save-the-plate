import React from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput } from 'react-native';
import {
  useFonts,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300, Quicksand_300Light, Quicksand_400Regular
} from '@expo-google-fonts/quicksand';
import styled from 'styled-components';

const Cont = styled.View`
  display:flex;
  flex-direction:row;
  width:100%;
  position:absolute;
  bottom:0;
  height:100px;
  border:2px solid white;
`

const Nav = ({
  onPressHome=()=>{},
  onPressOrders=()=>{},
  onPressCart=()=>{},
  onPressAccount=()=>{},
  alignItems="flex-start"
}) =>{

  return <Cont>
    
  </Cont>
  
  
}

export default Nav;