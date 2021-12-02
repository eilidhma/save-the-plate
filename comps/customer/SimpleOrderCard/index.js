import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput } from 'react-native';
import styled from 'styled-components';
import { Feather, MaterialIcons, Ionicons, MaterialCommunityIcons, SimpleLineIcons, AntDesign } from '@expo/vector-icons';


const CardCont = styled.View`
border:1px solid #C5C5C5;
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
  justify-content:center;
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
  top:10px;
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


const SimpleOrderCard = ({
  src="../../../assets/meal.png",
  restaurant="Fratelli's Bistro", 
  meal="Fettuccine Alfredo",
  newprice="$5.00",
  oldprice="$21.00",
  height="170px",
  quantity="1",
  total="$5.00"

}) =>{

  // const [card, setCard] = useState(false)

  // if(card === false) {
  //   height="170px"
  // } else {
  //   height="330px"
  // }

  const HandleDetails = () => {
   
  }

  return <CardCont style={styles.container}>
    <Content>
      <Left>
        <Image style={{width:115, height:105, borderRadius:15}} source={{uri:src}}/>
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

      </Right>
    </Content>
  </CardCont>
}

export default SimpleOrderCard;

const styles = StyleSheet.create({
  container: {
    display:'flex',
    backgroundColor:'white',
    width:'90%',
    flexDirection:'column',
    borderRadius:15,
    overflow:'hidden',
    height:140,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
