import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput } from 'react-native';
import styled from 'styled-components';
import { Feather, MaterialIcons, Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import {
  useFonts,
  Raleway_700Bold,
  Raleway_400Regular,
  Raleway_600SemiBold
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300, Quicksand_300Light, Quicksand_400Regular,
} from '@expo-google-fonts/quicksand';

const CardCont = styled.View`
  display:flex;
  backgroundColor:white;
  width:90%;
  flexDirection:column;
  borderRadius:15px;
  overflow:hidden;
  height:${props=>props.height};
  margin-top:10px;
`;

const Content = styled.View`
  display:flex;
  width:100%;
  flexDirection:row;
`

const RestCont = styled.View`
  display:flex;
  width:100%;
  flexDirection:row;
  justify-content:space-between;
`;

const PriceCont = styled.View`
  display:flex;
  width:60%;
  flexDirection:row;
  justify-content:flex-start;
  align-items:center;
  margin-top:5px;
`;

const DetailsCont = styled.Pressable`
  display:flex;
  width:55%;
  flexDirection:row;
  align-items:center;
`;

const StarsCont = styled.View`
  display:flex;
  width:100%;
  flexDirection:row;
  align-items:center;
  margin-top:10px;
`;

const Left = styled.View`
  display:flex;
  backgroundColor:white;
  margin:15px;
  flexDirection:column;
  flex:1;
`

const Right = styled.View`
  display:flex;
  margin-top:15px;
  margin-right:15px;
  margin-left:15px;
  flexDirection:column;
  flex:2;
`


const QuantityCont = styled.View`
  display:flex;
  align-items:center;
  background-color:white;
  border-radius:25px;
  height:40px;
  width:40px;
  border:1px solid #FE4265;
  position:absolute;
  top:20px;
  right:10px;
`

const Quantity = styled.Text`
  marginTop:10px;
  fontSize:16px;
  color:#FE4265;
  text-align:center;
  font-weight:700;
`
const TimerCont = styled.Pressable`
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

const Timer = styled.Text`
  color:white;
  font-size:18px;
`


const CustCurrentOrder = ({
  src="https://placekitten.com/200/200",
  restaurant="Fratelli's Bistro", 
  meal="Fettuccine Alfredo",
  plates="217",
  description="fettuccine pasta tossed with Parmesan cheese and butter and served with garlic toast on the side",
  newprice="$5.00",
  oldprice="$21.00",
  height="170px",
  quantity="1",
  timeAvail="6:00:00",
  HandleDirections=()=>{}

}) =>{


  const HandleDetails = () => {
   
  }

  return <View style={styles.content}>
  <CardCont height={height}>
    <TimerCont>
      <Timer>Available at: {timeAvail}</Timer>
    </TimerCont>
    <Content>
      <Left>
        <Image style={{width:115, height:105, borderRadius:15}} source={{uri:src}}/>
        <Text style={{marginTop:30, fontSize:16}}>Description:</Text>
        <Text style={{marginTop:30, fontSize:16}}>Restaurant's Rating:</Text>
        <Text style={{marginTop:15, fontSize:16}}>Dietary Information:</Text>
      </Left>
      <Right>
        <Text style={{fontSize:20, fontFamily:'Raleway_600SemiBold'}}>{meal}</Text>
        <RestCont>
          <Text style={{marginTop:8, fontSize:14, fontFamily:'Quicksand_400Regular'}}>{restaurant}</Text>
          <QuantityCont>
            <Quantity>{quantity}</Quantity>
          </QuantityCont>
        </RestCont>
        <PriceCont>
          <Text style={{fontSize:16, color:'#FE4265', fontWeight:'700'}}>{newprice}</Text>
          <Text style={{marginLeft:5, fontSize:12, textDecorationLine:'line-through'}}>{oldprice}</Text>
        </PriceCont>
        <DetailsCont onPress={HandleDirections}>
          <Pressable onPress={HandleDirections}><Text style={{marginTop:5, fontSize:18, fontWeight:'500', color:'#FE4265'}}>Directions</Text></Pressable>
          <MaterialIcons style={{marginTop:5}} name="arrow-right" size={33} color="#FE4265" />
        </DetailsCont>
      </Right>
    </Content>
  </CardCont>
  </View>
}

export default CustCurrentOrder;


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
    width:'100%',
    height:210,
    display:'flex',
    width:'100%',
    overflow:'hidden',
    justifyContent:'center',
    alignItems:'center',
    marginTop:0,
  }

});



