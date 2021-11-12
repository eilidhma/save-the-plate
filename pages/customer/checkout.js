import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput, ScrollView, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styled from 'styled-components';
import CustCurrentOrder from '../../comps/customer/CustCurrentOrder';
import CustMealCard from '../../comps/customer/CustMealCard';
import PastOrder from '../../comps/customer/PastOrder';
import StarRating from 'react-native-star-rating';
import { SimpleLineIcons } from '@expo/vector-icons';


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
}) {

  const [modalVisible, setModalVisible] = useState(false);

  const ViewOrder = () => {
    navigation.navigate('Orders')
    setModalVisible(false)
  }

  const GoHome = () => {
    navigation.navigate('Home')
    setModalVisible(false)
  }

  
  return (
    <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>
      <View style={{width:'100%', position:'absolute', top:80, display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Text style={styles.heading}>Checkout</Text>
      </View>
      <View style={{width:'90%', backgroundColor:'white', height:2, position:'absolute', top:118}}></View> 
      <Cont>
        <TitleCont>
          <Text style={{fontSize:30}}>{restaurant}</Text>
          <StarRating
            disabled={false}
            maxStars={5}
            starSize="30"
            // rating={state.starCount}
            // selectedStar={(rating) => this.onStarRatingPress(rating)}
            // fullStarColor = 
          />
        </TitleCont>
        <Distance>
          <SimpleLineIcons style={{marginRight:5}} name="location-pin" size={18} color="black" />
          <Text style={{fontSize:16, color:'black'}}>{distance}<Text> away</Text></Text>
        </Distance>
        <View style={styles.scrollView}>
           <ScrollView contentContainerStyle={{width:'100%', alignItems:'center', paddingBottom:300}}>
            <View style={{
            width:'100%',
            justifyContent:'center',
            alignItems:'center'}}>
              <Image style={{width:'90%', height:150}} source={map}></Image>
            </View>
            <CustCurrentOrder />
            <View style={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', paddingLeft:20, paddingRight:20, marginTop:30, flexDirection:'row'}}>
              <View style={{width:120, display:'flex', flexDirection:'row'}}>
                <Image style={{width:50, height:15}} source={cardtype}></Image>
                <Text style={{marginLeft:5}}>***7896</Text>
              </View>
              <Text style={{fontSize:22, fontWeight:'500'}}>Total: {price}</Text>
            </View>
            <Pressable style={styles.shadowProp} title="Confirm" onPress={() => setModalVisible(!modalVisible)} >
            <Text style={{color:'white', fontSize:22}}>Confirm Order</Text>
          </Pressable>
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
              {/* <Image source={src} style={{width:100, height:100}}/> */}
              <Pressable style={styles.shadowPropDark} title="Checkout" onPress={ViewOrder} >
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
});
