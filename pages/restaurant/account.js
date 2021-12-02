import React, { useEffect, useState } from 'react';
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
import styled from 'styled-components';
import { auth } from '../../firebase';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import PlatesSaved from '../../comps/customer/PlatesSaved';
import InfoCard from '../../comps/Restaurant/InfoCard';
import But from '../../comps/global/Button';
import axios from 'axios';

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
  justify-content:space-between;
  align-items:center;
  position:absolute;
  top:190px;
  width:100%;
  height: 60%;
`

const EditMenuCont = styled.View`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 20px;
`;

export default function RestarantAccount({
  navigation
}) {
  const [name, setName] = useState()
  const [phone, setPhone] = useState()
  const [platesSaved, setPlatesSaved] = useState()
  const [address1, setAddress1] = useState()
  const [address2, setAddress2] = useState()
  const [postalCode, setPostalCode] = useState()
  const [city, setCity] = useState()
  const [province, setProvince] = useState()

  const UserData = async (uid) => {
    const result = await axios.get('/users.php?fuid=' + uid)
    setName(result.data[0].full_name)
    setPhone(result.data[0].phone)
    setPlatesSaved(result.data[0].plates_saved)
    setAddress1(result.data[0].add1)
    setAddress2(result.data[0].add2)
    setPostalCode(result.data[0].postal_code)
    setCity(result.data[0].city)
    setProvince(result.data[0].province)
  }


  useEffect(()=>{
    var userid = auth.currentUser?.uid
    UserData(userid);
  }, []);

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
        <IconCont >
          <MaterialCommunityIcons name="account" size={60} color="white" />
        </IconCont>
      <Text style={{fontSize:30, fontWeight:'400', color:'white', marginLeft:20}}>{name}</Text>
      </TopCont>
      <Cards>
        <PlatesSaved quantity={platesSaved}/>
        <InfoCard title="Contact Information" sectiontitle1="Phone number:" sectiontitle2="Address:" phone={phone} addressline1={address1 + " " + address2} addressline2={postalCode + " " + city + ", " + province} edit="Edit Contact Information"/>


        <But text="Banking Information" margintop="10px" bgColor="#F3AD81"/>


        <But text="View & Edit Menu" margintop="10px" bgColor="#F3AD81" onPress={()=>navigation.navigate('Menu')}/>
        <But text="Sign Out" margintop="10px" txtColor="#FE4265" bgColor="#ffffff" onPress={handleSignOut}/>
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