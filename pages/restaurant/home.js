// Adrian's's section - restaurant UI
import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import {
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300, Quicksand_300Light, Quicksand_400Regular
} from '@expo-google-fonts/quicksand';
import { useFonts } from 'expo-font';

import AddedItem from "../../comps/customer/AddedItem";

import ListingCard from '../../comps/Restaurant/ListingCard'
import OrderCard from '../../comps/Restaurant/OrderCard'
import AddedItemOverlay from "../../comps/customer/AddedItemOverlay";


export default function RestaurantHome ({  navigation }) {
    return (
      <LinearGradient colors={['#F3AE81', '#E94168']} style={homeStyles.container}>
        {/* <AddedItem/>
        <ListingCard/>
        <OrderCard/>
        <AddedItemOverlay/> */}


        
    </LinearGradient>
    )
  }

  const homeStyles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center' 
    }
  });