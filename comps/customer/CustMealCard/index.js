import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput, LayoutAnimation, Platform, UIManager } from 'react-native';
import styled from 'styled-components';
import { Feather, MaterialIcons, Ionicons, MaterialCommunityIcons, SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import Diets from '../../global/Diets';
import DietSelect from '../../global/DietSelect';

import {
  useFonts,
  Raleway_700Bold,
  Raleway_400Regular,
  Raleway_600SemiBold
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300, Quicksand_300Light, Quicksand_400Regular,
  Quicksand_700Bold
} from '@expo-google-fonts/quicksand';

import app from '../../../firebase';


const CardCont = styled.View`
  height:${props=>props.height};
  background-color:white;
`;

const TopContent = styled.View`
  display:flex;
  width:90%;
  flexDirection:row;
`
const BottomContent = styled.View`
  display:flex;
  width:90%;
  flexDirection:row;
`

const RestCont = styled.View`
  display:flex;
  width:100%;
  flexDirection:row;
  justify-content:space-between;
  align-items:center;
  height:40px;
`;

const PriceCont = styled.View`
  display:flex;
  width:60%;
  flexDirection:row;
  justify-content:flex-start;
  align-items:center;
`;

const DetailsCont = styled.Pressable`
  display:flex;
  width:40%;
  flexDirection:row;
  justify-content:flex-end;
  align-items:center;
`;


const TopLeft = styled.View`
  display:flex;
  margin:15px;
  flexDirection:column;
  flex:1;
`

const TopRight = styled.View`
  display:flex;
  margin:15px;
  flexDirection:column;
  flex:2;
`

const BottomLeft = styled.View`
  display:flex;
  margin:15px;
  flexDirection:column;
  flex:1;
  justify-content:space-between;
  height:100px;
`

const BottomRight = styled.View`
  display:flex;
  margin:15px;
  flexDirection:column;
  flex:2;
  justify-content:space-between;
`

const Plates = styled.View`
  display:flex;
  flexDirection:column;
  width:30px;
  justifyContent:center;
  alignItems:center;
`

const TextCont = styled.View`
  display:flex;
  flexDirection:column;
  justifyContent:center;
  alignItems:flex-start;
  height:50px;
`

const Cart = styled.Pressable`
  display:flex;
  flex-direction:row;
  background-color:#FE4265;
  position:absolute;
  bottom:0;
  width:100%;
  z-index:10;
  justify-content:center;
  align-items:center;
  height:30px;
`


const AddToCart = styled.Text`
  color:white;
  font-size:18px;
  font-family:Raleway_600SemiBold;
`

// var mealImg = require('../../assets/meal.png');

const CustMealCard = ({
  src="https://placekitten.com/200/200",
  plateImg=require("../../../assets/plate.png"),
  restaurant="Fratelli's Bistro", //fix this
  meal="Fettuccine Alfredo",
  distance="400",
  plates="217",
  description="fettuccine pasta tossed with Parmesan cheese and butter and served with garlic toast on the side",
  newprice="$5.00",
  oldprice="$21.00",

  modifications="mods",
  showDairy=false,
  showGluten=false,
  showNut=false,
  showVege=false,
  addToCart=()=>{}
}) =>{
        
  const [card, setCard] = useState("170px")
  const [rotation, setRotation] = useState(0)

  const HandleCard = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCard(card === "170px" ? "360px" : "170px");
    setRotation(rotation === 0 ? 180 : 0);
  };

  return <View style={styles.content}>

  <CardCont style={styles.container} height={card}>
    <Cart>
      <AntDesign style={{paddingRight:7}} name="pluscircleo" size={20} color="white" />
      <AddToCart onPress={addToCart} >Add to cart</AddToCart>
    </Cart>
    <TopContent>
      <TopLeft>
        <Image style={{width:115, height:105, borderRadius:15}} source={{uri:src}}/>
      </TopLeft>
      <TopRight>
        <View style={{display:'flex', justifyContent:"flex-start", alignContent:'flex-start'}}>
        <Text style={{fontSize:18, fontWeight:'bold', width:'100%', fontFamily:'Raleway_600SemiBold'}}>{meal}</Text>
        </View>
        <RestCont>
          <Text style={{fontSize:16, fontFamily:'Quicksand_400Regular'}}>{restaurant}</Text>
          <Text style={{fontSize:14, fontFamily:'Quicksand_400Regular'}}>{distance}m away</Text>
        </RestCont>
        <View style={{width:'100%', height:40, display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <PriceCont>
            <Text style={{fontSize:16, color:'#FE4265', fontFamily:'Quicksand_700Bold'}}>{newprice}</Text>
            <Text style={{fontSize:12, marginLeft:5, fontFamily:'Quicksand_400Regular', textDecorationLine:'line-through'}}>{oldprice}</Text>
          </PriceCont>
          <DetailsCont onPress={HandleCard}>
            <Pressable onPress={HandleCard}><Text style={{fontSize:18, fontFamily:'Raleway_600SemiBold', fontWeight:'600', color:'#FE4265'}}>Details</Text></Pressable>
            <MaterialIcons style={{marginTop:-5, transform: [{ rotate: rotation+"deg" }]}} name="arrow-drop-down" size={33} color="#FE4265" />
          </DetailsCont>
        </View>
      </TopRight>
    </TopContent>
    <BottomContent>
      <BottomLeft>
        <TextCont>
          <Text style={{fontSize:16, fontFamily:'Quicksand_400Regular'}}>Description:</Text>
        </TextCont>
        <TextCont>
          <Text style={{fontSize:16, fontFamily:'Quicksand_400Regular'}}>Modification:</Text>
        </TextCont>
        <TextCont>
          <Text style={{fontSize:16, fontFamily:'Quicksand_400Regular'}}>Dietary Information:</Text>
        </TextCont>
      </BottomLeft>
      <BottomRight>
        <TextCont>
          <Text style={{fontSize:12, fontFamily:'Quicksand_400Regular'}}>{description}</Text>
        </TextCont>
        <TextCont>
          <Text style={{fontSize:12, fontFamily:'Quicksand_400Regular'}}>{modifications}</Text>
        </TextCont>
        <TextCont>
          <Diets showDairy={showDairy} showGluten={showGluten} showVege={showVege} showNut={showNut}/>
        </TextCont>
      </BottomRight>
    </BottomContent>
  </CardCont>
  </View>
}

export default CustMealCard;

const styles = StyleSheet.create({
  container: {
    display:'flex',
    backgroundColor : "#0000",
    width:'100%',
    flexDirection:'column',
    borderRadius:15,
    overflow:'hidden',
    margin:10,
    backgroundColor:'white',
  },
  content: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation:3,
    borderRadius:15,
    width:'100%'
  }

});

