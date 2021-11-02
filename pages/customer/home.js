import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button, Pressable, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300, Quicksand_300Light, Quicksand_400Regular
} from '@expo-google-fonts/quicksand';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styled from 'styled-components';
import CustMealCard from '../../comps/customer/CustMealCard';
import Tabs from '../../comps/customer/Tabs';
import Location from '../../comps/customer/Location';


export default function Home({navigation}) {

  const [mealtab, setMealTab] = useState(true)
  const [maptab, setMapTab] = useState(false)

  const HandleMealTab = () => {
    if(mealtab === false){
      setMealTab(true)
      setMapTab(false)
    } 
  }

  const HandleMapTab = () => {
    if(maptab === false){
      setMapTab(true)
      setMealTab(false)
    } 
  }

  return (
    <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>
      <View style={{width:'100%', position:"absolute", top:80, display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Tabs onPressMeal={HandleMealTab} onPressMap={HandleMapTab}
          fontWeightMeals={mealtab ? 400 : 200}
          fontWeightMap={maptab ? 400 : 200}
          alignItems={mealtab ? "flex-start" : "flex-end"}
          />
          <View style={{width:'90%'}}>
            <Location />
          </View>
      </View>
      {mealtab === true && <View style={{display:'flex', justifyContent:'center', alignItems:'center', overflow:'hidden'}}>
        <CustMealCard />
        <CustMealCard />
        <CustMealCard />
      </View>}
      {/* <Pressable style={styles.shadowProp} title="Login"
        onPress={() => navigation.navigate('Login')} >
        <Text style={{color:'white', fontFamily:'Quicksand_300Light', fontSize:18}}>Login</Text>
      </Pressable> */}
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
    backgroundColor:'#FF1A44',
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

