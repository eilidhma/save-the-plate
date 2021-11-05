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
import CustMealCard from './comps/CustMealCard';

//pages
import RestaurantHome from './pages/restaurant/RestaurantHome'
import ThanksOverlay from './comps/customer/ThanksOverlay';

var logo = require ('./assets/logo1.png');

const Stack = createNativeStackNavigator();


function Landing({ navigation }) {
  let [fontsLoaded] = useFonts({
    Raleway_700Bold, Quicksand_300Light
  });

  setTimeout(() => { 
    navigation.navigate('Login')
  }, 4000)

  if (!fontsLoaded) {
    return <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>
  </LinearGradient>;
  } else {
  return (

    <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>
      <Text style={{color:'white', fontFamily:'Raleway_700Bold', fontSize:32}}>SaveThePlate</Text>
      <Image style={{width:100, height:100, marginTop:20}} source={logo}/>
    </LinearGradient>
  );
  }
}

// Eilidh's section - customer UI

function Login({ navigation }) {
  return (
    <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>
      <Text style={{color:'white', fontFamily:'Raleway_700Bold', fontSize:32}}>SaveThePlate</Text>
      <Image style={{width:70, height:70, marginTop:5}} source={logo}/>
      <TextInput/>
      <TextInput autoCompleteType={'username'} style={styles.username} placeholder={'username'} textAlign={'center'} textContentType={'username'}/>
      <TextInput autoCompleteType={'password'} style={styles.username} placeholder={'password'} textAlign={'center'} textContentType={'password'}/>
      <Pressable style={styles.shadowProp} title="Login"
        onPress={() => navigation.navigate('Home')} >
        <Text style={{color:'white', fontFamily:'Quicksand_300Light', fontSize:18}}>Login</Text>
      </Pressable>
    </LinearGradient>
  );
}

function Home() {
  return (
    <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>
      <CustMealCard />
      
    </LinearGradient>
  );
}

//


function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Landing" style={{display:'none'}}>
        <Stack.Screen name="Landing" component={Landing}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="RestaurantHome" component={RestaurantHome}/>
      </Stack.Navigator>
    </NavigationContainer>
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

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center' 
  }
});

export default App
