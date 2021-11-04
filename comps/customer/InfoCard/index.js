import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput } from 'react-native';
import {
  useFonts,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300, Quicksand_300Light, Quicksand_400Regular
} from '@expo-google-fonts/quicksand';
import styled from 'styled-components';
import { Feather, MaterialIcons, Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';


const CardCont = styled.View`
  
`;

const Content = styled.View`
  width:80%;
  display:flex;
  padding-right:20px;
  padding-left:20px;
  padding-top:10px;
  padding-bottom:10px;
  flex-direction:column;
`
const Section = styled.View`
  display:flex;
  flex-direction:row;
`

const Title = styled.Text`
  font-size:20px;
  font-weight:500;
  color:#FE4265;
  margin-bottom:5px;
`

const Edit = styled.Pressable`
  display:flex;
  background-color:#F3AD81;
  position:absolute;
  bottom:0;
  width:100%;
  z-index:10;
  justify-content:center;
  align-items:center;
  height:30px;
`


const EditText = styled.Text`
  color:white;
  font-size:16px;
  font-weight:500;
`

// var mealImg = require('../../assets/meal.png');

const InfoCard = ({
  edit="edit info",
  title="Title",
  sectiontitle1="section1",
  sectiontitle2="section2",
  phone="phone number",
  addressline1="address line 1",
  addressline2="address line 2",
  cvc="",
  onPress=()=>{}
}) =>{

  return <CardCont style={styles.shadowProp}>
    <Edit onPress={onPress}>
      <EditText>{edit}</EditText>
    </Edit>
    <Content>
      <Title>{title}</Title>
      <Section>
        <Text style={{width:120, fontSize:16, fontWeight:'300', marginTop:10}}>{sectiontitle1}</Text><Text style={{fontSize:16, fontWeight:'200', marginTop:10, marginLeft:5}}>{phone}</Text>
      </Section>
      <Section>
        <Text style={{width:120, fontSize:16, fontWeight:'300', marginTop:10}}>{sectiontitle2}</Text><Text style={{fontSize:16, fontWeight:'200', marginTop:10, marginLeft:5}}>{addressline1}</Text>
      </Section>
      <Section>
        <Text style={{width:120, fontSize:16, fontWeight:'300', marginTop:10}}>{cvc}</Text><Text style={{fontSize:16, fontWeight:'200', marginTop:10, marginLeft:5}}>{addressline2}</Text>
      </Section>
    </Content>
  </CardCont>
}

export default InfoCard;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadowProp: {
    display:'flex',
    backgroundColor:'white',
    width:'90%',
    flexDirection:'column',
    borderRadius:15,
    overflow:'hidden',
    height:170,
    marginTop:10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  username: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor:'#FFF',
    width:200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    padding:5,
    borderRadius:20,
    fontFamily:'Quicksand_300Light', 
    fontSize:16
  }
});