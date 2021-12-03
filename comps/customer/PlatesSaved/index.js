import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput } from 'react-native';
import styled from 'styled-components';
import { Feather, MaterialIcons, Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';


var plate = require('../../../assets/plate.png')

const CardCont = styled.View`
  display:flex;
  backgroundColor:white;
  width:90%;
  flexDirection:${props=>props.flexDirection};
  borderRadius:15px;
  overflow:hidden;
  height:60px;
  margin-top:10px;
  justify-content:center;
  align-items:center;
`;

const PlateCont = styled.View`
  display:flex;
  flex-direction:column;
  height:40px;
  justify-content:center;
  align-items:center;
  margin-right:5px;
`

const Quantity = styled.Text`
  marginBottom:0;
  fontSize:${props=>props.fontSize};
  color:#FE4265;
  text-align:center;
  font-family:'Raleway_700Bold';
`

const Plates = styled.Text`
  fontSize:${props=>props.fontSize};
  color:#FE4265;
  text-align:center;
  font-family:'Raleway_700Bold';
  margin-left:5px;
`




const PlatesSaved = ({
  quantity="178",
  flexDirection="row",
  fontSize="20px",
  width=60,
  height=15
}) =>{

  return <CardCont flexDirection={flexDirection}>
    <PlateCont>
      <Quantity fontSize={fontSize}>{quantity}</Quantity>
      <Image style={{marginTop:5, width:width, height:height}} source={plate}></Image>
    </PlateCont>
    <Plates fontSize={fontSize}>plates saved!</Plates>
  </CardCont>
}

export default PlatesSaved;


