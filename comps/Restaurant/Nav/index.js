import React, { useState } from 'react';
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


import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Search from '../SearchBar'
import But from '../../global/Button';

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
 height: 579px;
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

const RestaurantNav = ({ 
  home="white",
  account="white",
}) =>{

  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  const [nav, setNav] = useState(0)


  const [modalVisible, setModalVisible] = useState(false);

  const [addItemStep, setItemStep] = useState(1)

  onPressHome=()=>{
    setNav(0)
    navigation.navigate('RestaurantHome')
  }
  
  onPressAccount=()=>{
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


  
  return <Cont >
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
      }}>
      <AntDesign name="close" size={13} color="#C4C4C4" />
    </CloseModal>

    {addItemStep === 1 && <View>
      <View>
        <Search/>
      </View>
      <View style={{width: '100%'}}>
        <ScrollView contentContainerStyle={{width: '100%', alignItems:'center'}}>
          <But text="Fettucini Alfredo" onPress={()=>setItemStep(2)} margintop="10px"/>
          <But text="Fettucini Alfredo" onPress={()=>setItemStep(2)} margintop="10px"/>
          <But text="Fettucini Alfredo" onPress={()=>setItemStep(2)} margintop="10px"/>
          <But text="Fettucini Alfredo" onPress={()=>setItemStep(2)} margintop="10px"/>
          <But text="Fettucini Alfredo" onPress={()=>setItemStep(2)} margintop="10px"/>
          <But text="Fettucini Alfredo" onPress={()=>setItemStep(2)} margintop="10px"/>
          <But text="Fettucini Alfredo" onPress={()=>setItemStep(2)} margintop="10px"/>
          <But text="Fettucini Alfredo" onPress={()=>setItemStep(2)} margintop="10px"/>
          <But text="Fettucini Alfredo" onPress={()=>setItemStep(2)} margintop="10px"/>
          <But text="Fettucini Alfredo" onPress={()=>setItemStep(2)} margintop="10px"/>
        </ScrollView>
      </View>
    </View>
    }

    {addItemStep === 2 && <View>
      <View>
        <But text="< Back" onPress={()=>setItemStep(1)} width="145px"/>

        <TitleCont>
          <Text>
            Fettucini Alfredo
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
          <TextInput editable placeholder="add description"/>
        </DescriptionCont>

            {/* Alicia and Maharlika work here  */}

            {/* needs "Available in:" */}

            {/* as well as the 4 toggleable buttons */}

            {/* it should be set up so you can only click one at a time */}


        
        <TitleCont>
          <But width="182px" height="50px" text="List Item"/>
          <But width="182px" height="50px" text="Cancel" bgColor="#F3AD81"/>
        </TitleCont>
      </View>
    </View>
    }
  </AddListingModal>

  </Modal>
  </Cont>
}

export default RestaurantNav;