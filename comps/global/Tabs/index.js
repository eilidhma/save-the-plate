import React from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput } from 'react-native';
import {
  useFonts,
  Raleway_700Bold,
  Raleway_400Regular,
  Raleway_600SemiBold
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
  align-items:center;
  justify-content:center;
  flex-direction:row;
  width:100%;
  border-color:black;
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
  padding-left:10%;
  padding-right:10%;
  font-family:${props=>props.fontFamily};;
  text-align:center;
`

const SliderCont = styled.View`
  display:flex;
  align-items:${props=>props.alignItems};
  justify-content:flex-start;
  width:100%;
  margin-bottom:15px;
`
const Slider = styled.View`
  width:50%;
  height:2px;
  background-color:white;
  border-radius:50px;
  margin-top:5px;
`

const Tabs = ({
  fontFamilyMeals='Raleway_600SemiBold',
  fontFamilyMap='Raleway_300Light',
  onPressMeal=()=>{},
  onPressMap=()=>{},
  alignItems="flex-start"
}) =>{

  return <Cont>
    <TopCont >
    <TitlesCont onPress={onPressMeal}><Titles fontFamily={fontFamilyMeals}>Orders</Titles></TitlesCont>
    <TitlesCont onPress={onPressMap}><Titles fontFamily={fontFamilyMap}>Listed</Titles></TitlesCont>
  </TopCont>
  <SliderCont alignItems={alignItems}>
    <Slider></Slider>
  </SliderCont>
  </Cont>
  
  
}

export default Tabs;

