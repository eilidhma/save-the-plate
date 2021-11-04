import React, { useState } from 'react';
import {Text, TouchableOpacity} from 'react-native'
import styled from 'styled-components';

const ButtonCont = styled.TouchableOpacity`
 width: ${props=>props.width};
 height: ${props=>props.height};
 background-color: ${props=>props.bgColor};
 display:flex;
 border-radius: ${props=>props.radius};
 justify-content: center;
 align-items: center;
`;



const But = ({
    width="90%",
    height="50px",
    bgColor="#FE4265",
    radius="20px",
    txtColor="white",
    text="button comp",
    onPress="()=>{}"
}) => {
    return <ButtonCont
        width={width}
        height={height}
        bgColor={bgColor}
        radius={radius}
        onPress={onPress}
        >
        <Text style={{color:txtColor, fontWeight: 'bold'}}>{text}</Text>
    </ButtonCont>
}

export default But;