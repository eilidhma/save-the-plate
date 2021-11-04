import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useFonts,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300, Quicksand_300Light, Quicksand_400Regular
} from '@expo-google-fonts/quicksand';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styled from 'styled-components';
import Home from './pages/customer/home';
import Login from './pages/customer/login';
import Orders from './pages/customer/orders';
import Checkout from './pages/customer/checkout';
import Account from './pages/customer/account';
import Nav from './comps/customer/Nav';

//pages
import RestaurantHome from './pages/Restaurant/home';

var logo = require ('./assets/logo1.png');

const Stack = createNativeStackNavigator();


function Landing({ navigation }) {
  let [fontsLoaded] = useFonts({
    Raleway_700Bold, Quicksand_300Light, Quicksand_400Regular
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


//


function App () {
  const [showNav, setShowNav] = useState(false);

  return (
    <NavigationContainer onStateChange={(state)=>{
      // console.log(state);
      if(state.index >= 2){
        setShowNav(true)
      } else {
        setShowNav(false)
      }
    }}>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Landing" style={{display:'none'}}>
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="Cart" component={Checkout} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="RestaurantHome" component={RestaurantHome}/>
      
      </Stack.Navigator>
      {showNav && <Nav />}
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
