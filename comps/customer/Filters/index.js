import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput } from 'react-native';
import {
  useFonts,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300, Quicksand_300Light, Quicksand_400Regular
} from '@expo-google-fonts/quicksand';
import styled from 'styled-components';
import { Feather, MaterialIcons, Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';

import Search from '../SearchBar';

const FiltersCont = styled.View`
  display:flex;
  backgroundColor:white;
  width:90%;
  flexDirection:row;
  borderRadius:15px;
  overflow:hidden;
  height:${props=>props.height};
  
`;

const SearchCont = styled.View`
  display:flex;
  width:100%;
  flexDirection:row;
`;

const Left = styled.View`
  display:flex;
  backgroundColor:white;
  flexDirection:column;
  flex:10;
`
const Right = styled.View`
  display:flex;
  backgroundColor:white;
  flexDirection:column;
  flex:2;
`

const Filters = ({
    height="50px"
}) => {
    const [filters, setFilters] = useState(false)

    if(filters === false){
        height="50px"
    } else {
        height="330px"
    }

    const HandleFilters = () => {
        setFilters(!filters)
    }

    return <FiltersCont height={height}>
        <Left>
            <SearchCont>
                <Search/>
            </SearchCont>
            <Text>hello</Text>
        </Left>
        <Right>
            <Pressable onPress={HandleFilters}><MaterialCommunityIcons style={{margin:10}} name="filter-outline" size={30} color="#FE4265" /></Pressable>
        </Right>
    </FiltersCont>
}

export default Filters;