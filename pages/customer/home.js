import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button, Pressable, TextInput,  SafeAreaView, Modal, Platform, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialIcons, Ionicons, MaterialCommunityIcons, SimpleLineIcons, AntDesign } from '@expo/vector-icons';

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




var mapIcon = require ('../../assets/mapicon.png');

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


  const [restaurantData, setRestaurantData] = useState()
  


  useFocusEffect(
    React.useCallback(()=>{
      (async () => {
        const american = await axios.get('/listed.php?cuisine=american');
        const italian = await axios.get('/listed.php?cuisine=italian');
        const mexican = await axios.get('/listed.php?cuisine=mexican');
        const vietnamese = await axios.get('/listed.php?cuisine=vietnamese');
        const result = await axios.get('/listed.php');
        //console.log(result)
        
          setListedData(result.data);
          //console.log(american.data)
          setAllFood(result.data);
          setAmericanFood(american.data);
          setItalianFood(italian.data);
          setMexicanFood(mexican.data);
          setVietnameseFood(vietnamese.data)
        
      })();
    },[])
  )

  useFocusEffect(
    React.useCallback(()=>{
      (async () => {
          console.log("run home route")
          let restaurants = await axios.get('/users.php?restaurant=1')
          //console.log(restaurants.data)
          setRestaurantData(restaurants.data)
          //console.log(restaurantData)
      })();
    },[])
  )

  const getRestaurants = async()=> {
    let restaurants = await axios.get('/users.php?restaurant=1')
    console.log(restaurants.data)
  }

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
      distance:'400m',
      mealQuantity:3
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
      mealQuantity:2
    },
    {
      key: 3,
      title: "Acqua",
      description: "Seafood restaurant",
      location: {
        longitude: -123.010650,
        latitude: 49.267530
      },
      plates_saved: "290",
      distance:'1.5km',
      mealQuantity:4
    },
    {
      key: 4,
      title: "Yasser's Restaurant",
      description: "Afghan cuisine",
      location: {
        longitude: -123.018930,
        latitude: 49.249887
      },
      plates_saved: "290",
      distance:'1.5km',
      mealQuantity:4
    },
    {
      key: 5,
      title: "Atlas Steakhouse",
      description: "Amazing steak!",
      location: {
        longitude: -123.007278,
        latitude: 49.256741
      },
      plates_saved: "290",
      distance:'1.5km',
      mealQuantity:4
    },
    {
      key: 6,
      title: "Earl's kitchen and bar",
      description: "a family owned premium casual dining chain",
      location: {
        longitude: -123.019590,
        latitude: 49.265350
      },
      plates_saved: "290",
      distance:'1.5km',
      mealQuantity:4
    },
    
  ])

  const GetLatLong = () => {
    Geocode.setApiKey("AIzaSyDA6WZ_rlulhSrphE3Z9ue1WJJSnHr2jy8");

    Geocode.setLanguage("en");

    Geocode.fromAddress("3700 Willingdon Ave Burnaby BC").then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  const [usersData, setUsersData] = useState(null);
  const [locationsData, setLocationsData] = useState(null);
  
  const [listedData, setListedData] = useState(null);
  const [mealsData, setMealsData] = useState(null);

  const [allFood, setAllFood] = useState(null)

  const [italianFood, setItalianFood] = useState(null)
  const [mexicanFood, setMexicanFood] = useState(null)
  const [americanFood, setAmericanFood] = useState(null)
  const [vietnameseFood, setVietnameseFood] = useState(null)
  

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
    // MEXICAN
    const [c2Color, setC2Color] = useState("white")
    const [c2TextColor, setC2TextColor] = useState("#ff1a44")
    const [c2Selected, setC2Selected] = useState(false)
    const SelectCuisine2 = () => {
      setC2Selected(!c2Selected)
      
      if(c2Selected === false){
        setC2Color("#ff1a44")
        setC2TextColor("white")
        setListedData(mexicanFood)
      } else {
        setC2Color("white")
        setC2TextColor("#ff1a44")
        setListedData(allFood)
      }
    }
    // VIETNAMESE
    const [c3Color, setC3Color] = useState("white")
    const [c3TextColor, setC3TextColor] = useState("#ff1a44")
    const [c3Selected, setC3Selected] = useState(false)
    const SelectCuisine3 = () => {
      setC3Selected(!c3Selected)
      
      if(c3Selected === false){
        setC3Color("#ff1a44")
        setC3TextColor("white")
        setListedData(vietnameseFood)
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
      } else {
        setDiet1Color("white")
        setDiet1TextColor("#ff1a44")
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
      } else {
        setDiet2Color("white")
        setDiet2TextColor("#ff1a44")
        console.log(hello)
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
      } else {
        setDiet3Color("white")
        setDiet3TextColor("#ff1a44")
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
      } else {
        setDiet4Color("white")
        setDiet4TextColor("#ff1a44")
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

  return (
    <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>

      <View style={{width:'100%', position:'absolute', top:80, display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Tabs onPressMeal={HandleMealTab} onPressMap={HandleMapTab}
          fontWeightMeals={mealtab ? 400 : 200}
          fontWeightMap={maptab ? 400 : 200}
          alignItems={mealtab ? 'flex-start' : 'flex-end'}
          />
          <View style={{width:'90%'}}>
            <UserLocation />
          </View>
      </View>
       
       {mealtab === true && <View style={{marginHorizontal: 0,
            width:'100%',
            position:'absolute',
            top:170,
            bottom:0,
            flex:1}}>
        


        <SwipeUpDownModal
          modalVisible={showModel}
          PressToanimate={animateModal}
          //if you don't pass HeaderContent you should pass marginTop in view of ContentModel to Make modal swipeable
          
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
                />
              <View style={{display:'flex', flexDirection:'row', width:'90%', justifyContent:'flex-end', marginTop:20}}>
                <Text style={{fontSize:24, fontWeight:'500'}}>Total: {newPrice}</Text>
              </View>
              <View style={{display:'flex', flexDirection:'row', width:'90%', justifyContent:'space-between'}}>
                <Pressable style={styles.shadowPropDark} title="Checkout" onPress={()=>{
                  navigation.navigate('Cart', {cartItems} );
                  setModalVisible(false);
                 
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
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <View style={{display:'flex', width:'90%', justifyContent:'center', alignItems:'flex-end', height:40}}>
                <View style={{width:70, height:2, backgroundColor:'#C3C3C3', position:'absolute', top:10, alignSelf:'center'}}></View>
                <Pressable onPress={()=>setModalVisible(!modalVisible)}>
                  <AntDesign name="close" size={24} color="black" />
                </Pressable>
              </View>
              <View>

                <SimpleOrderCard 
                restaurant={rest} 
                meal={meal}
                newprice={newPrice}
                oldprice={oldPrice} 
                />
              </View>
              <View style={{display:'flex', flexDirection:'row', width:'90%', justifyContent:'flex-end', marginTop:20}}>
                <Text style={{fontSize:24, fontWeight:'500'}}>Total: {newPrice}</Text>
              </View>
              <View style={{display:'flex', flexDirection:'row', width:'90%', justifyContent:'space-between'}}>
                <Pressable style={styles.shadowPropDark} title="Checkout" onPress={()=>{
                  navigation.navigate('Cart', {cartItems} );
                  setModalVisible(false);
                 
                }} >
                  <Text style={{color:'white', fontSize:18}}>Checkout</Text>
                </Pressable>
                <Pressable style={styles.shadowPropLight} title="Add more" onPress={() => setModalVisible(!modalVisible)} >
                  <Text style={{color:'white', fontSize:18}}>Add More</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
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
               showNut={listed.nf}
               showGluten={listed.gf}
               showDairy={listed.df}
               showVege={listed.v}
               addToCart={() => {
                setShowModel(true)
                //setModalVisible(true)
                setMeal(listed.m_name)
                setRestaurant(listed.full_name)
                setOldPrice(listed.old_price)
                setNewPrice(listed.new_price)
                setName(listed.full_name)
                setCartItems([
                  ...cartItems, 
                  listed
                ])
              }}
               />

            )) : null}
            
            
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
                  <Callout style={{borderRadius:20}} onPress={()=>{
                    setRestModalVisible(true)
                    if(restaurant.title === ""){
                      
                    }
                  }}>
                    <View style={styles.callout}>
                      <Text style={{fontSize:24, fontWeight:'500', color:'black', marginBottom:10}}>{restaurant.title}</Text>
                      <Text style={{marginBottom:10}}>{restaurant.distance} away</Text>
                      <View style={{display:'flex', flexDirection:'row'}}>
                        <Text style={{fontWeight:'800', color:'#F3AE81', fontSize:18}}>{restaurant.mealQuantity}</Text>
                        <Text style={{fontWeight:'300', fontSize:18}}> meals available!</Text>
                      </View>
                      <Pressable style={styles.shadowPropDark} title="open restaurant" >
                        <Text style={{color:'white', fontSize:18}}>View meals</Text>
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
            <Modal
            animationType="slide"
            transparent={true}
            visible={restModalVisible}
            >
              <View style={styles.mapCenteredView}>
                <View style={styles.mapModalView}>

                <View style={{display:'flex', width:'90%', justifyContent:'center', alignItems:'flex-end'}}>
                  <View style={{width:70, height:2, backgroundColor:'#C3C3C3', position:'absolute', top:10, alignSelf:'center'}}></View>
                  <Pressable style={{position:'absolute', top:10, zIndex:10}} onPress={()=>setRestModalVisible(!restModalVisible)}>
                    <AntDesign name="close" size={24} color="black" />
                  </Pressable>
                  <View style={{display:'flex', width:'100%', justifyContent:'center', alignItems:'flex-start', position:'absolute', top:40}}>
                    {/* MAP THIS */}
                    <Title title={"Fratelli's Bistro"} /> 
                  </View>
                  <View style={{width:'100%', display:'flex', alignItems:'flex-end', position:'absolute', top:50, height:50, width:200, right:-40}}>
                    <PlatesSaved fontSize={'16px'} flexDirection={'column'} quantity={50}/>
                  </View>
                </View>
                <View style={{display:'flex', width:'100%', height:'60%', justifyContent:'flex-start', alignItems:'center', position:'absolute', top:150}}>
                <ScrollView contentContainerStyle={{width:'100%', alignItems:'center', paddingBottom:105}}>
                    <CustMealCard/>
          
                </ScrollView>

                </View>
              </View>
            </View>
          </Modal>
          </View>
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
  }
});