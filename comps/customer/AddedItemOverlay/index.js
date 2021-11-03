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

import AddedItem from '../AddedItem';

import But from '../../global/Button';

const Cont = styled.View`
    display: flex;
    width: 100%;
    padding-top: 53px;
    padding-left: 0px;
    padding-right: 0px;
    padding-bottom: 135px;
    background-color: #ffffff;
    border-radius: 30px;
    align-items: center;
    flex-direction: column;
`;

const Price = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-top: 27px;
`;

const Content = styled.View`
    margin-left: 10%;
    margin-right: 10%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ButtonCont = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 27px;
`;


const AddedItemOverlay = (
    amount="$5.00"
) => {
    return <Cont>
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
