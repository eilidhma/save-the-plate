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

`

const ButText = styled.Text`

`;


const CustMealCard = ({
  text="button"
}) =>{

  return <But>
    <ButText>{text}</ButText>
  </But>
}

export default CustMealCard;