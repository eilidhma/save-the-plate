// Adrian's's section - restaurant UI
import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import OrderCard from '../../comps/OrderCard'

export default function RestaurantHome ({  navigation }) {
    return (
      <LinearGradient colors={['#F3AE81', '#E94168']} style={homeStyles.container}>
          <OrderCard></OrderCard>
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