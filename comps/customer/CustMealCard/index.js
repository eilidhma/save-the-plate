import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput, LayoutAnimation, Platform, UIManager } from 'react-native';
import styled from 'styled-components';
import { Feather, MaterialIcons, Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import Diets from '../../global/Diets';
import DietSelect from '../../global/DietSelect';

import app from '../../../firebase';
import { fireDB } from '../../../firebase';
import { collection, doc, setDoc, getDocs } from "firebase/firestore";





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
`

// var mealImg = require('../../assets/meal.png');

const CustMealCard = ({
  src=require("../../../assets/meal.png"),
  plateImg=require("../../../assets/plate.png"),
  restaurant="Fratelli's Bistro", //fix this
  meal="Fettuccine Alfredo",
  distance="400m away",
  plates="217",
  description="fettuccine pasta tossed with Parmesan cheese and butter and served with garlic toast on the side",
  newprice="$5.00",
  oldprice="$21.00",
  // height="170px",
  addToCart=()=>{}
}) =>{

  /* START OF FIREBASE STUFF */
  
    const [restaurants, setRestaurants] = useState([]);
    const restaurantsCollectionRef = fireDB.collection("restaurants")

// this works :D
    restaurantsCollectionRef.doc("test3").set({
      name: "hellooo",
      city: "van" 
    });
    restaurantsCollectionRef.doc("test4").set({
      name: "hello",
      city: "white rock" 
    });

  
    
    var restRef = restaurantsCollectionRef.doc("test4");

    restRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

/* END OF FIREBASE STUFF */
        
  const [card, setCard] = useState("170px")
  const [rotation, setRotation] = useState(0)

  const HandleCard = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCard(card === "170px" ? "330px" : "170px");
    setRotation(rotation === 0 ? 180 : 0);
    console.log(firestore)
  };

  return <View style={styles.content}>

  <CardCont style={styles.container} height={card}>
    <Cart>
      <AddToCart onPress={addToCart} >+ Add to cart</AddToCart>
    </Cart>
    <TopContent>
      <TopLeft>
        <Image style={{width:115, height:105, borderRadius:15}} source={src}/>

        <Text style={{marginTop:30, fontSize:16}}>Description:</Text>
        {/* <Text style={{marginTop:30, fontSize:16}}>Restaurant's Rating:</Text> */}
        <Text style={{marginTop:60, fontSize:16}}>Dietary Information:</Text>
      </Left>
      <Right>
        <Text style={{fontSize:20}}>{meal}</Text>

      </TopLeft>
      <TopRight>
        <View style={{display:'flex', justifyContent:"flex-start", alignContent:'flex-start'}}>
        <Text style={{fontSize:18, fontWeight:'bold', width:'100%'}}>{meal}</Text>
        </View>

        <RestCont>
          <Text style={{fontSize:14}}>{restaurant}</Text>
          <Text style={{fontSize:12}}>{distance}</Text>
        </RestCont>

        <PriceCont>
          <Text style={{marginTop:8, fontSize:16, color:'#FE4265', fontWeight:'700'}}>{newprice}</Text>
          <Text style={{marginTop:10, fontSize:12, textDecorationLine:'line-through'}}>{oldprice}</Text>
        </PriceCont>
        <DetailsCont onPress={HandleCard}>
          <Pressable onPress={HandleCard}><Text style={{marginTop:5, fontSize:18, fontWeight:'600', color:'#FE4265'}}>More Details</Text></Pressable>
          <MaterialIcons style={{marginTop:5, transform: [{ rotate: rotation+"deg" }]}} name="arrow-drop-down" size={33} color="#FE4265" />
        </DetailsCont>
        
        <Text style={{marginTop:10, fontSize:12}}>{description}</Text>
        {/* <StarsCont>
          <SimpleLineIcons style={{marginRight:7}} name="star" size={24} color="#FE4265" />
          <SimpleLineIcons style={{marginRight:7}} name="star" size={24} color="#FE4265" />
          <SimpleLineIcons style={{marginRight:7}} name="star" size={24} color="#FE4265" />
          <SimpleLineIcons style={{marginRight:7}} name="star" size={24} color="#FE4265" />
          <SimpleLineIcons style={{marginRight:7}} name="star" size={24} color="#FE4265" />
        </StarsCont> */}
        <View style={{marginTop:20}}>
          <Diets showVege={true} showNut={true}/>

        <View style={{width:'100%', height:40, display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <PriceCont>
            <Text style={{fontSize:16, color:'#FE4265', fontWeight:'700'}}>{newprice}</Text>
            <Text style={{fontSize:12, marginLeft:5, textDecorationLine:'line-through'}}>{oldprice}</Text>
          </PriceCont>
          <DetailsCont onPress={HandleCard}>
            <Pressable onPress={HandleCard}><Text style={{fontSize:18, fontWeight:'600', color:'#FE4265'}}>Details</Text></Pressable>
            <MaterialIcons style={{marginTop:-5, transform: [{ rotate: rotation+"deg" }]}} name="arrow-drop-down" size={33} color="#FE4265" />
          </DetailsCont>

        </View>
      </TopRight>
    </TopContent>
    <BottomContent>
      <BottomLeft>
        <TextCont>
          <Text style={{fontSize:16}}>Description:</Text>
        </TextCont>
        <TextCont>
          <Text style={{fontSize:16}}>Modification:</Text>
        </TextCont>
        <TextCont>
          <Text style={{fontSize:16}}>Dietary Information:</Text>
        </TextCont>
      </BottomLeft>
      <BottomRight>
        <TextCont>
          <Text style={{fontSize:12}}>{description}</Text>
        </TextCont>
        <TextCont>
          <Text style={{fontSize:12}}>{modifications}</Text>
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

