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

const But = styled.Button`
display:flex;
width:25%;
`

const ButText = styled.Text`
font-family:'Quicksand_400Regular
`;


const But = ({
  text="button",
  fontSize=18
}) =>{

  return <But>
    <ButText fontSize={fontSize}>{text}</ButText>
  </But>
}

export default But;