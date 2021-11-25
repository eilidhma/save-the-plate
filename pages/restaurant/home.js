// Adrian's's section - restaurant UI
import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
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

import Tabs from '../../comps/global/Tabs'

import Search from "../../comps/Restaurant/SearchBar";

import BubbleRest from "../../comps/Restaurant/BubbleRest";



export default function RestaurantHome ({  navigation }) {

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

    // !--------- Tutorial ----------!
    const [card, setCard] = useState(0)
    const [bubble, setBubble] = useState(true)
    const [heading, setHeading] = useState("Here's your Home page. \n Let's break it down!")
    const [subheading, setSubheading] = useState("")
    const [img, setImg] = useState("../../../assets/meal.png")
    const [back, setBack] = useState("< Back")
    const [next, setNext] = useState("Next >")
    const [visibility, setVisibility] = useState(false)
  
    const HandleBubbleNext = () => {
      if(card === 0){
        setCard(1)
        setVisibility(true)
        setHeading("The 'Orders' tab allows you to see the orders that will be picked up by a customer")
        setSubheading("The 'Listed' tab allows you to see the meals that you have listed for pickup by customers")
      }
      if(card === 1){
        setCard(2)
        setHeading("This icon will lead you back \n to the Home page")
        setSubheading("This icon will lead you \n to your profile")
      }
      if(card === 2){
        setCard(3)
        setHeading("When a customer comes to your restaurant to pickup \n their order, press the button 'More details'")
        setSubheading("Then, press the button to 'Confirm pick-up'")
      }
      if(card === 3){
        setCard(4)
        setHeading("")
        setSubheading("This icon will open the \n 'Add an item' window, to list \n a meal in your 'Listed' tab")
      }
      if(card === 4){
        setCard(5)
        setHeading("")
        setSubheading("Then, you will be able to \n add all the details to the \n item you are listing.")
        setNext("Done")
      }
      if(card === 5){
        setCard(0)
        setVisibility(false)
        setHeading("Here's your Home page. \n Let's break it down!")
        setSubheading("")
        setBubble(false)
        setNext("Next >")
      }
    }
    const HandleBubbleBack = () => {
      if(card === 1){
        setCard(0)
        setVisibility(false)
        setHeading("Here's your Home page. \n Let's break it down!")
        setSubheading("")
      }
      if(card === 2){
        setCard(1)
        setHeading("The 'Orders' tab allows you to see the orders that will be picked up by a customer")
        setSubheading("The 'Listed' tab allows you to see the meals that you have listed for pickup by customers")
      }
      if(card === 3){
        setCard(2)
        setHeading("This icon will lead you back \n to the Home page")
        setSubheading("This icon will lead you \n to your profile")
      }
      if(card === 4){
        setCard(3)
        setHeading("When a customer comes to your restaurant to pickup \n their order, press the button 'More details'")
        setSubheading("Then, press the button to 'Confirm pick-up'")
      }
      if(card === 5){
        setCard(4)
        setHeading("")
        setSubheading("This icon will open the \n 'Add an item' window, to list \n a meal in your 'Listed' tab")
        setNext("Next >")
      }
    }
    // NEED TO INCLUDE FOLLOWING LINE FOR TUTORIAL RESTAURANT
    // <BubbleRest show={bubble} heading={heading} subheading={subheading} img={img} back={back} next={next} onPress1={HandleBubbleNext} onPress2={HandleBubbleBack} opacity={visibility}/>
  
    // !--------- End Of Tutorial ----------!


    return (
      <LinearGradient colors={['#F3AE81', '#E94168']} style={homeStyles.container}>
        
        <View style={{width:'100%', position:'absolute', top:80, display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Tabs onPressMeal={HandleMealTab} onPressMap={HandleMapTab}
          fontWeightMeals={mealtab ? 400 : 200}
          fontWeightMap={maptab ? 400 : 200}
          alignItems={mealtab ? 'flex-start' : 'flex-end'}
          />
          <View style={{width:'90%'}}>
            <Search/>
          </View>
      </View>

      {mealtab === true && <View style={{marginHorizontal: 0,
            width:'100%',
            position:'absolute',
            top:170,
            bottom:0,
            flex:1}}>
        <ScrollView contentContainerStyle={{width:'100%', alignItems:'center', paddingBottom:105}}>
          <OrderCard/>
          <OrderCard/>
          <OrderCard/>
          <OrderCard/>
          <OrderCard/>
          <OrderCard/>
        </ScrollView>
        </View>}
      
        {mealtab === false && <View style={{marginHorizontal: 0,
            width:"100%",
            position:'absolute',
            top:170,
            bottom:0,
            flex:1}}>
        <ScrollView contentContainerStyle={{width:'100%', alignItems:'center', paddingBottom:105}}>
          <ListingCard/>
          <ListingCard/>
          <ListingCard/>
          <ListingCard/>
          <ListingCard/>
          <ListingCard/>
        </ScrollView>
        </View>}
        
        
          
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