import React from 'react';
import { Text, TouchableOpacity, Image} from 'react-native';
import {
  useFonts,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300, Quicksand_300Light, Quicksand_400Regular
} from '@expo-google-fonts/quicksand';
import styled from 'styled-components';
import { Feather } from '@expo/vector-icons'

import AddedItem from '../AddedItem';

import But from '../../global/Button';

const Cont = styled.View`
    display: flex;
    width: 100%;
    padding-top: 53px;
    padding-bottom: 135px;
    background-color: #ffffff;
    border-radius: 30px;
    align-items: center;
    flex-direction: column;
`;
// testing color for now


const Price = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-top: 27px;
`;

const Content = styled.View`
    width: 100%;
    padding-left: 5%;
    padding-right: 5%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

`;

const ButtonCont = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    padding-top: 27px;
    justify-content: space-between; 
`;

const Handle = styled.TouchableOpacity`
    width: 22%;
    height: 3px;
    border-radius: 2px;
    position: relative;
    align-self: center;
    top: -40px;
    background-color: #CCD1D9;
`;

const X = styled.TouchableOpacity`
    width: 24px;
    height: 24px;
    position: relative;
    top: -50px;
    left: 45%;
`;


const AddedItemOverlay = (
    amount="$5.00",
    onHandle=()=>{},
    onClose=()=>{}
) => {
    return <Cont>

        <Handle onPress={onHandle}/>
        <X onPress={onClose}>
            <Feather name="x" size={24} color="#CCD1D9" />
        </X>


        <AddedItem/>

        <Content>
            <Price>
                <Text style={{fontFamily:'Quicksand_300', fontWeight: 'bold' }}>Total:$5.00</Text>
            </Price>

        <ButtonCont>
            <But width="153px" height="30px" text="Checkout"/>
            <But width="153px" height="30px" text="Add more" bgColor="#F3AD81"/>
        </ButtonCont>

        </Content>
    </Cont>
}

export default AddedItemOverlay;
