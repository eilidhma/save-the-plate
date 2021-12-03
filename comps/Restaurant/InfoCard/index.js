import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput, Modal } from 'react-native';
import {
  useFonts,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300, Quicksand_300Light, Quicksand_400Regular
} from '@expo-google-fonts/quicksand';
import styled from 'styled-components';
import { AntDesign } from '@expo/vector-icons';

import But from '../../global/Button';
import CuisineSelect from '../CuisineSelect';

const CardCont = styled.View`

`;

const Content = styled.View`
  width:80%;
  display:flex;
  padding-right:20px;
  padding-left:20px;
  padding-top:10px;
  padding-bottom:10px;
  flex-direction:column;
`
const Section = styled.View`
  display:flex;
  flex-direction:row;
`

const Title = styled.Text`
  font-size:20px;
  font-weight:500;
  color:#FE4265;
  margin-bottom:5px;
`

const Edit = styled.Pressable`
  display:flex;
  background-color:#F3AD81;
  position:absolute;
  bottom:0;
  width:100%;
  z-index:10;
  justify-content:center;
  align-items:center;
  height:30px;
`

const EditText = styled.Text`
  color:white;
  font-size:16px;
  font-weight:500;
`

const AddItemModal = styled.View`
 display: flex;
 flex-direction: column;
 justify-content: space-between;
 width: 100%;
 height: 679px;
 padding-right: 5%;
 padding-left: 5%;
 padding-top: 40px;
 padding-bottom: 37px;
 background-color: #ffffff;
 border-radius: 30px;
 position: absolute;
 bottom: 0px;
`

const CloseModal = styled.TouchableOpacity`
  position: absolute;
  top:10px;
  right: 10px;
  width: 13px;
  height: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;

const ModalRow = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`

const TextCont = styled.View`
  width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: baseline;
  position: relative;
  top: 10px;
`

const SingleLineInput = styled.View`
  width: 67%;
  height: 40px;
  border-radius:15px;
  border: 1px solid #FE4265;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 10px
`;

const ButCont = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const InfoCard = ({
  edit="edit info",
  title="Title",
  sectiontitle1="section1",
  sectiontitle2="section2",
  phone="phone number",
  addressline1="address line 1",
  addressline2="address line 2",
  cvc="",
}) =>{

  const [modalVisible, setModalVisible] = useState(false);
  const [cuisine, setCuisine] = useState()

  return <CardCont style={styles.shadowProp}>
    <Edit onPress={()=>setModalVisible(!modalVisible)}>
      <EditText>{edit}</EditText>
    </Edit>
    <Content>
      <Title>{title}</Title>
      <Section>
        <Text style={{width:120, fontSize:14, fontWeight:'300', marginTop:10}}>{sectiontitle1}</Text><Text style={{fontSize:16, marginTop:10, marginLeft:5}}>{phone}</Text>
      </Section>
      <Section>
        <Text style={{width:120, fontSize:14, fontWeight:'300', marginTop:10}}>{sectiontitle2}</Text><Text style={{fontSize:16, fontWeight:'200', marginTop:10, marginLeft:5}}>{addressline1}</Text>
      </Section>
      <Section>
        <Text style={{width:120, fontSize:14, fontWeight:'300', marginTop:10}}>{cvc}</Text><Text style={{fontSize:16, fontWeight:'200', marginTop:10, marginLeft:5}}>{addressline2}</Text>
      </Section>
    </Content>


    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}>
      <AddItemModal>
        <CloseModal onPress={()=>{setModalVisible(!modalVisible)
        console.log(cuisine)
        }}>
          <AntDesign name="close" size={13} color="#C4C4C4" />
        </CloseModal>

        <ModalRow>
          <TextCont>
            <Text>Restaurant Name:</Text>
          </TextCont>

          <SingleLineInput>
            <TextInput placeholder="Restaurant Name" placeholderTextColor="#C4C4C4"></TextInput>
          </SingleLineInput>
        </ModalRow>

        <ModalRow>
          <TextCont>
            <Text>Phone:</Text>
          </TextCont>

          <SingleLineInput>
            <TextInput placeholder="Phone" placeholderTextColor="#C4C4C4"></TextInput>
          </SingleLineInput>
        </ModalRow>

        <ModalRow>
          <TextCont>
            <Text>Address</Text>
          </TextCont>

          <SingleLineInput>
            <TextInput placeholder="Address" placeholderTextColor="#C4C4C4"></TextInput>
          </SingleLineInput>
        </ModalRow>

        <ModalRow>
          <TextCont>
            <Text>Postal Code</Text>
          </TextCont>

          <SingleLineInput>
            <TextInput placeholder="Postal Code" placeholderTextColor="#C4C4C4"></TextInput>
          </SingleLineInput>
        </ModalRow>

        <ModalRow>
          <TextCont>
            <Text>Email:</Text>
          </TextCont>

          <SingleLineInput>
            <TextInput placeholder="Email" placeholderTextColor="#C4C4C4"></TextInput>
          </SingleLineInput>
        </ModalRow>

        <Text style={{alignSelf:'center'}}>Select Cuisine</Text>

        <CuisineSelect onSelect={(c)=>setCuisine(c)} />

        <ButCont>
          <But width="45%" text="Update Info" onPress={()=>console.log(cuisine)}/>
          <But width="45%" bgColor="#F3AD81" text="Cancel"
          onPress={()=>setModalVisible(!modalVisible)}/>
        </ButCont>




      </AddItemModal>
    </Modal>

  </CardCont>
}

export default InfoCard;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadowProp: {
    display:'flex',
    backgroundColor:'white',
    width:'90%',
    flexDirection:'column',
    borderRadius:15,
    overflow:'hidden',
    height:170,
    marginTop:10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
  }
});