import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button, Pressable, TextInput,  SafeAreaView, Modal, Platform, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialIcons, Ionicons, MaterialCommunityIcons, SimpleLineIcons, AntDesign } from '@expo/vector-icons';

import {
  useFonts,
  Raleway_700Bold,
  Raleway_400Regular,
  Raleway_300Light
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300, Quicksand_300Light, Quicksand_400Regular,
  Quicksand_700Bold
} from '@expo-google-fonts/quicksand';

import { NavigationContainer, useFocusEffect} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styled from 'styled-components';
import CustMealCard from '../../comps/customer/CustMealCard';
import Tabs from '../../comps/customer/Tabs';
import UserLocation from '../../comps/customer/UserLocation';

import MapView, { Callout } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Filters from '../../comps/customer/Filters';
import CustCurrentOrder from '../../comps/customer/CustCurrentOrder';
import SimpleOrderCard from '../../comps/customer/SimpleOrderCard';
import Nav from '../../comps/customer/Nav';
import * as Location from 'expo-location'; 

import PlatesSaved from '../../comps/customer/PlatesSaved';
import axios from 'axios';
import Geocode from "react-geocode";

import BubbleCust from '../../comps/customer/BubbleCust';

import Name from '../../comps/customer/Name';
import Title from '../../comps/customer/Title';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { auth, storage } from '../../firebase';
import LottieView from 'lottie-react-native';


var mapIcon = require ('../../assets/mapicon.png');
var userId = auth.currentUser?.uid

export default function Home({
  navigation,
  total="$5.00",
  route
}) {

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

  const markerPress = () => {
    setRestModalVisible(true)
  }



  // !--------- Tutorial ----------!
  const [card, setCard] = useState(0)
  const [bubble, setBubble] = useState(true)
  const [heading, setHeading] = useState("Here's your Home page. \n Let's break it down!")
  const [subheading, setSubheading] = useState("")
  const [img, setImg] = useState("../../../assets/meal.png")
  const [back, setBack] = useState("< Back")
  const [next, setNext] = useState("Next >")
  const [visibility, setVisibility] = useState(false)

  const HandleBubbleNext = () => {
    if(card === 0){
      setCard(1)
      setVisibility(true)
      setHeading("The 'Meals' tab allows you to see the meals ready for pickup")
      setSubheading("The 'Map' tab allows you to see restaurants around you that have meals ready for pickup")
    }
    if(card === 1){
      setCard(2)
      setHeading("This icon will open the 'Filters' window, to narrow down your research")
      setSubheading("")
    }
    if(card === 2){
      setCard(3)
      setHeading("The 1st icon will lead you back to the 'Home' page. \n The 2nd icon will lead you to the 'Orders' page")
      setSubheading("The 3rd icon will lead you to the 'Card' page. \n The 4th icon will lead you to your 'Account' page")
      setNext("Done")
    }
    if(card === 3){
      setCard(0)
      setVisibility(false)
      setHeading("Here's your Home page. \n Let's break it down!")
      setSubheading("")
      setBubble(false)
      setNext("Next >")
    }
  }
  const HandleBubbleBack = () => {
    if(card === 1){
      setCard(0)
      setVisibility(false)
      setHeading("Here's your Home page. \n Let's break it down!")
      setSubheading("")
    }
    if(card === 2){
      setCard(1)
      setHeading("The 'Meals' tab allows you to see the meals ready for pickup")
      setSubheading("The 'Map' tab allows you to see restaurants around you that have meals ready for pickup")
    }
    if(card === 3){
      setCard(2)
      setHeading("This icon will open the 'Filters' window, to narrow down your research")
      setSubheading("")
      setNext("Next >")
    }
  }
  // NEED TO INCLUDE FOLLOWING LINE FOR TUTORIAL CUSTOMER
  // <BubbleCust show={bubble} heading={heading} subheading={subheading} img={img} back={back} next={next} onPress1={HandleBubbleNext} onPress2={HandleBubbleBack} opacity={visibility}/>

  // !--------- End Of Tutorial ----------!

  const [refresh, setRefresh] = useState(1);
  
  useFocusEffect(
    React.useCallback(()=>{
      (async () => {
        const american = await axios.get('/listed.php?cuisine=american');
        const italian = await axios.get('/listed.php?cuisine=italian');
        const indian = await axios.get('/listed.php?cuisine=indian');
        const middleeastern = await axios.get('/listed.php?cuisine=middleeastern');
        const gf = await axios.get('/listed.php?gf=1');
        const df = await axios.get('/listed.php?df=1');
        const nf = await axios.get('/listed.php?nf=1');
        const v = await axios.get('/listed.php?v=1');
        
        const result = await axios.get('/listed.php');
        const restaurants = await axios.get('/users.php?restaurant=1');
        const check = await axios.get('/orders.php?u_id='+userId);

        for (var i = 0; i<result.data.length; i++) {
          try{
            // console.log("getting")
            const url = await storage.ref().child(`menu/item${result.data[i].m_id}.jpg`).getDownloadURL();
            result.data[i].url = url
            // console.log(url, "URL");

           }catch (e){
            result.data[i].url = null;
            continue;
          }
        }

        for (var i = 0; i<american.data.length; i++) {
          try{
            // console.log("getting")
            const url = await storage.ref().child(`menu/item${american.data[i].m_id}.jpg`).getDownloadURL();
            american.data[i].url = url
            // console.log(url, "URL");

           }catch (e){
            american.data[i].url = null;
            continue;
          }
        }

        for (var i = 0; i<italian.data.length; i++) {
          try{
            // console.log("getting")
            const url = await storage.ref().child(`menu/item${italian.data[i].m_id}.jpg`).getDownloadURL();
            italian.data[i].url = url
            // console.log(url, "URL");

           }catch (e){
            italian.data[i].url = null;
            continue;
          }
        }

        for (var i = 0; i<indian.data.length; i++) {
          try{
            // console.log("getting")
            const url = await storage.ref().child(`menu/item${indian.data[i].m_id}.jpg`).getDownloadURL();
            indian.data[i].url = url
            // console.log(url, "URL");

           }catch (e){
            indian.data[i].url = null;
            continue;
          }
        }

        for (var i = 0; i<middleeastern.data.length; i++) {
          try{
            // console.log("getting")
            const url = await storage.ref().child(`menu/item${middleeastern.data[i].m_id}.jpg`).getDownloadURL();
            middleeastern.data[i].url = url
            // console.log(url, "URL");

           }catch (e){
            middleeastern.data[i].url = null;
            continue;
          }
        }

        for (var i = 0; i<gf.data.length; i++) {
          try{
            // console.log("getting")
            const url = await storage.ref().child(`menu/item${gf.data[i].m_id}.jpg`).getDownloadURL();
            gf.data[i].url = url
            // console.log(url, "URL");

           }catch (e){
            gf.data[i].url = null;
            continue;
          }
        }

        for (var i = 0; i<nf.data.length; i++) {
          try{
            // console.log("getting")
            const url = await storage.ref().child(`menu/item${nf.data[i].m_id}.jpg`).getDownloadURL();
            nf.data[i].url = url
            // console.log(url, "URL");

           }catch (e){
            nf.data[i].url = null;
            continue;
          }
        }

        for (var i = 0; i<df.data.length; i++) {
          try{
            // console.log("getting")
            const url = await storage.ref().child(`menu/item${df.data[i].m_id}.jpg`).getDownloadURL();
            df.data[i].url = url
            // console.log(url, "URL");

           }catch (e){
            df.data[i].url = null;
            continue;
          }
        }

        for (var i = 0; i<v.data.length; i++) {
          try{
            // console.log("getting")
            const url = await storage.ref().child(`menu/item${v.data[i].m_id}.jpg`).getDownloadURL();
            v.data[i].url = url
            // console.log(url, "URL");

           }catch (e){
            v.data[i].url = null;
            continue;
          }
        }
        //console.log(result)
        
          setListedData(result.data);
          //console.log(american.data)
          setAllFood(result.data);
          setAmericanFood(american.data);
          setItalianFood(italian.data);
          setIndianFood(indian.data);
          setMiddleEasternFood(middleeastern.data)
          setRestaurantData(restaurants.data)
          setOrderStatus(check.data)
          setGFFood(gf.data)
          setDFFood(df.data)
          setNFFood(nf.data)
          setVFood(v.data)

      })();
    },[])
  )


  const [restaurantData, setRestaurantData] = useState()

  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState({
    longitude: -123.1207,
    latitude: 49.2827,
    latitudeDelta: 0.086,
    longitudeDelta: 0.136});
  const [restaurants] = useState([
    {
      key: 1,
      title: "Habitat Pub",
      description: "Delicious on-campus pub fare",
      location: {
        longitude: -123.001550,
        latitude: 49.253300
      },
      plates_saved: "50",
      distance:'100m',
      mealQuantity:3,
      fuid:'Eg1a2bGY1pYSsHI9uae1mJBrEIr2',
    },
    {
      key: 2,
      title: "Agra Tandoori",
      description: "Delicious Indian cuisine",
      location: {
        longitude: -123.020660,
        latitude: 49.254430
      },
      plates_saved: "120",
      distance:'1.2km',
      mealQuantity:2,
      fuid:'si1HZrRyTlc3pubOQlTIzA6W3Og1',
    },
    {
      key: 3,
      title: "Yasser's Restaurant",
      description: "Afghan cuisine",
      location: {
        longitude: -123.018930,
        latitude: 49.249887
      },
      plates_saved: "180",
      distance:'1km',
      mealQuantity:4,
      fuid:'hyMHzMeOFSXO5uqYgsky7Sil1qu2',
    },
    {
      key: 4,
      title: "Atlas Steakhouse",
      description: "Amazing steak!",
      location: {
        longitude: -123.007278,
        latitude: 49.256741
      },
      plates_saved: "35",
      distance:'300m',
      mealQuantity:4,
      fuid:'GHKeZm6KSSW2NoF5Wxq0IZqCDm93',
    }
  ])

  const GetLatLong = () => {
    Geocode.setApiKey("AIzaSyDA6WZ_rlulhSrphE3Z9ue1WJJSnHr2jy8");

    Geocode.setLanguage("en");

    Geocode.fromAddress("3700 Willingdon Ave Burnaby BC").then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        // console.log(lat, lng);
      },
      (error) => {
        // console.error(error);
      }
    );
  }

  const [usersData, setUsersData] = useState(null);
  const [locationsData, setLocationsData] = useState(null);
  
  const [listedData, setListedData] = useState(null);
  const [mealsData, setMealsData] = useState(null);

  const [allFood, setAllFood] = useState(null)

  const [italianFood, setItalianFood] = useState(null)
  const [indianFood, setIndianFood] = useState(null)
  const [americanFood, setAmericanFood] = useState(null)
  const [middleeasternFood, setMiddleEasternFood] = useState(null)

  const [gfFood, setGFFood] = useState(null)
  const [dfFood, setDFFood] = useState(null)
  const [nfFood, setNFFood] = useState(null)
  const [vFood, setVFood] = useState(null)
  
  const [orderStatus, setOrderStatus] = useState(null)
  
  

  useEffect(() => {

    let isUnmount = false;
    
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }



      let location = await Location.getCurrentPositionAsync({});
      if(!isUnmount){
         setLocation({
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
          latitudeDelta: 0.0043,
          longitudeDelta: 0.0034
        })
      }
    
    })();

    return () => {
      isUnmount = true;
    }

  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }


  const [meal, setMeal] = useState()
  const [rest, setRestaurant] = useState()
  const [oldPrice, setOldPrice] = useState()
  const [newPrice, setNewPrice] = useState()
  const [name, setName] = useState()
  const [mealImg, setMealImg] = useState()
  const [cartItems, setCartItems] = useState([])


  // ----- FILTERS START ------


    // !--------------------- CUISINE --------------------!
    // ITALIAN 
    const [c1Color, setC1Color] = useState("white")
    const [c1TextColor, setC1TextColor] = useState("#ff1a44")
    const [c1Selected, setC1Selected] = useState(false)
    const SelectCuisine1 = () => {
      setC1Selected(!c1Selected)
      
      if(c1Selected === false){
        setC1Color("#ff1a44")
        setC1TextColor("white")
        setListedData(italianFood)
      } else {
        setC1Color("white")
        setC1TextColor("#ff1a44")
        setListedData(allFood)
      }
    }
    // INDIAN
    const [c2Color, setC2Color] = useState("white")
    const [c2TextColor, setC2TextColor] = useState("#ff1a44")
    const [c2Selected, setC2Selected] = useState(false)
    const SelectCuisine2 = () => {
      setC2Selected(!c2Selected)
      
      if(c2Selected === false){
        setC2Color("#ff1a44")
        setC2TextColor("white")
        setListedData(indianFood)
      } else {
        setC2Color("white")
        setC2TextColor("#ff1a44")
        setListedData(allFood)
      }
    }
    // MIDDLEEASTERN
    const [c3Color, setC3Color] = useState("white")
    const [c3TextColor, setC3TextColor] = useState("#ff1a44")
    const [c3Selected, setC3Selected] = useState(false)
    const SelectCuisine3 = () => {
      setC3Selected(!c3Selected)
      
      if(c3Selected === false){
        setC3Color("#ff1a44")
        setC3TextColor("white")
        setListedData(middleeasternFood)
      } else {
        setC3Color("white")
        setC3TextColor("#ff1a44")
        setListedData(allFood)
      }
    }
    // AMERICAN
    const [c4Color, setC4Color] = useState("white")
    const [c4TextColor, setC4TextColor] = useState("#ff1a44")
    const [c4Selected, setC4Selected] = useState(false)
    const SelectCuisine4 = () => {
      setC4Selected(!c4Selected)
      
      if(c4Selected === false){
        setC4Color("#ff1a44")
        setC4TextColor("white")
        setListedData(americanFood)
      } else {
        setC4Color("white")
        setC4TextColor("#ff1a44")
        setListedData(allFood)
      }
    }

    // !--------------------- DISTANCE --------------------!
    // 200m 
    const [dist1Color, setDist1Color] = useState("white")
    const [dist1TextColor, setDist1TextColor] = useState("#ff1a44")
    const [dist1Selected, setDist1Selected] = useState(false)
    const SelectDistance1 = () => {
      setDist1Selected(!dist1Selected)
      
      if(dist1Selected === false){
        setDist1Color("#ff1a44")
        setDist1TextColor("white")
      } else {
        setDist1Color("white")
        setDist1TextColor("#ff1a44")
      }
    }
    // 500m
    const [dist2Color, setDist2Color] = useState("white")
    const [dist2TextColor, setDist2TextColor] = useState("#ff1a44")
    const [dist2Selected, setDist2Selected] = useState(false)
    const SelectDistance2 = () => {
      setDist2Selected(!dist2Selected)
      
      if(dist2Selected === false){
        setDist2Color("#ff1a44")
        setDist2TextColor("white")
      } else {
        setDist2Color("white")
        setDist2TextColor("#ff1a44")
      }
    }
    // 1km
    const [dist3Color, setDist3Color] = useState("white")
    const [dist3TextColor, setDist3TextColor] = useState("#ff1a44")
    const [dist3Selected, setDist3Selected] = useState(false)
    const SelectDistance3 = () => {
      setDist3Selected(!dist3Selected)
      
      if(dist3Selected === false){
        setDist3Color("#ff1a44")
        setDist3TextColor("white")
      } else {
        setDist3Color("white")
        setDist3TextColor("#ff1a44")
      }
    }
    // 5km
    const [dist4Color, setDist4Color] = useState("white")
    const [dist4TextColor, setDist4TextColor] = useState("#ff1a44")
    const [dist4Selected, setDist4Selected] = useState(false)
    const SelectDistance4 = () => {
      setDist4Selected(!dist4Selected)
      
      if(dist4Selected === false){
        setDist4Color("#ff1a44")
        setDist4TextColor("white")
      } else {
        setDist4Color("white")
        setDist4TextColor("#ff1a44")
      }
    }
    // 10km
    const [dist5Color, setDist5Color] = useState("white")
    const [dist5TextColor, setDist5TextColor] = useState("#ff1a44")
    const [dist5Selected, setDist5Selected] = useState(false)
    const SelectDistance5 = () => {
      setDist5Selected(!dist5Selected)
      
      if(dist5Selected === false){
        setDist5Color("#ff1a44")
        setDist5TextColor("white")
      } else {
        setDist5Color("white")
        setDist5TextColor("#ff1a44")
      }
    }

    // !--------------------- DIETARY --------------------!
    // Gluten Free 
    const [diet1Color, setDiet1Color] = useState("white")
    const [diet1TextColor, setDiet1TextColor] = useState("#ff1a44")
    const [diet1Selected, setDiet1Selected] = useState(false)
    const SelectDiet1 = () => {
      setDiet1Selected(!diet1Selected)
      
      if(diet1Selected === false){
        setDiet1Color("#ff1a44")
        setDiet1TextColor("white")
        setListedData(gfFood)
      } else {
        setDiet1Color("white")
        setDiet1TextColor("#ff1a44")
        setListedData(allFood)
      }
    }
    // Dairy Free
    const [diet2Color, setDiet2Color] = useState("white")
    const [diet2TextColor, setDiet2TextColor] = useState("#ff1a44")
    const [diet2Selected, setDiet2Selected] = useState(false)
    const SelectDiet2 = () => {
      setDiet2Selected(!diet2Selected)
      
      if(diet2Selected === false){
        setDiet2Color("#ff1a44")
        setDiet2TextColor("white")
        setListedData(dfFood)
      } else {
        setDiet2Color("white")
        setDiet2TextColor("#ff1a44")
        setListedData(allFood)
      }
    }
    // Nut Free
    const [diet3Color, setDiet3Color] = useState("white")
    const [diet3TextColor, setDiet3TextColor] = useState("#ff1a44")
    const [diet3Selected, setDiet3Selected] = useState(false)
    const SelectDiet3 = () => {
      setDiet3Selected(!diet3Selected)
      
      if(diet3Selected === false){
        setDiet3Color("#ff1a44")
        setDiet3TextColor("white")
        setListedData(nfFood)
      } else {
        setDiet3Color("white")
        setDiet3TextColor("#ff1a44")
        setListedData(allFood)
      }
    }
    // Vegetarien
    const [diet4Color, setDiet4Color] = useState("white")
    const [diet4TextColor, setDiet4TextColor] = useState("#ff1a44")
    const [diet4Selected, setDiet4Selected] = useState(false)
    const SelectDiet4 = () => {
      setDiet4Selected(!diet4Selected)
      
      if(diet4Selected === false){
        setDiet4Color("#ff1a44")
        setDiet4TextColor("white")
        setListedData(vFood)
      } else {
        setDiet4Color("white")
        setDiet4TextColor("#ff1a44")
        setListedData(allFood)
      }
    }

    // !--------------------- TIME --------------------!
    // Now
    const [time1Color, setTime1Color] = useState("white")
    const [time1TextColor, setTime1TextColor] = useState("#ff1a44")
    const [time1Selected, setTime1Selected] = useState(false)
    const SelectTime1 = () => {
      setTime1Selected(!time1Selected)
      
      if(time1Selected === false){
        setTime1Color("#ff1a44")
        setTime1TextColor("white")
      } else {
        setTime1Color("white")
        setTime1TextColor("#ff1a44")
      }
    }
    // 30 min
    const [time2Color, setTime2Color] = useState("white")
    const [time2TextColor, setTime2TextColor] = useState("#ff1a44")
    const [time2Selected, setTime2Selected] = useState(false)
    const SelectTime2 = () => {
      setTime2Selected(!time2Selected)
      
      if(time2Selected === false){
        setTime2Color("#ff1a44")
        setTime2TextColor("white")
      } else {
        setTime2Color("white")
        setTime2TextColor("#ff1a44")
      }
    }
    // 1 hour
    const [time3Color, setTime3Color] = useState("white")
    const [time3TextColor, setTime3TextColor] = useState("#ff1a44")
    const [time3Selected, setTime3Selected] = useState(false)
    const SelectTime3 = () => {
      setTime3Selected(!time3Selected)
      
      if(time3Selected === false){
        setTime3Color("#ff1a44")
        setTime3TextColor("white")
      } else {
        setTime3Color("white")
        setTime3TextColor("#ff1a44")
      }
    }
    // 2 hours
    const [time4Color, setTime4Color] = useState("white")
    const [time4TextColor, setTime4TextColor] = useState("#ff1a44")
    const [time4Selected, setTime4Selected] = useState(false)
    const SelectTime4 = () => {
      setTime4Selected(!time4Selected)
      
      if(time4Selected === false){
        setTime4Color("#ff1a44")
        setTime4TextColor("white")
      } else {
        setTime4Color("white")
        setTime4TextColor("#ff1a44")
      }
    }
    // 3 hours +
    const [time5Color, setTime5Color] = useState("white")
    const [time5TextColor, setTime5TextColor] = useState("#ff1a44")
    const [time5Selected, setTime5Selected] = useState(false)
    const SelectTime5 = async() => {
      setTime5Selected(!time5Selected)
      
        setListedData(timeresult.data);
      if(time5Selected === false){
        setTime5Color("#ff1a44")
        setTime5TextColor("white")
      } else {
        setTime5Color("white")
        setTime5TextColor("#ff1a44")
      }
    }

    // ----- FILTERS END ------
    const [showModel, setShowModel] = useState(false);
    const [animateModal, setanimateModal] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [restModalVisible, setRestModalVisible] = useState(false);

    const [restTitle, setRestTitle] = useState()
    const [platessaved, setPlatesSaved] = useState()
    const [fuid, setFuid] = useState()
    const [mapRestData, setMapRestData] = useState()

    const [orderNumber, setOrderNumber] = useState()

  return (
    <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>

      <View style={{width:'100%', position:'absolute', top:80, display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Tabs onPressMeal={HandleMealTab} onPressMap={HandleMapTab}
          fontFamilyMeals={mealtab ? 'Raleway_600SemiBold' : 'Raleway_300Light'}
          fontFamilyMap={maptab ? 'Raleway_600SemiBold' : 'Raleway_300Light'}
          alignItems={mealtab ? 'flex-start' : 'flex-end'}
          />
          <View style={{width:'90%'}}>
            <UserLocation address={"3700 Willingdon Ave"}/>
          </View>
      </View>
       
       {mealtab === true && <View style={{marginHorizontal: 0,
            width:'100%',
            position:'absolute',
            top:170,
            bottom:0,
            flex:1}}>

        {mealtab === true && <View style={{display:'flex', justifyContent:'center', alignItems:'center', marginBottom:20}}>
          <Filters
          SelectCuisine1={SelectCuisine1}
          SelectCuisine2={SelectCuisine2}
          SelectCuisine3={SelectCuisine3}
          SelectCuisine4={SelectCuisine4}
          SelectDistance1={SelectDistance1}
          SelectDistance2={SelectDistance2}
          SelectDistance3={SelectDistance3}
          SelectDistance4={SelectDistance4}
          SelectDistance5={SelectDistance5}
          SelectDiet1={SelectDiet1}
          SelectDiet2={SelectDiet2}
          SelectDiet3={SelectDiet3}
          SelectDiet4={SelectDiet4}
          SelectTime1={SelectTime1}
          SelectTime2={SelectTime2}
          SelectTime3={SelectTime3}
          SelectTime4={SelectTime4}
          SelectTime5={SelectTime5}
          c1TextColor={c1TextColor}
          c2TextColor={c2TextColor}
          c3TextColor={c3TextColor}
          c4TextColor={c4TextColor}
          c1Color={c1Color}
          c2Color={c2Color}
          c3Color={c3Color}
          c4Color={c4Color}
          dist1TextColor={dist1TextColor}
          dist2TextColor={dist2TextColor}
          dist3TextColor={dist3TextColor}
          dist4TextColor={dist4TextColor}
          dist5TextColor={dist5TextColor}
          dist1Color={dist1Color}
          dist2Color={dist2Color}
          dist3Color={dist3Color}
          dist4Color={dist4Color}
          dist5Color={dist5Color}
          diet1TextColor={diet1TextColor}
          diet2TextColor={diet2TextColor}
          diet3TextColor={diet3TextColor}
          diet4TextColor={diet4TextColor}
          diet1Color={diet1Color}
          diet2Color={diet2Color}
          diet3Color={diet3Color}
          diet4Color={diet4Color}
          time1TextColor={time1TextColor}
          time2TextColor={time2TextColor}
          time3TextColor={time3TextColor}
          time4TextColor={time4TextColor}
          time5TextColor={time5TextColor}
          time1Color={time1Color}
          time2Color={time2Color}
          time3Color={time3Color}
          time4Color={time4Color}
          time5Color={time5Color}
          />

        </View>}
        
        {/* <Pressable style={{backgroundColor:"#FE4265", justifyContent: "center", alignItems:"center", height: 30, width: "90%", alignSelf: 'center', borderRadius: 30, marginBottom: 10}}
          onPress={()=>setRefresh(refreshOrders+1)}>
            <Text style={{color:"white", fontWeight:"bold"}}>
              Refresh
            </Text>
        </Pressable> */}

        <View style={{width:'100%', alignItems:'center', paddingBottom:105}}>
        <ScrollView contentContainerStyle={{width:'100%', alignItems:'center', paddingBottom:105}}>
            {listedData ? listedData.filter((x)=> {return x.status === "active"}).map((listed) => (
              <CustMealCard
               key={listed.lid}
               meal={listed.m_name}
               modifications={listed.modifications}
               restaurant={listed.full_name}
               oldprice={listed.old_price}
               newprice={listed.new_price}
               description={listed.description}
               showNut={parseFloat(listed.nf)}
               showGluten={parseFloat(listed.gf)}
               showDairy={parseFloat(listed.df)}
               showVege={parseFloat(listed.v)}
               src={listed.url}
               time_avail={listed.time_avail}
               distance={listed.distance}
               addToCart={() => {
                setShowModel(true)
                setMeal(listed.m_name)
                setRestaurant(listed.full_name)
                setOldPrice(listed.old_price)
                setNewPrice(listed.new_price)
                setName(listed.full_name)
                setMealImg(listed.url)
                setCartItems([
                  ...cartItems, 
                  listed
                ])
              }}
               />

            )) : <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:70}}>
            <LottieView
              ref={(ref) => {
                anim = ref;
              }}
              style={{
                width:'50%',
                alignItems:'center'
              }}
              source={require('../../assets/logo.json')}
              autoPlay={true}
              loop={true}
              />
            </View>}
            
            
        </ScrollView>
        </View>
        </View>}
        {maptab === true && <View style={{marginHorizontal: 0,
            width:'100%',
            position:'absolute',
            top:200,
            flex:1,
            justifyContent:'center',
            alignItems:'center'}}>
            <MapView 
            initialRegion={location}
            showsUserLocation
            style={{width:'100%', height:600}}
            provider="google"
            >
              {restaurants ? restaurants.map((restaurant) => (
                <Marker 
                key={restaurant.key}
                coordinate={restaurant.location}
                title={restaurant.title}
                description={restaurant.description}
                >
                  <View style={styles.marker}>
                    <Image style={{width:30, height:30}} source={mapIcon}/>
                  </View>
                  <Callout style={{borderRadius:20}} onPress={async()=>{
                    setRestModalVisible(true)
                    setRestTitle(restaurant.title)
                    setPlatesSaved(restaurant.plates_saved)
                    setFuid(restaurant.fuid)
                    const result = await axios.get('/listed.php?fuid='+restaurant.fuid);
                    for (var i = 0; i<result.data.length; i++) {
                      try{
                        const url = await storage.ref().child(`menu/item${result.data[i].m_id}.jpg`).getDownloadURL();
                        result.data[i].url = url
                       }catch (e){
                        result.data[i].url = null;
                        continue;
                      }
                    }
                    setMapRestData(result.data)
                    
                  }}>
                    <View style={styles.callout}>
                      <Text style={{fontSize:24, fontFamily:'Raleway_600SemiBold', color:'black', marginBottom:10}}>{restaurant.title}</Text>
                      <Text style={{marginBottom:10, fontFamily:'Quicksand_400Regular'}}>{restaurant.distance} away</Text>
                      <View style={{display:'flex', flexDirection:'row'}}>
                        <Text style={{fontWeight:'800', color:'#F3AE81', fontSize:18, fontFamily:'Quicksand_700Bold'}}>{restaurant.mealQuantity}</Text>
                        <Text style={{fontWeight:'300', fontSize:18, fontFamily:'Quicksand_400Regular'}}> meals available!</Text>
                      </View>
                      <Pressable style={styles.shadowPropDark} title="open restaurant" >
                        <Text style={{color:'white', fontSize:18, fontFamily:'Quicksand_400Regular'}}>View meals</Text>
                      </Pressable>
                      <View/>
                    </View>
                  </Callout>
                </Marker>
              ))
              : null}
            </MapView>
          </View>}
          <View>



          <SwipeUpDownModal
          modalVisible={restModalVisible}
          PressToanimate={animateModal}          
          ContentModal={
            <View style={{marginTop:30, display:'flex', alignItems:'center'}}>

              <View style={{display:'flex', justifyContent:'center', width:70, height:2, backgroundColor:'#C3C3C3', position:'absolute', top:-20, alignSelf:'center'}}></View>
              <View style={{display:'flex', justifyContent:'center', alignItems:'flex-end', position:'relative', top:-10, left:170}}>
              <View style={{display:'flex', width:'90%', justifyContent:'center', alignItems:'flex-end', marginTop:-10, marginBottom:10}}>
                <Pressable onPress={()=>setRestModalVisible(!restModalVisible)}>
                  <AntDesign name="close" size={24} color="black" />
                </Pressable> 
              </View>
              </View>
              <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', position:'relative', left:0, top:-20, width:'90%'}}>
                <Title title={restTitle} />
                <View style={{paddingLeft:10, display:'flex', width:160}}>
                  <PlatesSaved fontSize={'15px'} flexDirection={'column'} quantity={platessaved}/>
                </View>
              </View>
              <View style={{width:'100%', alignItems:'center', paddingBottom:105}}>
              <View style={{width:'90%'}}>
                <UserLocation address={"3700 Willingdon Ave"} color={"black"}/>
              </View>
                <ScrollView contentContainerStyle={{width:'100%', alignItems:'center', paddingBottom:200}}>
                  {mapRestData ? mapRestData.filter((x)=>{return x.status === "active"}).map((mapRest) => (
                    <CustMealCard
                    key={mapRest.lid}
                    meal={mapRest.m_name}
                    modifications={mapRest.modifications}
                    restaurant={mapRest.full_name}
                    oldprice={mapRest.old_price}
                    newprice={mapRest.new_price}
                    description={mapRest.description}
                    showNut={mapRest.nf}
                    showGluten={mapRest.gf}
                    showDairy={mapRest.df}
                    showVege={mapRest.v}
                    src={mapRest.url}
                    addToCart={() => {
                      setRestModalVisible(false)
                      setShowModel(true)
                      setMeal(mapRest.m_name)
                      setRestaurant(mapRest.full_name)
                      setOldPrice(mapRest.old_price)
                      setNewPrice(mapRest.new_price)
                      setName(mapRest.full_name)
                      setMealImg(mapRest.url)
                      setCartItems([
                        ...cartItems, 
                        mapRest
                      ])
                    }}  
                    />
                  )): <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                  <LottieView
                    ref={(ref) => {
                      anim = ref;
                    }}
                    style={{
                      width:'50%',
                      alignItems:'center'
                    }}
                    source={require('../../assets/logopink.json')}
                    autoPlay={true}
                    loop={true}
                    />
                  </View>}
                </ScrollView>
              </View>
            </View>
          }
          HeaderStyle={styles.headerContent}
          ContentModalStyle={styles.ModalMap}
          onClose={() => {
              setRestModalVisible(false);
              setanimateModal(false);
          }}
        />
      </View>

      <SwipeUpDownModal
          modalVisible={showModel}
          PressToanimate={animateModal}          
          ContentModal={
            
            <View style={{marginTop:30, display:'flex', justifyContent:'center', alignItems:'center'}}>

              
              <View style={{display:'flex', width:'90%', justifyContent:'center', width:70, height:2, backgroundColor:'#C3C3C3', position:'absolute', top:-20, alignSelf:'center'}}></View>
              <View style={{display:'flex', width:'90%', justifyContent:'center', alignItems:'flex-end'}}>
              <View style={{display:'flex', width:'90%', justifyContent:'center', alignItems:'flex-end', height:40, marginTop:-20, marginBottom:10}}>
                <Pressable onPress={()=>setShowModel(!showModel)}>
                  <AntDesign name="close" size={24} color="black" />
                </Pressable> 
              </View>
              </View>

                <SimpleOrderCard 
                restaurant={rest} 
                meal={meal}
                newprice={newPrice}
                oldprice={oldPrice} 
                src={mealImg}
                />
              <View style={{display:'flex', flexDirection:'row', width:'90%', justifyContent:'flex-end', marginTop:20}}>
                <Text style={{fontSize:24, fontWeight:'500'}}>Total: {newPrice}</Text>
              </View>
              <View style={{display:'flex', flexDirection:'row', width:'90%', justifyContent:'space-between'}}>
                <Pressable style={styles.shadowPropDark} title="Checkout" onPress={()=>{
                    navigation.navigate('Cart', {cartItems} );
                    setShowModel(false);
                }} >
                  <Text style={{color:'white', fontSize:18}}>Checkout</Text>
                </Pressable>
                <Pressable style={styles.shadowPropLight} title="Add more" onPress={() => setModalVisible(!modalVisible)} >
                  <Text style={{color:'white', fontSize:18}}>Add More</Text>
                </Pressable>
              </View>
            </View>

            
          }
          HeaderStyle={styles.headerContent}
          ContentModalStyle={styles.Modal}
          onClose={() => {
              setShowModel(false);
              setanimateModal(false);
          }}
        />

    </LinearGradient>
  ); 
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadowPropDark: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor:'#FE4265',
    width:150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    padding:5,
    borderRadius:20,
  },
  shadowPropLight: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor:'#F3AD81',
    width:150,
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
  },
  scrollView: {
    marginHorizontal: 0,
    width:'100%',
    height:'100%',
    position:'absolute',
    top:200,
    bottom:0,
  },
  scrollViewMap: {
    marginHorizontal: 0,
    width:'100%',
    height:'100%',
    position:'absolute',
    top:120,
    bottom:0,
  },
  text: {
    fontSize: 42,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex:2,
  },
  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:'100%',
    height:'40%',
  },
  mapCenteredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex:2,
  },
  mapModalView: {
    margin: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:'100%',
    height:'70%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  marker: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:30,
    height:30,
    resizeMode : 'contain',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  callout: {
    display:'flex',
    width:250,
    backgroundColor:'white',
    padding:20,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20
  },
  calloutInner: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-start'
  },
  containerContent: {height:'100%', marginTop: 40},
  containerHeader: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: 'white',
  },
  headerContent:{
    marginTop: 0,
  },
  Modal: {
    backgroundColor: 'white',
    marginTop: 470,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
  },
  ModalMap: {
    backgroundColor: 'white',
    marginTop: 200,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
  }
});