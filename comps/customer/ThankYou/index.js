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


const ThankYou = ({
  navigation,
  src=require("../../../assets/plate.png"),

}) =>{

  const [modalVisible, setModalVisible] = useState(false);

  const ViewOrder = () => {
    navigation.navigate('Orders')
    setModalVisible(false)
  }

  return <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <View style={{display:'flex', flexDirection:'column', width:'90%', justifyContent:'center', alignItems:'center'}}>
        <Text>Thank you for your order!</Text>
        <Image source={src} style={{width:100, height:100}}/>
        <Pressable style={styles.shadowPropDark} title="Checkout" onPress={ViewOrder} >
          <Text style={{color:'white', fontSize:18}}>View Order</Text>
        </Pressable>
        <Pressable style={styles.shadowPropLight} title="Add more" onPress={() => setModalVisible(!modalVisible)} >
          <Text style={{color:'white', fontSize:18}}>Home</Text>
        </Pressable>
      </View>
    </View>
  </View>
</Modal>
}

export default ThankYou;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadowPropDark: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor:'#FE4265',
    width:150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    padding:5,
    borderRadius:20,
  },
  shadowPropLight: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor:'#F3AD81',
    width:150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    padding:5,
    borderRadius:20,
  },
  username: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor:'#FFF',
    width:200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    padding:5,
    borderRadius:20,
    fontFamily:'Quicksand_300Light', 
    fontSize:16
  },
  scrollView: {
    marginHorizontal: 0,
    width:'100%',
    height:'100%',
    position:'absolute',
    top:200,
    bottom:0,
  },
  text: {
    fontSize: 42,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
    zIndex:2
  },
  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:'100%',
    height:'40%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});