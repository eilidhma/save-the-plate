import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput, StatusBar } from 'react-native';
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
import LottieView from 'lottie-react-native';
import { auth } from './firebase';


// customer pages
import Home from './pages/customer/home';
import Login from './pages/customer/login';
import Orders from './pages/customer/orders';
import Checkout from './pages/customer/checkout';
import Account from './pages/customer/account';
import Signup from './pages/customer/signup';
import Nav from './comps/customer/Nav';
import ThanksOverlay from './comps/customer/ThanksOverlay';
import axios from 'axios';

// INSERT NEW LINK FROM ME HERE

axios.defaults.baseURL = "https://save-the-plate.herokuapp.com/api/"


import RestaurantHome from './pages/restaurant/home';
import RestaurantAccount from './pages/restaurant/account';
import Menu from './pages/restaurant/menu';
import RestaurantNav from './comps/Restaurant/Nav';


var logo = require ('./assets/logo1.png');

const Stack = createNativeStackNavigator();


function Landing({ navigation }) {
  let [fontsLoaded] = useFonts({
    Raleway_700Bold, Quicksand_300Light, Quicksand_400Regular
  });

setTimeout(() => { 
  auth.onAuthStateChanged(user => {
    // console.log(auth.currentUser?.uid)
    if(user) {
      var userID = auth.currentUser?.uid;
      checkIfRestaurant(userID);
    }
    else {
      navigation.navigate('Login')
    }
  });
}, 3010)

const checkIfRestaurant = async (uid) => {
  const result = await axios.get('/users.php?fuid=' + uid)

  if(!result.data.restaurant){
    navigation.navigate('Home')
    return
  }
  
  var page = result.data[0].restaurant;

  if (page === '0')
  {
    navigation.navigate('Home')
  }

  else if (page === '1')
  {
    navigation.navigate('RestaurantHome')
  } 
}


  if (!fontsLoaded) {
    return <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>
  </LinearGradient>;
  } else {
  return (

    <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>
      <Text style={{color:'white', fontFamily:'Raleway_700Bold', fontSize:32}}>SaveThePlate</Text>
      <LottieView
          ref={(ref) => {
            anim = ref;
          }}
          style={{
            width:'100%',
            alignItems:'center'
          }}
          source={require('./assets/logo.json')}
          autoPlay={true}
          loop={false}
        />
    </LinearGradient>
  );
  }
}


function App () {
  const [showNav, setShowNav] = useState(false);

  const [showRestNav, setRestNav] = useState(false)

  const [page, setPage] = useState("Home")

  return (
    <NavigationContainer onStateChange={(state)=>{

      
      const CustomerPageNames = ["Home", "Orders", "Cart", "Account"];

      if(CustomerPageNames.indexOf(state.routes[state.index].name) == -1){
        setPage(0)
      }
      
        if(CustomerPageNames.indexOf(state.routes[state.index].name) !== -1) {
          setShowNav(true)
          if(state.routes[state.index].name === "Home"){
            setPage("Home")
          }
          if(state.routes[state.index].name === "Orders"){
            setPage("Orders")
          }
          if(state.routes[state.index].name === "Cart"){
            setPage("Cart")
          }
          if(state.routes[state.index].name === "Account"){
            setPage("Account")
          }
        }
        else {
          setShowNav(false)
        }
  
      const RestaurantPageNames = ["RestaurantHome", "RestaurantAccount", "Menu"];
        if(RestaurantPageNames.indexOf(state.routes[state.index].name) !== -1) {
          setRestNav(true);
        }
        else {
          setRestNav(false)
        }
      }}>
        <StatusBar barStyle='light-content'/>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Landing" style={{display:'none'}}>
        <Stack.Screen  name="Landing" component={Landing} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="Cart" component={Checkout} />
        <Stack.Screen name="Account" component={Account} />

        <Stack.Screen name="RestaurantHome" component={RestaurantHome}/>
        <Stack.Screen name="RestaurantAccount" component={RestaurantAccount}/>
        <Stack.Screen name="Menu" component={Menu}/>
      </Stack.Navigator>
      {showNav && <Nav page={page}/>}
      {showRestNav && <RestaurantNav/>}

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
