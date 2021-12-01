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
  justify-content:center;
  align-items:center;
  position:absolute;
  top:190px;
  width:100%;
`

const EditMenuCont = styled.View`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 15px;
  margin-top: 20px;
  padding-top: 15px;
  padding-bottom: 20px;
`;

export default function RestarantAccount({
  navigation
}) {
  const [data, setData] = useState()
  // console.log(data)
  //USE THIS TO MAP OUT USER DATA

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

  const UserData = async (uid) => {
    const result = await axios.get('/users.php?fuid=' + uid)
    setData(result.data[0])
  }



  return (
    <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>
      
      <TopCont>
        <IconCont >
          <MaterialCommunityIcons name="account" size={60} color="white" />
        </IconCont>
        <Text style={{fontSize:30, fontWeight:'400', color:'white', marginLeft:20}}>{auth.currentUser?.email}</Text>
      </TopCont>
      
      <Cards>
        <PlatesSaved/>
        <InfoCard title="Contact Information" sectiontitle1="Phone number:" sectiontitle2="Address:" phone="604-456-1234" addressline1="3278 W 10th Avenue" addressline2="V6J 2G9 Vancouver, BC" edit="Edit Contact Information"/>

        <EditMenuCont>
          <Text style={{color: "#FE4265", fontSize: 18, fontWeight: 'bold', alignSelf: 'flex-start', paddingLeft:'5%'}} >Menu</Text>
          <But style={styles.shadowProp} width="90%" margintop="10px" height="40px" text="View Menu" onPress={()=>navigation.navigate('Menu')}/>
        </EditMenuCont>

        <But height="40px" width="200px" text="Sign Out" margintop="20px" txtColor="#FE4265" bgColor="#ffffff" onPress={handleSignOut}/>
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