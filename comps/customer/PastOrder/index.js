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

  return <View style={styles.content}> 
  <CardCont height={height}>
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
  </View>
}

export default PastOrder;

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
    height:180,
    display:'flex',
    width:'100%',
    overflow:'hidden',
    justifyContent:'center',
    alignItems:'center',
    marginTop:10,
  }

});
