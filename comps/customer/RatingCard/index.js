import React, { useState } from 'react';
import {Text, TouchableOpacity, Image} from 'react-native'
import styled from 'styled-components';
import { SimpleLineIcons } from '@expo/vector-icons';
import But from '../../global/Button';

/*const Cont = styled.TouchableOpacity`
`;*/

const Cont = styled.View`
width: 310px;
height: 300px;
background: #FFFFFF;
border-radius: 20px;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;

`;

const Stars = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
`

const Head = styled.View`
display: flex;
`

const RatingCard = ({
    //props go here
}) => {
    return <Cont>
        <Head>
        <Text style={{fontSize: 14, textAlign: "center"}}>Please rate your meal from</Text>
        <Text style={{fontSize: 14, fontWeight:"700", textAlign: "center"}}>Fratelli's Bistro</Text>
        </Head>
        <Image source={{uri:"../../../assets/plate.png"}}></Image>
        <Stars>
        <SimpleLineIcons name="star" size={24} color="#FE4265" />
        <SimpleLineIcons name="star" size={24} color="#FE4265" />
        <SimpleLineIcons name="star" size={24} color="#FE4265" />
        <SimpleLineIcons name="star" size={24} color="#FE4265" />
        <SimpleLineIcons name="star" size={24} color="#FE4265" />
        </Stars>

        <But text="Confirm"/>


    </Cont>
}

export default RatingCard;

// use this for the star icons https://icons.expo.fyi/

// <SimpleLineIcons name="star" size={24} color="#FE4265" />
