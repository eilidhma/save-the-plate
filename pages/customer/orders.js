import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useFonts,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300, Quicksand_300Light
} from '@expo-google-fonts/quicksand';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styled from 'styled-components';
import CustCurrentOrder from '../../comps/customer/CustCurrentOrder';
import CustMealCard from '../../comps/customer/CustMealCard';
import PastOrder from '../../comps/customer/PastOrder';
import axios from 'axios';
import { auth, storage } from '../../firebase';

var logo = require ('../../assets/logo1.png');
const Stack = createNativeStackNavigator();

export default function Orders({ navigation, route }) {

//const {orderItems} = route.params;
//console.log(orderItems[0].id);

var orderItems = null;
if(route.params && route.params.orderItems){
  orderItems = route.params.orderItems;
  console.log(orderItems)
}
console.log(orderItems)
const [pastOrders, setPastOrders] = useState()
const [status, setStatus] = useState("complete")

var userId = auth.currentUser?.uid


useFocusEffect(
  React.useCallback(()=>{
    
    (async () => {
      const result = await axios.get('/orders.php?u_id='+userId);
      
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
      
      setPastOrders(result.data);

    })();
  },[])
)

console.log(pastOrders)


  return (
    <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>
      <View style={{width:'100%', position:'absolute', top:80, display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Text style={styles.heading}>Current Orders</Text>
      </View>
      <ScrollView style={styles.scrollViewSmall}>
        <View style={{display:'flex', justifyContent:'center', alignItems:'center', overflow:'hidden'}}>
        {pastOrders ? pastOrders.filter((x)=> {return x.status === 'active'}).map((past) => (
            <CustCurrentOrder 
              key={past.oid}
              meal={past.m_name}
              restaurant={past.full_name}
              newprice={past.new_price}
              oldprice={past.old_price}
              quantity={1}
              src={past.url}
            /> 
          )) : <View>
            <Text>No current order</Text>
            </View>}
            
        </View>
      </ScrollView>
      <View style={{width:'90%', backgroundColor:'white', height:2, position:'absolute', top:320}}></View> 
      <View style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center', position:'absolute', top:340,}}>
        <Text style={{color:'white', fontSize:26, paddingLeft:'5%', paddingRight:'5%', fontWeight:'400', width:'100%'}}>Past Orders</Text>
      </View> 
      <View style={styles.scrollView}>
      <ScrollView contentContainerStyle={{width:'100%', alignItems:'center', paddingBottom:105}}>
      {/* {pastOrders ? pastOrders.filter((x)=> {return x.status === 'complete'}).map((past) => ( */}
      {pastOrders ? pastOrders.filter((x)=> {return x.status === 'complete'}).map((past) => (
        <PastOrder 
        key={past.oid}
        meal={past.m_name}
        restaurant={past.full_name}
        src={past.url}
        />
      )) : null}

      </ScrollView>
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
  },
  scrollView: {
    marginHorizontal: 0,
    width:'100%',
    position:'absolute',
    top:380,
    bottom:0,
    flex:1,
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
});
