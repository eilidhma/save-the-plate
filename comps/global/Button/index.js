import React, { useState } from 'react';
import {Text, TouchableOpacity, View, Image, Button} from 'react-native'
import styled from 'styled-components';

const ButtonCont = styled.TouchableOpacity`
 width: ${props=>props.width};
 height: ${props=>props.height};
 background-color: ${props=>props.bgColor};
 display:flex;
 justify-content: center;
 align-items: center;
`;



const But = ({
    width=387,
    height=387,
    bgColor="white"
}) => {
    return <ButtonCont width={width} height={height} bgColor={bgColor}>
        <Text>bruh</Text>
    </ButtonCont>
}

export default But;