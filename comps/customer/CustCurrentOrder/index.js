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

const PriceCont = styled.View`
  display:flex;
  width:50%;
  flexDirection:row;
  justify-content:space-between;
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
  margin:15px;
  flexDirection:column;
  flex:2;
`

const Plates = styled.View`
  display:flex;
  flexDirection:column;
  width:30px;
  justifyContent:center;
  alignItems:center;
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
  top:25px;
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
  src=require("../../../assets/meal.png"),
  plateImg=require("../../../assets/plate.png"),
  restaurant="Fratelli's Bistro", 
  meal="Fettuccine Alfredo",
  plates="217",
  description="fettuccine pasta tossed with Parmesan cheese and butter and served with garlic toast on the side",
  newprice="$5.00",
  oldprice="$21.00",
  height="170px",
  quantity="1",

}) =>{

  const [card, setCard] = useState(false)

  if(card === false) {
    height="170px"
  } else {
    height="330px"
  }

  const HandleCard = () => {
    setCard(!card)
    console.log(this)
  }

  return <CardCont height={height}>
    <TimerCont>
      <Timer>Available in: 1:32:11</Timer>
    </TimerCont>
    <Content>
      <Left>
        <Image style={{width:115, height:105, borderRadius:15}} source={src}/>
        <Text style={{marginTop:30, fontSize:16}}>Description:</Text>
        <Text style={{marginTop:30, fontSize:16}}>Restaurant's Rating:</Text>
        <Text style={{marginTop:15, fontSize:16}}>Dietary Information:</Text>
      </Left>
      <Right>
        <Text style={{fontSize:20}}>{meal}</Text>
        <RestCont>
          <Text style={{marginTop:8, fontSize:14}}>{restaurant}</Text>
          <QuantityCont>
            <Quantity>{quantity}</Quantity>
          </QuantityCont>
        </RestCont>
        <PriceCont>
          <Text style={{marginTop:8, fontSize:16, color:'#FE4265', fontWeight:'700'}}>{newprice}</Text>
          <Text style={{marginTop:10, fontSize:12, textDecorationLine:'line-through'}}>{oldprice}</Text>
        </PriceCont>
        <DetailsCont onPress={HandleCard}>
          <Pressable onPress={HandleCard}><Text style={{marginTop:5, fontSize:18, fontWeight:'500', color:'#FE4265'}}>More Details</Text></Pressable>
          <MaterialIcons style={{marginTop:5}} name="arrow-drop-down" size={33} color="#FE4265" />
        </DetailsCont>
        
        <Text style={{marginTop:10, fontSize:12}}>{description}</Text>
        <StarsCont>
          <SimpleLineIcons style={{marginRight:7}} name="star" size={24} color="#FE4265" />
          <SimpleLineIcons style={{marginRight:7}} name="star" size={24} color="#FE4265" />
          <SimpleLineIcons style={{marginRight:7}} name="star" size={24} color="#FE4265" />
          <SimpleLineIcons style={{marginRight:7}} name="star" size={24} color="#FE4265" />
          <SimpleLineIcons style={{marginRight:7}} name="star" size={24} color="#FE4265" />
        </StarsCont>
      </Right>
    </Content>
  </CardCont>
}

export default CustCurrentOrder;


