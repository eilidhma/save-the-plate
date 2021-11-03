import React from 'react';
import { Text, Image} from 'react-native';
import {
  useFonts,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300, Quicksand_300Light, Quicksand_400Regular
} from '@expo-google-fonts/quicksand';
import styled from 'styled-components';

const CardCont = styled.View`
  display:flex;
  backgroundColor:white;
  width:90%;
  flexDirection:row;
  borderRadius:15px;
  overflow:hidden;
  height:132px;
  padding: 11px;
  
`;

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

const Left = styled.View`
  display:flex;
  backgroundColor:white;
  flexDirection:column;
  padding-right: 11px;
  flex:1;
`

const Right = styled.View`
  display:flex;
  flexDirection:column;
  flex:2;
`

const ThirdRow = styled.View`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    /* flex-direction: row; // lolol this line crashes expo*/
`

const Quant = styled.View`
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 17px;
  border: solid #FE4265 1px;
`;



const AddedItem = ({
  src=require("../../../assets/meal.png"),
  restaurant="Fratelli's Bistro",
  meal="Fettuccine Alfredo",
  newprice="$5.00",
  oldprice="$21.00",
  quant="1"
}) =>{


  return <CardCont>
    <Left>
      <Image style={{width:115, height:105, borderRadius:15}} source={src}/>
    </Left>
    <Right>
      <Text style={{fontFamily:'Raleway_700Bold', fontSize:20}}>{meal}</Text>
      <RestCont>
        <Text style={{marginTop:8, fontFamily:'Quicksand_300Light', fontSize:14}}>{restaurant}</Text>
      </RestCont>

        <ThirdRow>
            <PriceCont>
                <Text style={{marginTop:8, fontFamily:'Quicksand_300Light', fontSize:16, color:'#FE4265', fontWeight:'700'}}>{newprice}</Text>
                <Text style={{marginTop:10, fontFamily:'Quicksand_300Light', fontSize:12, textDecorationLine:'line-through'}}>{oldprice}</Text>
            </PriceCont>

            <Quant>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FE4265'}}>{quant}</Text>
            </Quant>
        </ThirdRow>
    </Right>
  </CardCont>
}

export default AddedItem;