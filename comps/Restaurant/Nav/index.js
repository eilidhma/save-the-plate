import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import {
  useFonts,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300, Quicksand_300Light, Quicksand_400Regular
} from '@expo-google-fonts/quicksand';
import styled from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialIcons, Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import axios from 'axios';


import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Search from '../SearchBar'
import But from '../../global/Button';

import { auth } from '../../../firebase';
import { GetAuth, onAuthStateChanged } from 'firebase/auth';

import DietSelect from '../../global/DietSelect';


const Cont = styled.View`
  display:flex;
  flex-direction:row;
  width:100%;
  position:absolute;
  bottom:0;
  height:100px;
  border-color:white;
  border-top-width:2px;
  background-color:#FE4265;
`

const IconCont = styled.Pressable`
  display:flex;
  border-radius:20px;
  border:2px solid white;
  width:50px;
  height:50px;
  justify-content:center;
  align-items:center;
  background-color:${props=>props.backgroundColor};
`

const AddItem = styled.TouchableOpacity`
  width: 143px;
  height: 45px;
  border-radius: 20px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const AddListingModal = styled.View`
 display: flex;
 flex-direction: column;
 justify-content: space-between;
 width: 100%;
 height: 600px;
 padding-right: 5%;
 padding-left: 5%;
 padding-top: 40px;
 padding-bottom: 37px;
 background-color: #ffffff;
 border-radius: 30px;
 position: absolute;
 bottom: 0px;
`

const CloseModal = styled.TouchableOpacity`
  position: absolute;
  top:10px;
  right: 10px;
  width: 13px;
  height: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;

const TitleCont = styled.View`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const CounterCont = styled.View`
  width: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const Counter = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: 2px solid #000000;
`

const DescriptionCont = styled.View`
  width: 100%;
  padding: 14px;
  height: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 20px;
  border: 1px solid #FE4265;
`;

const SelectedTime = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FE4265;
  border-radius: 16px;
  width: 182px;
  height: 40px;
`

const DeselectedTime = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #FE4265;
  background-color: #ffffff;
  border-radius: 16px;
  width: 182px;
  height: 40px;
`


const RestaurantNav = ({ 
  home="white",
  account="white",
}) =>{

  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  const [nav, setNav] = useState(0)

  // modal stuff
  const [modalVisible, setModalVisible] = useState(false);
  const [addItemStep, setItemStep] = useState(1)

  const onPressHome=()=>{
    setNav(0)
    navigation.navigate('RestaurantHome')
  }
  
  const onPressAccount=()=>{
    setNav(1)
    navigation.navigate('RestaurantAccount')
  }


  const [count, setCount] = useState(1)
  
  function CountUp(){
  setCount(count+1)
}

function CountDown(){
  if (count == 1) {
    setCount(1)
  } else {
    setCount(count-1)
  }
}

//for timers

const [thirty, setThirty] = useState(false)
const [fourtyfive, setFourty] = useState(false)
const [onehour, setOne] = useState(false)
const [twohours, setTwo] = useState(false)

function ThirtyPress () {
  setThirty(true);
  setFourty(false);
  setOne(false);
  setTwo(false);
  setMealTime('00:30:00');
}

function FourtyPress () {
  setThirty(false);
  setFourty(true);
  setOne(false);
  setTwo(false);
  setMealTime('00:45:00')
}

function OnePress () {
  setThirty(false);
  setFourty(false);
  setOne(true);
  setTwo(false);
  setMealTime('01:00:00');
}

function TwoPress () {
  setThirty(false);
  setFourty(false);
  setOne(false);
  setTwo(true);
  setMealTime('02:00:00');
}

function Reset () {
  setThirty(false);
  setFourty(false);
  setOne(false);
  setTwo(false);
}

const [mealsData, setMealsData] = useState();

const [mealMods, setMealMods] = useState()
const [mealTime, setMealTime] = useState()
const [mealQuant, setMealQuant] = useState()
const [mealName, setMealName] = useState()
const [mid, setMid] = useState()

const [user, setUser] = useState();

useEffect(() => {

  let isUnmount = false;
  
  (async () => {
   
    const result = await axios.get('/meals.php');
    if(!isUnmount){
      setMealsData(result.data);
    }
  
  })();

  return () => {
    isUnmount = true;
  }

}, []);


  
  return <Cont>
    <LinearGradient style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-evenly', alignItems:'center'}} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(243,173,129)', 'rgba(243,173,129,0.5)', 'rgb(243,173,129)']}>
    <IconCont onPress={onPressHome} backgroundColor={nav === 0 ? "rgba(250,250,250,0.3)" : "rgba(250,250,250,0)"}>
      <Feather name="home" size={24} color={home} />
    </IconCont>

    <AddItem onPress={()=>setModalVisible(!modalVisible)}>
    <Feather name="plus" size={30} color="#FE4265" />
    </AddItem>
    
    <IconCont onPress={onPressAccount} backgroundColor={nav === 1 ? "rgba(250,250,250,0.3)" : "rgba(250,250,250,0)"}>
      <MaterialCommunityIcons name="account-outline" size={24} color={account} />
    </IconCont>

  </LinearGradient>

  {/* //modal stuff */}
  <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
  >
  
  <AddListingModal>
    <CloseModal onPress={()=>{
      setModalVisible(!modalVisible)
      setItemStep(1)
      setCount(1)
      Reset()
      }}>
      <AntDesign name="close" size={13} color="#C4C4C4" />
    </CloseModal>

    {addItemStep === 1 && <View>
      <View>
        <Search/>
      </View>
      <View style={{width: '100%'}}>
        <ScrollView contentContainerStyle={{width: '100%', alignItems:'center'}}>

          {mealsData ? mealsData.filter((x) => {return x.fuid === auth.currentUser.uid}).map((meals) => (
            <But 
            key={meals.mid} 
            text={meals.m_name} 
            onPress={()=> {
              setItemStep(2)
              setMid(meals.mid)
              setMealName(meals.m_name)}} 
            margintop="10px"/>
          )) : null}

        </ScrollView>
      </View>
    </View>
    }

    {addItemStep === 2 && <View style={{flex: 1,flexDirection: "column", justifyContent: "space-between", height: "100%"}}>
      <View style={{position: "relative"}}>
        <But
          text="< Back"
          onPress={()=>{
            setItemStep(1);
            Reset();}}
          width="125px"
          height="40px"/>
      </View>

        <TitleCont style={{paddingBottom: 15, paddingTop: 15}}>
          <Text>
            {mealName}
          </Text>

          <CounterCont>
            <Counter onPress={CountDown}>
              <AntDesign name="minus" size={15} color="black" />
            </Counter>

            <Text>
              {count}
            </Text>

            <Counter onPress={CountUp}>
              <AntDesign name="plus" size={15} color="black" />
            </Counter>
          </CounterCont>
        </TitleCont>
        <DescriptionCont>
          <TextInput onChangeText={(text)=>setMealMods(text)} editable placeholder="Add modifications"/>
        </DescriptionCont>
        
        <View style={{flex: 1, flexDirection: "column", justifyContent: "space-between", paddingBottom: 20, paddingTop: 20, height: 10}}>
          <Text>Available in:</Text>
            <TitleCont>
              {thirty === true 
                ? <SelectedTime>
                    <Text style={{color:"white"}}>30 minutes</Text>
                  </SelectedTime>
                : <DeselectedTime onPress={ThirtyPress}>
                    <Text style={{color: "#FE4265"}}>30 minutes</Text>
                  </DeselectedTime>
              }

              {fourtyfive === true 
                ? <SelectedTime>
                    <Text style={{color:"white"}}>45 minutes</Text>
                  </SelectedTime>
                : <DeselectedTime onPress={FourtyPress}>
                    <Text style={{color: "#FE4265"}}>45 minutes</Text>
                  </DeselectedTime>
              }
            </TitleCont>

            <TitleCont>
              {onehour === true 
                ? <SelectedTime>
                    <Text style={{color:"white"}}>1 hour</Text>
                  </SelectedTime>
                : <DeselectedTime onPress={OnePress}>
                    <Text style={{color: "#FE4265"}}>1 hour</Text>
                  </DeselectedTime> 
              }

              {twohours === true 
                ? <SelectedTime>
                    <Text style={{color:"white"}}>2 hours</Text>
                  </SelectedTime>
                : <DeselectedTime onPress={TwoPress}>
                    <Text style={{color: "#FE4265"}}>2 hours</Text>
                  </DeselectedTime>
              }
            </TitleCont>
        </View>
        
        <View style={{flex:1 , justifyContent:'space-evenly', flexDirection:'column'}}>
        <Text>Edit Dietary Restriction:</Text>
        <DietSelect/>
        </View>

        
        <TitleCont>
          <But onPress={
            async (fuid) => {

              setItemStep(1);
              setModalVisible(!modalVisible);
            
              fuid = auth.currentUser?.uid
              const result = await axios.post('/listed.php', {
                modifications:mealMods,
                time_avail:mealTime,
                fuid:fuid,
                m_name:mealName,
                m_id:mid
              });
          }} width="182px" height="50px" text="List Item"/>
          <But width="182px" height="50px" text="Cancel" bgColor="#F3AD81"
          onPress={()=>{
            setModalVisible(!modalVisible)
            setItemStep(1)
            setCount(1)
            Reset()
            }}/>
        </TitleCont>
    </View>
    }
  </AddListingModal>

  </Modal>
  </Cont>
}

export default RestaurantNav;