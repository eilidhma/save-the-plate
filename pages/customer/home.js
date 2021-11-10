import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button, Pressable, TextInput,  SafeAreaView, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialIcons, Ionicons, MaterialCommunityIcons, SimpleLineIcons, AntDesign } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styled from 'styled-components';
import CustMealCard from '../../comps/customer/CustMealCard';
import Tabs from '../../comps/customer/Tabs';
import Location from '../../comps/customer/Location';

import MapView from 'react-native-maps';
import Filters from '../../comps/customer/Filters';
import CustCurrentOrder from '../../comps/customer/CustCurrentOrder';
import SimpleOrderCard from '../../comps/customer/SimpleOrderCard';


var map = require ('../../assets/map.png');

export default function Home({
  navigation,
  total="$5.00"
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

  const [modalVisible, setModalVisible] = useState(false);

  const CheckOut = () => {
    navigation.navigate('Cart')
    setModalVisible(false)
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
            <Location />
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
        <ScrollView contentContainerStyle={{width:'100%', alignItems:'center', paddingBottom:105}}>
            <Filters/>
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
        </View>}
        {maptab === true && <View style={{marginHorizontal: 0,
            width:'100%',
            position:'absolute',
            top:200,
            flex:1,
            justifyContent:'center',
            alignItems:'center'}}>
            <MapView style={{width:'100%', height:600}}/>
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
    marginTop: 22,
    zIndex:2
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
  }
});
