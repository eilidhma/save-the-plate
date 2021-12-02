import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput, ScrollView, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styled from 'styled-components';
import CustCurrentOrder from '../../comps/customer/CustCurrentOrder';
import CustMealCard from '../../comps/customer/CustMealCard';
import PastOrder from '../../comps/customer/PastOrder';
import StarRating from 'react-native-star-rating';
import { SimpleLineIcons } from '@expo/vector-icons';
import axios from 'axios';
import { auth } from '../../firebase';
import Name from '../../comps/customer/Name';
import MapView, { Callout, Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import * as geolib from 'geolib';


var cardtype = require ('../../assets/visa.png');
const Stack = createNativeStackNavigator();

var map = require ('../../assets/map.png');

const Cont = styled.View`
  display:flex;
  width:100%;
  height:100%;
  top:170px;
  backgroundColor:white;
  paddingTop:10px;
  paddingBottom:10px;
  justify-content:flex-start;
  align-items:center;
`

const TitleCont = styled.View`
  display:flex;
  width:100%;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
  padding-left:20px;
  padding-right:20px;
`

const Distance = styled.View`
  display:flex;
  flex-direction:row;
  width:90%;
  margin-bottom:15px;
  margin-top:10px;
`

export default function Checkout({
  restaurant="Fratelli's Bistro",
  distance="1.2 km",
  price="$5.00",
  navigation,
  src=require("../../assets/plate.png"),
  route
}) {



  
  const [listedData, setListedData] = useState();

  useFocusEffect(
    React.useCallback(()=>{
      var userID = auth.currentUser?.uid;
      (async () => {
        const result = await axios.get('/users.php?fuid='+userID);
        setListedData(result.data);
      })();
    },[])
  )


  const [modalVisible, setModalVisible] = useState(false);
  const [orderData, setOrderData] = useState([]);


  var cartItems = null;
  if(route.params && route.params.cartItems){
    cartItems = route.params.cartItems;
  }
  
  
  //const {cartItems} = route.params;
  const ViewOrder = () => {
    navigation.navigate('Orders')
    setModalVisible(false)
  }

  const GoHome = () => {
    navigation.navigate('Home')
    setModalVisible(false)
  }

  const [orderItems, setOrderItems] = useState([])

  const PostOrder = async () => {
    const fuid = auth.currentUser.uid;
    const status = 'active';
    const result = await axios.post('/orders.php', {
      status:status,
      l_id:cartItems[0].lid,
      fuid:fuid
    }); 
  }

  const PatchListing = async () => {
    const fuid = auth.currentUser.uid;
    const status = 'complete';
    const result = await axios.patch('/listed.php', {
      id:cartItems[0].lid,
      status:status,
    }); 
  }

  const [location, setLocation] = useState({
    longitude: -123.1207,
    latitude: 49.2827,
    latitudeDelta: 0.086,
    longitudeDelta: 0.136});

  const [coordinates] = useState([
    {
      longitude: -123.1207,
      latitude: 49.2827,
    },
    {
      longitude: -123.001550,
      latitude: 49.253300,
    },
  ]);

  useEffect(() => {

    let isUnmount = false;
    
    (async () => {
      
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

  const GOOGLE_MAPS_APIKEY = "AIzaSyDA6WZ_rlulhSrphE3Z9ue1WJJSnHr2jy8";
  const origin = {latitude: 49.2827, longitude: -123.1207};

  const [distanceToRestaurant, setDistance] = useState()
  
  useEffect(()=>{
    Location.installWebGeolocationPolyfill();
    navigator.geolocation.getCurrentPosition(
      (position) => {
          setDistance(geolib.getDistance(position.coords, {
            latitude: 49.253300,
            longitude: -123.001550,
        })/1000)
          ;
      },
      () => {
          alert('Position could not be determined.');
      }
  );
  },[])

  var mapIcon = require ('../../assets/mapicon.png');

  // console.log(latitudeRest.replace(/"/g, ''))

 
  return (
    <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>
      <View style={{width:'100%', position:'absolute', top:80, display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Text style={styles.heading}>Checkout</Text>
      </View>
      <View style={{width:'90%', backgroundColor:'white', height:2, position:'absolute', top:118}}></View> 
      <Cont> 
      {cartItems ? <TitleCont> 
          {listedData ? listedData.map((listed) => (

            <Name key={listed.id} name={listed.full_name}/>
          )):null} 
        </TitleCont> : null}
        {cartItems ? <Distance>
          <SimpleLineIcons style={{marginRight:5}} name="location-pin" size={18} color="black" />
          <Text style={{fontSize:16, color:'black'}}>{distanceToRestaurant}<Text>km away</Text></Text>
        </Distance>: 
      <View>
        <Text>You have nothing in your cart!</Text>
      </View>}
      {cartItems ? <View style={{
        width:'100%',
        height:220,
        justifyContent:'center',
        alignItems:'center'}}>
          <MapView 
            initialRegion={location}
            showsUserLocation
            style={{width:'100%', height:220}}
            provider="google"
            >
              {cartItems ? cartItems.map((order)=>(<Marker 
                key={order.lid}
                coordinate={{latitude:parseFloat(cartItems[0].lat),longitude:parseFloat(cartItems[0].longitude)}}
                title={order.full_name}
                >
                <View style={styles.marker}>
                  <Image style={{width:30, height:30}} source={mapIcon}/>
                </View>
              </Marker> )) :null}
              <MapViewDirections
                origin={location}
                destination={{latitude: parseFloat(cartItems[0].lat), longitude: parseFloat(cartItems[0].longitude)}}
                apikey={GOOGLE_MAPS_APIKEY}
              />
          </MapView>
        </View>: null}
        <View style={styles.scrollViewMedium}>
           <ScrollView contentContainerStyle={{width:'100%', alignItems:'center', paddingBottom:300}}>
            {cartItems ? cartItems.map((order)=>(  
              <PastOrder key={order.lid} restaurant={order.full_name} meal={order.m_name} src={order.url}/>
            )) : null}
 
 {cartItems ? <View style={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', paddingLeft:20, paddingRight:20, marginTop:30, flexDirection:'row'}}>
              <View style={{width:120, display:'flex', flexDirection:'row'}}>
                <Image style={{width:50, height:15}} source={cardtype}></Image>
                <Text style={{marginLeft:5}}>***7896</Text>
              </View>
              <Text style={{fontSize:22, fontWeight:'500'}}>Total: {price}</Text>
            </View> : null}
            {cartItems ? cartItems.map((order)=>(  
            <Pressable key={order.id} style={styles.shadowProp} title="Confirm" onPress={() => {
              setModalVisible(!modalVisible);
              PostOrder();
              PatchListing();
              setOrderItems([
                ...orderItems, 
                order
              ]);
            } 
              } >
            <Text style={{color:'white', fontSize:22}}>Confirm Order</Text>
          </Pressable> )) : null }
          </ScrollView>

        </View>
        
        
      </Cont> 
      
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{display:'flex', flexDirection:'column', width:'90%', justifyContent:'center', alignItems:'center'}}>
              <Text>Thank you for your order!</Text>
              <Pressable style={styles.shadowPropDark} title="Checkout" onPress={()=>{
                navigation.navigate('Orders', {orderItems} );
                setModalVisible(false)

              }} >
                <Text style={{color:'white', fontSize:18}}>View Order</Text>
              </Pressable>
              <Pressable style={styles.shadowPropLight} title="Add more" onPress={GoHome} >
                <Text style={{color:'white', fontSize:18}}>Home</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor:'#FE4265',
    width:'90%',
    height:50,
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
    fontSize:16
  },
  scrollView: {
    marginHorizontal: 0,
    width:'100%',
    position:'absolute',
    top:110,
    bottom:0,
    flex:1,
  },
  scrollViewMedium: {
    marginHorizontal: 0,
    width:'100%',
    position:'absolute',
    top:300,
    bottom:0,
  },
  scrollViewSmall: {
    marginHorizontal: 0,
    width:'100%',
    height:200,
    position:'absolute',
    top:120,
    bottom:0,
  },
  heading: {
    color:'white',
    fontSize:26,
    paddingLeft:'5%',
    paddingRight:'5%',
    fontWeight:'400',
    width:'100%',
  },
  starStyle: {
    width: 100,
    height: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex:2,
    backgroundColor:'rgba(0,0,0,0.25)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 0,
    alignItems: "center",
    justifyContent:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:250,
    height:200
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