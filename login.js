import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useFonts,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';

var logo = require ('./assets/logo.png');

export default function Login() {
  let [fontsLoaded] = useFonts({
    Raleway_700Bold,
  });
  if (!fontsLoaded) {
    return <Text>loading</Text>;
  } else {
  return (
    <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>
      <Text style={{color:'white', fontFamily:'Raleway_700Bold', fontSize:32}}>SaveThePlate</Text>
      <Image style={{width:50, height:50, marginTop:5}} source={logo}/>
      <Button>Login</Button>
    </LinearGradient>
    
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

