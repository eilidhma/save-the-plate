import React from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput, ScrollView } from 'react-native';
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

import { MaterialCommunityIcons } from '@expo/vector-icons';
import PlatesSaved from '../../comps/customer/PlatesSaved';
import InfoCard from '../../comps/customer/InfoCard';
import But from '../../comps/global/Button';

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
  justify-content:flex-start;
  align-items:center;
  position:absolute;
  top:190px;
  width:100%;
`

const EditMenuCont = styled.View`
  width: 90%;
  height: 387px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 15px;
  margin-top: 10px;
  padding-right:20px;
  padding-left:20px;
  padding-top:10px;
  overflow: hidden;
`;

const AddItemCont = styled.View`
    width: 130%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0px;
`

export default function Menu({
  restaurant="Fratelli's Bistro",
  navigation
}) {

  return (
    <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>
      <TopCont>
        <IconCont >
          <MaterialCommunityIcons name="account" size={60} color="white" />
        </IconCont>
      <Text style={{fontSize:30, fontWeight:'400', color:'white', marginLeft:20}}>{restaurant}</Text>
      </TopCont>


      <Cards>
        <EditMenuCont>
        <Text style={{color: "#FE4265", fontSize: 18, fontWeight: 'bold', alignSelf: 'flex-start'}} >Menu</Text>

        <View style={{width: '100%'}}>
            <ScrollView contentContainerStyle={{width: '100%', alignItems:'center'}}>
                <But width="100%" height="50px" text="Fettucini Alfredo" margintop="10px"/>
                <But width="100%" height="50px" text="Spaghetti Bolognese" margintop="10px"/>
                <But width="100%" height="50px" text="Lasagna" margintop="10px"/>
                <But width="100%" height="50px" text="Meatballs" margintop="10px"/>
                <But width="100%" height="50px" text="Ravioli" margintop="10px"/>
                <But width="100%" height="50px" text="Roasted Vegetables" margintop="10px"/>
                <But width="100%" height="50px" text="Gnochi" margintop="10px"/>
            </ScrollView>
        </View>

        <AddItemCont>
            <But width="100%" height="40px" text="New Item" bgColor="#F3Ad81" borderRadius="0px"/>
        </AddItemCont>
        </EditMenuCont>

        <But text="Save Changes" margintop="10px" bgColor="#F3AD81"/>
        <But text="< Back" margintop="10px" txtColor="#FE4265" bgColor="#ffffff" onPress={()=>navigation.goBack()}/>
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