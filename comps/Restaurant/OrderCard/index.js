import React, { useState } from 'react';
import {Text, TouchableOpacity, View, Image, Button, StyleSheet} from 'react-native'
import styled from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons'

import But from '../../global/Button'

import {
  useFonts,
  Raleway_700Bold,
  Raleway_600SemiBold
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300, Quicksand_300Light, Quicksand_400Regular
} from '@expo-google-fonts/quicksand';

const CardCont = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  height: ${props=>props.height};
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  margin-top: 10px;
`

const FirstLayer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 11px;
  width: 387px;
  height: 131px;
`;

const Details = styled.View`
  padding: 11px;
  height: 100px;
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
  justify-content: flex-start;
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
  width: 160px;
  height: 25px;
  border: 1px solid #FE4265;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
`;

const ModsCont = styled.View`
  width: 100%;
  height: 35px;
  border: 1px solid #FE4265;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 25px;
`;

const ExpandCont = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Left = styled.View`
  width: 126px;
`




const RestaurantCard = ({
  img="https://placekitten.com/200/200",
  ordernum="0123456",
  name="John Smith",
  timer="00:14:28",
  phonenum="604-456-67890",
  ordername="Fettucini Alfredo",
  orderquant="1",
  mods="hello i am mods",
  ConfirmPickup=()=>{}
}) =>{

  const [isexpanded, setExpand] = useState(false)

  const [visibility, setVisibilty] = useState(true)

  const [cardheight, setCardHeight] = useState("131px")

  const [arrow, setArrow] = useState("arrow-drop-down")

  function Expand () {
    if (isexpanded == false)
    {
      setCardHeight("280px")
      setArrow("arrow-drop-up")
      setExpand(!isexpanded)
    }
    else {
      setCardHeight("131px")
      setArrow("arrow-drop-down")
      setExpand(!isexpanded)
    }
  }


    return <View style={styles.content}>
    {visibility === true ?
    <CardCont height={cardheight}>
      <FirstLayer>
        <Image source={{uri:img}} style={{width:126, height:108, borderRadius:10}}/>
        <TextCont>
          <Text style={{fontSize:20, fontFamily:'Raleway_700Bold'}}>Order #{ordernum}</Text>

          <Text style={{fontSize:14, paddingBottom:5, fontFamily:'Raleway_400Regular'}}>{ordername}</Text>

          <TimerCont>
            <Text style={{color: '#FE4265', fontFamily:'Quicksand_500Medium'}}>Available{timer}</Text>
          </TimerCont>

          <ExpandCont onPress={Expand}>
            <Text style={{color: '#FE4265', fontfamily:'Quicksand_400Regular'}}>Open to Confirm</Text>

            <MaterialIcons name={arrow} size={33} color="#FE4265" />
          </ExpandCont>
        </TextCont>
      </FirstLayer>




      <Details>
        <View style={{justifyContent: 'space-between', flexDirection:'column', height: 45, position: 'relative', top: -12}}>
          <OrderRow>
            <Left>
              <Text style={{fontFamily:'Quicksand_600SemiBold'}}>
                Customer Name:
              </Text>
            </Left>

            <Text style={{paddingLeft:11, fontFamily:'Quicksand_400Regular'}}>
              {name}
            </Text>
          </OrderRow>

          <OrderRow>
            <Left>
              <Text style={{fontFamily:'Quicksand_600SemiBold'}}>
                Phone Number:
              </Text>
            </Left>

            <Text style={{paddingLeft:11, fontFamily:'Quicksand_400Regular'}}>
              {phonenum}
            </Text>
          </OrderRow>
        </View>

          <ModsCont>
            <Text style={{marginLeft: 5, fontFamily:'Quicksand_400Regular'}}>
              {mods}
            </Text>
          </ModsCont>
        <OrderRow>

        </OrderRow>
      </Details>

      
      <But onPress={()=>
        {setVisibilty(false);
          ConfirmPickup()
        }} width="100%" radius="0px" height="30px" text="Confirm Pickup"/>
    </CardCont>
    
    : null}
    </View>
}

export default RestaurantCard;

const styles = StyleSheet.create({
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
    display:'flex',
    alignItems:'center'
  }
})