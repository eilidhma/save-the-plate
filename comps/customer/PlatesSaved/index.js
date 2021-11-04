import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput } from 'react-native';
import styled from 'styled-components';
import { Feather, MaterialIcons, Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';

var plate = require('../../../assets/plate.png')

const CardCont = styled.View`
  display:flex;
  backgroundColor:white;
  width:90%;
  flexDirection:row;
  borderRadius:15px;
  overflow:hidden;
  height:100px;
  margin-top:10px;
  justify-content:center;
  align-items:center;
`;

const PlateCont = styled.View`
  display:flex;
  flex-direction:column;
  height:80px;
  justify-content:center;
  align-items:center;
  margin-right:5px;
`

const Quantity = styled.Text`
  marginBottom:0;
  fontSize:25px;
  color:#FE4265;
  text-align:center;
  font-weight:700;
`

const Plates = styled.Text`
  fontSize:25px;
  color:#FE4265;
  text-align:center;
  font-weight:700;
  margin-left:5px;
`




const PlatesSaved = ({
  quantity="178",
}) =>{

  return <CardCont>
    <PlateCont>
      <Quantity>{quantity}</Quantity>
      <Image style={{width:100, height:25}} source={plate}></Image>
    </PlateCont>
    <Plates>plates saved!</Plates>
  </CardCont>
}

export default PlatesSaved;


