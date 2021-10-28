import React, { useState } from 'react';
import {Text, TouchableOpacity, View, Image, Button} from 'react-native'
import styled from 'styled-components';

import {
    useFonts,
    Raleway_700Bold,
  } from '@expo-google-fonts/raleway';
  import {
    Quicksand_300, Quicksand_300Light, Quicksand_400Regular
  } from '@expo-google-fonts/quicksand';

const CardCont = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 387;
  height: ${props=>props.height};
  background-color: white;
  border-radius: 15;
  overflow: hidden;
`

const FirstLayer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 11px;
  width: 387;
  height: 131;
`;

const Details = styled.View`
  padding: 11px;
  height: 141;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ButtonRow = styled.View`
  display: flex;
  justify-content: space-between;
`;

const OrderRow = styled.View`
  display: flex;
  flex-direction: row;
`;

const Order = styled.View`
  display: flex;
  flex-direction: column;
`;

const TextCont = styled.View`
  padding-left: 11px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

const TimerCont = styled.View`
  width: 160;
  height: 25;
  border: 1px solid #FE4265;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  font-family:'Quicksand_400Regular';
`;

const ExpandCont = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

const ImageCont = styled.Image`
  transform: rotate(0deg);
  width: 15;
  height: 15;
`



const RestaurantCard = ({
  img="https://placekitten.com/200/200",
  ordernum="0123456",
  name="John Smith",
  timer="00:14:28",
  phonenum="604-456-67890",
  ordername="Fettucini Alfredo",
  orderquant="1"
}) =>{

  const [isexpanded, setExpand] = useState(false)

  const [cardheight, setCardHeight] = useState(131)

  function Expand () {
    if (isexpanded == false)
    {
      setCardHeight(272)
      setExpand(!isexpanded)
    }
    else {
      setCardHeight(131)
      setExpand(!isexpanded)
    }
  }



    return <CardCont height={cardheight}>
      <FirstLayer>
        <Image source={{uri:img}} style={{width:126, height:108, borderRadius:10}}/>
        <TextCont>
          <Text style={{fontSize:20, fontFamily:'Raleway_700Bold', fontWeight: 'bold'}}>Order #{ordernum}</Text>

          <Text style={{fontSize:18, fontFamily:'Quicksand_400Regular'}}>{name}</Text>

          <TimerCont>
            <Text style={{color: '#FE4265'}}>Time left: <Text style={{fontWeight: 'bold'}}>{timer}</Text></Text>
          </TimerCont>

          <ExpandCont onPress={Expand}>
            <Text style={{color: '#FE4265', fontWeight:'bold'}}>More details</Text>

            <ImageCont source={{uri:"expandtriangle.png"}}></ImageCont>
          </ExpandCont>
        </TextCont>
      </FirstLayer>


      <Details>

        <Text style={{fontSize:14, fontFamily:'Quicksand_400Regular', paddingBottom: 4}}>Phone number: {phonenum}</Text>

          <Order>
            <Text style={{fontSize:14, fontFamily:'Quicksand_400Regular', fontWeight: 'bold'}}>Order Details</Text>
            <OrderRow>
              <Text style={{fontSize:14, fontFamily:'Quicksand_400Regular', fontWeight: 'bold', paddingLeft: 4, paddingRight: 5}}>{orderquant}</Text>
              <Text style={{fontSize:14, fontFamily:'Quicksand_400Regular'}}>{ordername}</Text>
            </OrderRow>
          </Order>


      </Details>
    </CardCont>
}

export default RestaurantCard;