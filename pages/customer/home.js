import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button, Pressable, TextInput,  SafeAreaView, Modal, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialIcons, Ionicons, MaterialCommunityIcons, SimpleLineIcons, AntDesign } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styled from 'styled-components';
import CustMealCard from '../../comps/customer/CustMealCard';
import Tabs from '../../comps/customer/Tabs';
import UserLocation from '../../comps/customer/UserLocation';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Filters from '../../comps/customer/Filters';
import CustCurrentOrder from '../../comps/customer/CustCurrentOrder';
import SimpleOrderCard from '../../comps/customer/SimpleOrderCard';
import Nav from '../../comps/customer/Nav';
import * as Location from 'expo-location'; 
import BubbleCust from '../../comps/customer/BubbleCust';
import { width } from '@mui/system';



var mapIcon = require ('../../assets/mapicon.png');

const image1 = require("../../assets/homepage.png")
const image2 = require("../../assets/tabs.gif")
const image3 = require("../../assets/filters.gif")
const image4 = require("../../assets/customer_menu.png")

export default function Home({
  navigation,
  total="$5.00"
}) {


  // function userData(user, score) {
  //   if (user != null) {
  //     const database = getDatabase();
  //     set(ref(db, 'users/' + user.uid), {
  //       highscore: score,
  //     });
  //   }
  // }


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

  const [modalVisible, setModalVisible] = useState(false);

  const CheckOut = () => {
    navigation.navigate('Cart')
    setModalVisible(false)
  }


  // !--------- Tutorial ----------!
  const [card, setCard] = useState(0)
  const [bubble, setBubble] = useState(true)
  const [heading, setHeading] = useState("Here's your Home page. \n Let's break it down!")
  const [subheading, setSubheading] = useState("")
  const [img, setImg] = useState(image1)
  const [back, setBack] = useState("< Back")
  const [next, setNext] = useState("Next >")
  const [visibility, setVisibility] = useState(false)
  const [contheight, setContHeight] = useState(350)
  const [imgheight, setImgHeight] = useState(250)
  const [pngheight, setPngHeight] = useState(100)

  const HandleBubbleNext = () => {
    if(card === 0){
      setCard(1)
      setVisibility(true)
      setHeading("The 'Meals' tab allows you to see the meals ready for pickup")
      setSubheading("The 'Map' tab allows you to see restaurants around you that have meals ready for pickup")
      setImg(image2)
      setContHeight(350)
      setImgHeight(125)
      setPngHeight(250)
    }
    if(card === 1){
      setCard(2)
      setHeading("This icon will open the 'Filters' window, to narrow down your research")
      setSubheading("")
      setImg(image3)
      setContHeight(550)
      setImgHeight(360)
      setPngHeight(1000)
    }
    if(card === 2){
      setCard(3)
      setHeading("The 1st icon will lead you back to the 'Home' page. \n The 2nd icon will lead you to the 'Orders' page")
      setSubheading("The 3rd icon will lead you to the 'Card' page. \n The 4th icon will lead you to your 'Account' page")
      setNext("Done")
      setImg(image4)
      setContHeight(350)
      setImgHeight(200)
      setPngHeight('100%')
    }
    if(card === 3){
      setCard(0)
      setVisibility(false)
      setHeading("Here's your Home page. \n Let's break it down!")
      setSubheading("")
      setBubble(false)
      setNext("Next >")
      setImg(image1)
      setContHeight(550)
      setImgHeight(360)
      setPngHeight(250)
    }
  }
  const HandleBubbleBack = () => {
    if(card === 1){
      setCard(0)
      setVisibility(false)
      setHeading("Here's your Home page. \n Let's break it down!")
      setSubheading("")
      setImg(image1)
      setContHeight(550)
      setImgHeight(360)
    }
    if(card === 2){
      setCard(1)
      setHeading("The 'Meals' tab allows you to see the meals ready for pickup")
      setSubheading("The 'Map' tab allows you to see restaurants around you that have meals ready for pickup")
      setImg(image2)
      setContHeight(350)
      setImgHeight(125)
      setPngHeight(250)
    }
    if(card === 3){
      setCard(2)
      setHeading("This icon will open the 'Filters' window, to narrow down your research")
      setSubheading("")
      setNext("Next >")
      setImg(image3)
      setContHeight(550)
      setImgHeight(360)
      setPngHeight(1000)
    }
  }
  // NEED TO INCLUDE FOLLOWING LINE FOR TUTORIAL CUSTOMER
  // <BubbleCust show={bubble} heading={heading} subheading={subheading} src={img} back={back} next={next} heightImg={imgheight} heightCont={contheight} heightPng={pngheight} onPress1={HandleBubbleNext} onPress2={HandleBubbleBack} opacity={visibility}/>

  // !--------- End Of Tutorial ----------!



  
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState({
    longitude: -123.1207,
    latitude: 49.2827,
    latitudeDelta: 0.086,
    longitudeDelta: 0.136});
  const [restaurants] = useState([
    {
      key: 1,
      title: "Fratelli's Bistro",
      description: "Italian comfort food",
      location: {
        longitude: -123.101025,
        latitude: 49.248911
      }
    },
    {
      key: 2,
      title: "Keg Steakhouse",
      description: "Upscale steakhouse",
      location: {
        longitude: -123.095022,
        latitude: 49.236414
      }
    },
    {
      key: 3,
      title: "Chewie's",
      description: "Seafood restaurant",
      location: {
        longitude: -123.026504,
        latitude: 49.249887
      }
    },
  ])


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
    //console.log(text)
  }





  

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
                <SimpleOrderCard />
              </View>
              <View style={{display:'flex', flexDirection:'row', width:'90%', justifyContent:'flex-end', marginTop:20}}>
                <Text style={{fontSize:24, fontWeight:'500'}}>Total: {total}</Text>
              </View>
              <View style={{display:'flex', flexDirection:'row', width:'90%', justifyContent:'space-between'}}>
                <Pressable style={styles.shadowPropDark} title="Checkout" onPress={CheckOut} >
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
          <Filters/>
        </View>}
        <View style={{width:'100%', alignItems:'center', paddingBottom:105}}>
        <ScrollView contentContainerStyle={{width:'100%', alignItems:'center', paddingBottom:105}}>
            <CustMealCard addToCart={() => setModalVisible(true)}/>
            <CustMealCard />
            <CustMealCard />
            <CustMealCard />
            <CustMealCard />
            <CustMealCard />
            <CustMealCard />
            <CustMealCard />
            <CustMealCard />
            <CustMealCard />
            <CustMealCard />
            <CustMealCard />
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
            >
              {/* <Marker coordinate={mapRegion} title="Me" description="My Location"/> */}

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
                  {/* <MaterialIcons name="food-bank" size={36} color="#E94168" /> */}
                </Marker>
              ))
              : null}
            </MapView>
          </View>}
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
  }
});
