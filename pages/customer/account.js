import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput, Modal } from 'react-native';
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
import { Feather, MaterialIcons, Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import PlatesSaved from '../../comps/customer/PlatesSaved';
import InfoCard from '../../comps/customer/InfoCard';
import { auth } from '../../firebase';
import axios from 'axios'
import BubbleCust from '../../comps/customer/BubbleCust';


var logo = require ('../../assets/logo1.png');
const Stack = createNativeStackNavigator();

const TopCont = styled.Pressable`
  display:flex;
  flex-direction:row;
  width:90%;
  justify-content:flex-start;
  align-items:center;
  position:absolute;
  top:80px;
`

const IconCont = styled.Pressable`
  display:flex;
  border-radius:100px;
  border:2px solid white;
  width:100px;
  height:100px;
  justify-content:center;
  align-items:center;
`

const Cards = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
  position:absolute;
  top:190px;
  width:100%;
`

export default function Checkout({
  navigation,
  user="John Smith"
}) {

  const [name, setName] = useState()
  const [phone, setPhone] = useState()
  const [platesSaved, setPlatesSaved] = useState()
  const [address1, setAddress1] = useState()
  const [address2, setAddress2] = useState()
  const [postalCode, setPostalCode] = useState()
  const [city, setCity] = useState()
  const [province, setProvince] = useState()
  
  const UserData = async (uid) => {
    const result = await axios.get('/users.php?fuid=' + uid)
    setName(result.data[0].full_name)
    setPhone(result.data[0].phone)
    setPlatesSaved(result.data[0].plates_saved)
    setAddress1(result.data[0].add1)
    setAddress2(result.data[0].add2)
    setPostalCode(result.data[0].postal_code)
    setCity(result.data[0].city)
    setProvince(result.data[0].province)
  }

  useEffect(()=>{
    var userid = auth.currentUser?.uid
    UserData(userid);
  }, []);

  const handleSignOut = () => {
    auth
    .signOut()
    .then(()=> {
      navigation.replace('Login')
      console.log('Logged out');
    })
    .catch(error => alert(error.message))
  }

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{display:'flex', flexDirection:'column', width:'90%', justifyContent:'center', alignItems:'center'}}>
              <View style={{position:'relative', left:150}}>
                <Pressable  onPress={()=>setModalVisible(!modalVisible)}>
                  <AntDesign name="close" size={24} color="black" />
                </Pressable> 
              </View>
              <BubbleCust />
            </View>
          </View>
        </View>
      </Modal>
      <TopCont>
        <IconCont>
          <MaterialCommunityIcons name="account" size={60} color="white" />
        </IconCont>
      <Text style={{fontSize:30, fontWeight:'400', color:'white', marginLeft:20}}>{name}</Text>
      </TopCont>
      <Cards>
        <PlatesSaved quantity={25}/>
        <InfoCard title="Contact Information" sectiontitle1="Phone number:" sectiontitle2="Address:" phone={phone} addressline1={address1 + " " + address2} addressline2={postalCode + " " + city + ", " + province} edit="Edit Contact Information"/>
        <InfoCard title="Payment Information" sectiontitle1="Card Number:" sectiontitle2="Expiration Date:" cvc="CVC" phone="**** **** **** 8954" addressline1="**/**" addressline2="***" edit="Edit Credit Card Information"/>
        <Pressable style={styles.whiteButton} title="Tutorial" onPress={()=>{
          setModalVisible(true)
        }} >
          <Text style={{fontSize:18, color:'#E94168'}}>Tutorial</Text>
        </Pressable>
        <Pressable style={styles.whiteButton} title="< Back" onPress={handleSignOut} >
          <Text style={{fontSize:18, color:'#E94168'}}>Sign Out</Text>
        </Pressable>
      </Cards>
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
    backgroundColor:'#F3AE81',
    width:200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    padding:5,
    borderRadius:20,
  },
  whiteButton: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor:'white',
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
    justifyContent:'flex-end',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:350,
    height:550
  },
});
