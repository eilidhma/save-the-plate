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
import moment from 'moment';


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
 height: 500px;
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
const ButtonCont = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
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
  width: 150px;
  height: 40px;
  margin:5px;
`

const DeselectedTime = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #FE4265;
  background-color: #ffffff;
  border-radius: 16px;
  width: 150px;
  height: 40px;
  margin:5px;
`

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputCont: {
    width: '100%',
    height:100,
    display: 'flex',
    justifyContent:'center',
    paddingTop:10,
    paddingLeft:10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FE4265',

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
  backButton: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor:'#FE4265',
    width:100,
    height:40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin:5,
    padding:5,
    borderRadius:20,
  },
  pinkButton: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor:'#FE4265',
    width:150,
    height:50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin:5,
    padding:5,
    borderRadius:20,
  },
  peachButton: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor:'#F3AD81',
    width:150,
    height:50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin:5,
    padding:5,
    borderRadius:20,
  },
});

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
  const date = moment(new Date()).add(30, "m").subtract(12, "h").toDate()

  setMealTime(date.getHours() + ":" + date.getMinutes() + "PM");
}

function FourtyPress () {
  setThirty(false);
  setFourty(true);
  setOne(false);
  setTwo(false);
  const date = moment(new Date()).add(45, "m").subtract(12, "h").toDate()

  setMealTime(date.getHours() + ":" + date.getMinutes() + "PM");
}

function OnePress () {
  setThirty(false);
  setFourty(false);
  setOne(true);
  setTwo(false);
  const date = moment(new Date()).add(60, "m").subtract(12, "h").toDate()

  setMealTime(date.getHours() + ":" + date.getMinutes() + "PM");
}

function TwoPress () {
  setThirty(false);
  setFourty(false);
  setOne(false);
  setTwo(true);
  const date = moment(new Date()).add(120, "m").subtract(12, "h").toDate()

  setMealTime(date.getHours() + ":" + date.getMinutes() + "PM");
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
    if(!isUnmount){
      var uid = auth.currentUser?.uid;
      const result = await axios.get('/meals.php')
      setMealsData(result.data);
      console.log(result.data)
    }
  
  })();

  return () => {
    isUnmount = true;
  }

}, [modalVisible]);

PostItems = async() => {
  for (var i = 0 ; i<count; i ++) {

    fuid = auth.currentUser?.uid
      const result = await axios.post('/listed.php', {
          modifications:mealMods,
          time_avail:mealTime,
          fuid:fuid,
          m_name:mealName,
          m_id:mid,
          status:"active"
      });
    }
setItemStep(1);
setModalVisible(!modalVisible);
}

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
        <Text style={{color:'#FE4265', fontSize:16, fontWeight:'bold', marginBottom:10}}>Select the item to list</Text>
      </View>
      <View style={{width: '100%'}}>
        <ScrollView contentContainerStyle={{width: '100%', alignItems:'center', height:'100%'}}>
          {mealsData ? mealsData.filter((x)=> {return x.fuid === auth.currentUser?.uid}).map((meals) => (
            <But 
            key={meals.mid} 
            text={meals.m_name} 
            onPress={()=> {
              setItemStep(2)
              setMid(meals.mid)
              setMealName(meals.m_name)}} 
            margintop="10px"
            height="50px"/>
          )) : null}
        </ScrollView>
      </View>
    </View>
    }

    {addItemStep === 2 && <View style={{flex: 1, flexDirection: "column", height: "100%"}}>
      <View style={{position: "relative"}}>
        <Pressable style={styles.backButton}
          onPress={()=>{
            setItemStep(1);
            Reset();}}>
          <Text style={{color:"white"}}>{"<"} Back</Text>
        </Pressable>
        {/* <But
          text="< Back"
          onPress={()=>{
            setItemStep(1);
            Reset();}}
          width="100px"
          height="40px"/> */}
      </View>
      
        <TitleCont style={{paddingTop:10, paddingBottom:15}}>
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
      
        <TextInput 
          style={styles.inputCont}
          multiline
          numberOfLines={5}
          onChangeText={(text)=>setMealMods(text)} 
          placeholder="Add modifications"/>
        
        <View style={{flex: 1, flexDirection: "column", paddingBottom: 20, paddingTop: 20, height: 10}}>
          <Text style={{paddingBottom:10}}>Available in:</Text>
            <ButtonCont>
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
            </ButtonCont>

            <ButtonCont>
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
            </ButtonCont>
        </View>
        
        {/* <View style={{flex:1 , justifyContent:'space-evenly', flexDirection:'column'}}>
        <Text>Edit Dietary Restriction:</Text>
        <DietSelect/>
        </View> */}

        
        <ButtonCont>
          <Pressable style={styles.pinkButton}
            onPress={PostItems}>
            <Text style={{color:'white', fontSize:18}}>List Item</Text>
          </Pressable>
          <Pressable style={styles.peachButton}
            onPress={()=>{
            setModalVisible(!modalVisible)
            setItemStep(1)
            setCount(1)
            Reset()
          }}>
            <Text style={{color:'white', fontSize:18}}>Cancel</Text>
          </Pressable>
        </ButtonCont>
    </View>
    }
  </AddListingModal>

  </Modal>
  </Cont>
}

export default RestaurantNav;