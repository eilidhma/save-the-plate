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
import { useEffect } from 'react';
import { useState } from 'react';
import { auth } from '../../firebase';

var logo = require ('../../assets/logo1.png');
const Stack = createNativeStackNavigator();


export default function Login({ navigation }) {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user) {
        navigation.navigate('Home')
      } 
    })
  }, [])

  const handleLogin = () => {
    auth
    .signInWithEmailAndPassword(email,password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Logged in with', user.email);
    })
    .catch(error => alert(error.message))
  }

  return (
    <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>
      <Text style={{color:'white', fontFamily:'Raleway_700Bold', fontSize:32}}>SaveThePlate</Text>
      <Image style={{width:70, height:70, marginTop:5}} source={logo}/>
      <TextInput value={email} onChangeText={text=>setEmail(text)} autoCompleteType={'username'} style={styles.username} placeholder={'email'} textAlign={'center'} textContentType={'username'}/>
      <TextInput secureTextEntry value={password} onChangeText={text=>setPassword(text)} autoCompleteType={'password'} style={styles.username} placeholder={'password'} textAlign={'center'} textContentType={'password'}/>
      <Pressable style={styles.shadowProp} title="Login"
        onPress={handleLogin} >
        <Text style={{color:'white', fontFamily:'Quicksand_400Regular', fontSize:18}}>Login</Text>
      </Pressable>
      <Pressable style={styles.shadowProp} title="Signup"
        onPress={() => navigation.navigate('Signup')} >
        <Text style={{color:'white', fontFamily:'Quicksand_400Regular', fontSize:18}}>Sign Up</Text>
      </Pressable>
     
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