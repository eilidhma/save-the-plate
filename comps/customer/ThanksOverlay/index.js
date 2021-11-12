import React from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable} from 'react-native';
import {
  useFonts,
  Raleway_600Bold,
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300, Quicksand_300Light, Quicksand_400Regular
} from '@expo-google-fonts/quicksand';
import styled from 'styled-components';

const Con = styled.View`
display:flex;
justify-content: center;
align-items: center;
width:310px;
height:293px;
background-color: #fff;
border-radius: 20px;
`

const ConText = styled.Text`
font-size:20px;
font-weight:600;
top:0px;
`;

const ConViewBut = styled.TouchableOpacity`
width: 55%;
height: 29px;
background-color: #FE4265;
display:flex;
border-radius: 20px;
top:-15px;

justify-content: center;
align-items: center;
`;

const ConHomeBut = styled.TouchableOpacity`
width: 55%;
height: 29px;
background-color:#F3AD81;
display:flex;
border-radius: 20px;
bottom:0px;
justify-content: center;
align-items: center;
`;

const ThanksOverlay = ({
  thanks="Thank you for your order!",
  fontSize=20,
  txtColor="white",
  textView="View Order",
  textHome="Home",
  onPress="()=>{}"
}) =>{

  return <Con>
    <ConText fontSize={fontSize}>{thanks}</ConText>
    <Text/>
    <Image style={{width:90, height:80, top:-35}}
    source={require("../../../assets/big-plate.png")}
    />
    <ConViewBut
        onPress={onPress}
        >
        <Text style={{color:txtColor, fontWeight: 'bold'}}>{textView}</Text>
    </ConViewBut>
    <ConHomeBut
        onPress={onPress}
        >
        <Text style={{color:txtColor, fontWeight: 'bold'}}>{textHome}</Text>
    </ConHomeBut>
  </Con>
}

export default ThanksOverlay;