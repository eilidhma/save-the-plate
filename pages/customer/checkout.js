import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
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

import { SimpleLineIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

var map = require ('../../assets/checkout_map_placeholder.png');
const Stack = createNativeStackNavigator();

//imported components
import AddedItem from '../../comps/customer/AddedItem'
import But from '../../comps/global/Button'

const MainArea = styled.View`
  width: 100%;
  height: 82%;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 9px;
  padding-bottom: 120px;
`;

const TitleCont = styled.View`
  width: 100%;
  height: 13.2%;
  padding-left: 5%;
  padding-right: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`;

const TitleDivider = styled.View`
  width: 100%;
  height: 2px;
  background-color: #ffffff;
  margin-top: 4px;
`;

const RestaurantCont = styled.View`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`

const StarCont = styled.View`
  width: 144px;
  justify-content: space-between;
  flex-direction: row;
`;

const LocationCont = styled.View`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

const TotalCont = styled.View`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const PayCont = styled.View`
  width: 90%;
  height: 75px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 20px;
  border: 1px solid #C4C4C4;
`;

const VisaCont = styled.View`
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;


export default function Checkout({ navigation }) {
  return (
    <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>

      <TitleCont>
        <Text style={{fontSize: 26, color: 'white'}}>Checkout</Text>
        <TitleDivider/>
      </TitleCont>


      <MainArea>
        <RestaurantCont>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>Fratelli's Bistro</Text>
          <StarCont>
            <SimpleLineIcons name="star" size={24} color="#FE4265" />
            <SimpleLineIcons name="star" size={24} color="#FE4265" />
            <SimpleLineIcons name="star" size={24} color="#FE4265" />
            <SimpleLineIcons name="star" size={24} color="#FE4265" />
            <SimpleLineIcons name="star" size={24} color="#FE4265" />
          </StarCont>
        </RestaurantCont>

        <LocationCont>
          <Entypo name="location-pin" size={18} color="black" />
          <Text> 12km away</Text>
        </LocationCont>


        <TouchableOpacity style={{width:"90%", height: 187, backgroundColor: 'black'}}>
          <Image source={{uri:"https://placekitten.com/"}}/>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={{width:'100%', alignItems:'center'}}>
          <AddedItem/>
          <AddedItem/>
          <AddedItem/>
          <AddedItem/>
        </ScrollView>

        <TotalCont>
          <Text style={{fontSize: 20, fontWeight: "bold"}}>Total: $5.00</Text>
        </TotalCont>

        <PayCont>
          <VisaCont>
            <View style={{backgroundColor: 'black', width:58, height:18}}></View>
            <Text>**** **** **** 2345</Text>
          </VisaCont>

          <But width="100px" height="29px" text="Change" bgColor="#F3AD81"/>
        </PayCont>

        <But text="Confirm order"/>
      </MainArea>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
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
  }
});
