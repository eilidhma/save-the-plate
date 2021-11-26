import React from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useFonts,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300, Quicksand_300Light
} from '@expo-google-fonts/quicksand';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styled from 'styled-components';
import { Feather, MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import PlatesSaved from '../../comps/customer/PlatesSaved';
import InfoCard from '../../comps/customer/InfoCard';
import { auth } from '../../firebase';


var logo = require ('../../assets/logo1.png');
const Stack = createNativeStackNavigator();

const TopCont = styled.Pressable`
  display:flex;
  flex-direction:row;
  width:90%;
  justify-content:flex-start;
  align-items:center;
  position:absolute;
  top:80px;
`

const IconCont = styled.Pressable`
  display:flex;
  border-radius:100px;
  border:2px solid white;
  width:100px;
  height:100px;
  justify-content:center;
  align-items:center;
`

const Cards = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
  position:absolute;
  top:190px;
  width:100%;
`

export default function Checkout({
  navigation,
  user="John Smith"
}) {

  const EditContact = () => {

  }

  const EditCard = () => {
    
  }

  const handleSignOut = () => {
    auth
    .signOut()
    .then(()=> {
      navigation.replace('Login')
      console.log('Logged out');
    })
    .catch(error => alert(error.message))
  }


  return (
    <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>
      <TopCont>
        <IconCont>
          <MaterialCommunityIcons name="account" size={60} color="white" />
        </IconCont>
      <Text style={{fontSize:30, fontWeight:'400', color:'white', marginLeft:20}}>{auth.currentUser?.email}</Text>
      </TopCont>
      <Cards>
        <PlatesSaved/>
        <InfoCard onPress={EditContact} title="Contact Information" sectiontitle1="Phone number:" sectiontitle2="Address:" phone="604-315-3122" addressline1="1798 Granville Street" addressline2="V6J 3F2" edit="Edit Contact Information"/>
        <InfoCard onPress={EditCard} title="Payment Information" sectiontitle1="Card Number:" sectiontitle2="Expiration Date:" cvc="CVC" phone="**** **** **** 8954" addressline1="**/**" addressline2="***" edit="Edit Credit Card Information"/>
        <Pressable style={styles.whiteButton} title="< Back" onPress={handleSignOut} >
          <Text style={{fontSize:18, color:'#E94168'}}>Sign Out</Text>
        </Pressable>
      </Cards>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor:'#F3AE81',
    width:200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    padding:5,
    borderRadius:20,
  },
  whiteButton: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor:'white',
    width:200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    padding:5,
    borderRadius:20,
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
