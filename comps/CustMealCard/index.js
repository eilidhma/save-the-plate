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

const CardCont = styled.View`
  display:flex;
  backgroundColor:white;
  width:90%;
  flexDirection:row;
  borderRadius:15px;
`;

const Left = styled.View`
  display:flex;
  backgroundColor:white;
  margin:15px;
  flexDirection:column;
  flex:1;
`

const Right = styled.View`
  display:flex;
  margin:15px;
  flexDirection:column;
  flex:2;
`

const Plates = styled.View`
  display:flex;
  flexDirection:column;
  width:30px;
  justifyContent:center;
  alignItems:center;
`

const CardText = styled.Text`

`;

// var mealImg = require('../../assets/meal.png');

const CustMealCard = ({
  src=require("../../assets/meal.png"),
  plateImg=require("../../assets/plate.png"),
  restaurant="Fratelli's Bistro        ", //fix this
  meal="Fettuccine Alfredo",
  distance="400m",
  plates="217",
  description="fettuccine pasta tossed with Parmesan cheese and butter and served with garlic toast on the side"
}) =>{

  return <CardCont>
    <Left>
      <Image style={{width:115, height:105, borderRadius:15}} source={src}/>
      <Text style={{marginTop:30, fontFamily:'Quicksand_300Light', fontSize:16}}>Restaurant's Rating:</Text>
      <Text style={{marginTop:15, fontFamily:'Quicksand_300Light', fontSize:16}}>Dietary Information:</Text>
    </Left>
    <Right>
      <Text style={{fontFamily:'Raleway_700Bold', fontSize:20}}>{meal}</Text>
      <Text style={{marginTop:8, fontFamily:'Quicksand_300Light', fontSize:14}}>
        {restaurant}
        <Text style={{marginLeft:15}}>{distance}</Text>
      </Text>
      <Plates>
        <Text style={{marginBottom:-10, marginTop:10, color:'#FE4265', fontSize:12}}>{plates}</Text>
        <Image source={plateImg}/>
      </Plates>
      <Text style={{marginTop:8, fontFamily:'Quicksand_300Light', fontSize:12}}>{description}</Text>
    </Right>
  </CardCont>
}

export default CustMealCard;
