import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput } from 'react-native';
import styled from 'styled-components';
import { Feather, MaterialIcons, Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';


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


const Left = styled.View`
  display:flex;
  backgroundColor:white;
  margin:15px;
  flexDirection:column;
  flex:1;
`

const Right = styled.View`
  display:flex;
  margin:15px;
  flexDirection:column;
  justify-content:center;
  flex:2;
`



const PastOrder = ({
  src="https://placekitten.com/200/200",
  plateImg=require("../../../assets/plate.png"),
  restaurant="Fratelli's Bistro", 
  meal="Fettuccine Alfredo",
  plates="217",
  description="fettuccine pasta tossed with Parmesan cheese and butter and served with garlic toast on the side",
  newprice="$5.00",
  oldprice="$21.00",
  height="130px",
  quantity="1",

}) =>{

  const [card, setCard] = useState(false)

  if(card === false) {
    height="100px"
  } else {
    height="330px"
  }

  const HandleCard = () => {
    setCard(!card)
    console.log(this)
  }

  return <CardCont height={height}>
    <Content>
      <Left>
        <Image style={{width:115, height:70, borderRadius:15}} source={{uri:src}}/>
      </Left>
      <Right>
        <Text style={{fontSize:20}}>{meal}</Text>
        <RestCont>
          <Text style={{marginTop:8, fontSize:14}}>{restaurant}</Text>
        </RestCont>
      </Right>
    </Content>
  </CardCont>
}

export default PastOrder;


