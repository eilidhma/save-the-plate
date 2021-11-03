import React, { useState } from 'react';
import {Text, TouchableOpacity, View, Image, Button} from 'react-native'
import styled from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons'

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
  padding: 0px 11px 11px 11px;
  height: 46px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DetailsText = styled.View`
    width: "100%";
    height: 35;
    border: 1px solid #FE4265;
    border-radius: 15px;
    padding: 5px;
`

const TextCont = styled.View`
  padding-left: 11px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

const TimerAndQuant = styled.View`
  width: 217;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-direction: row;
`

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

const Quant = styled.View`
  width: 34;
  height: 34;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 17;
  background-color: #FE4265;
`;

const ExpandCont = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ImageCont = styled.Image`
  transform: rotate(0deg);
  width: 15;
  height: 15;
`



const ListingCard = ({
  img="https://placekitten.com/200/200",
  foodname="Fettucini Cat",
  timer="00:14:28",
  quant="1"
}) =>{

  const [isexpanded, setExpand] = useState(false)

  const [cardheight, setCardHeight] = useState(131)

  const [arrow, setArrow] = useState("arrow-drop-down")

  function Expand () {
    if (isexpanded == false)
    {
      setCardHeight(185)
      setArrow("arrow-drop-up")
      setExpand(!isexpanded)
    }
    else {
      setCardHeight(131)
      setArrow("arrow-drop-down")
      setExpand(!isexpanded)
    }
  }



    return <CardCont height={cardheight}>
      <FirstLayer>
        <Image source={{uri:img}} style={{width:126, height:108, borderRadius:10}}/>
        <TextCont>
          <Text style={{fontSize:20, fontFamily:'Raleway_700Bold', fontWeight: 'bold'}}>{foodname}</Text>
          
          <TimerAndQuant>
            <TimerCont>
              <Text style={{color: '#FE4265'}}>Available in: <Text style={{fontWeight: 'bold'}}>{timer}</Text></Text>
            </TimerCont>

            <Quant>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{quant}</Text>
            </Quant>
          </TimerAndQuant>

          <ExpandCont onPress={Expand}>
            <Text style={{color: '#FE4265', fontWeight:'bold'}}>More details</Text>

            <MaterialIcons name={arrow} size={33} color="#FE4265" />
          </ExpandCont>
        </TextCont>
      </FirstLayer>


      <Details>
        <DetailsText>
            <Text style={{fontSize:14, fontFamily:'Quicksand_400Regular'}}>Added parmesan cheese</Text>
        </DetailsText>
      </Details>
    </CardCont>
}

export default ListingCard;