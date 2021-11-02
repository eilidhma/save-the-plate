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
  flex-direction:column;
  width:100%;

`

const TopCont = styled.View`
  display:flex;
  flex-direction:row;
  alignItems:center;
  justifyContent:center;
  flexDirection:row;
  width:100%;
  borderColor:black;
`

const TitlesCont = styled.Pressable`
  display:flex;
  justify-content:center;
  align-items:center;
  flex:1;
`

const Titles = styled.Text`
  color:white;
  font-size:26px;
  paddingLeft:10%;
  paddingRight:10%;
  font-weight:${props=>props.fontWeight},
  text-align:center;
`

const SliderCont = styled.View`
  display:flex;
  align-items:${props=>props.alignItems};
  justify-content:flex-start;
  width:100%;
  margin-bottom:30px;
`
const Slider = styled.View`
  width:50%;
  height:2px;
  background-color:white;
  border-radius:50px;
  margin-top:5px;
`

const Tabs = ({
  fontWeightMeals=400,
  fontWeightMap=200,
  onPressMeal=()=>{},
  onPressMap=()=>{},
  alignItems="flex-start"
}) =>{

  return <Cont>
    <TopCont >
    <TitlesCont onPress={onPressMeal}><Titles fontWeight={fontWeightMeals}>Meals</Titles></TitlesCont>
    <TitlesCont onPress={onPressMap}><Titles fontWeight={fontWeightMap}>Map</Titles></TitlesCont>
  </TopCont>
  <SliderCont alignItems={alignItems}>
    <Slider></Slider>
  </SliderCont>
  </Cont>
  
  
}

export default Tabs;
