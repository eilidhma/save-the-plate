// Adrian's's section - restaurant UI
import React from "react";
import { StyleSheet, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import {
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300, Quicksand_300Light, Quicksand_400Regular
} from '@expo-google-fonts/quicksand';
import { useFonts } from 'expo-font';


import RatingCard from "../../comps/customer/RatingCard";

export default function RestaurantAccount ({  navigation }) {
    return (
      <LinearGradient colors={['#F3AE81', '#E94168']} style={homeStyles.container}>

      <Text>This is restaurant acc</Text>
      <RatingCard/>

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