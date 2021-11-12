import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button, Pressable, TextInput } from 'react-native';
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
  flexDirection:column;
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
  width:85%;
`
const Right = styled.View`
  display:flex;
  backgroundColor:white;
  flexDirection:column;
`
const Top = styled.View`
  display:flex;
  flexDirection:row;
`
const Bottom = styled.View`
  display:flex;
  backgroundColor:white;
`

const styles = StyleSheet.create({
  containerButton: {
    borderColor:'#FF1A44', 
    borderWidth:1, 
    borderRadius:10, 
    marginHorizontal:5
  },
  textButton: { 
    fontSize:16, 
    padding:5,
  }
})

const Filters = ({
    height="50px",
}) => {
    const [filters, setFilters] = useState(false)

    if(filters === false){
        height="50px"
    } else {
        height="360px"
    }

    const HandleFilters = () => {
        setFilters(!filters)
    }

    const [filterColor, setFilterColor] = useState("white")
    const [textColor, setTextColor] = useState("#ff1a44")
    const [selected, setSelected] = useState(false)
    
    const SelectFilter1 = () => {
      setSelected(!selected)
      
      if(selected === false){
        setFilterColor("#ff1a44")
        setTextColor("white")
      } else {
        setFilterColor("white")
        setTextColor("#ff1a44")
      }
    }
    const SelectFilter2 = () => {
      setSelected(!selected)
      
      if(selected === false){
        setFilterColor("#ff1a44")
        setTextColor("white")
      } else {
        setFilterColor("white")
        setTextColor("#ff1a44")
      }
    }

    return <FiltersCont height={height}>
      <Top>
        <Left style={{zIndex:1,}}>
            <SearchCont>
                <Search/>
            </SearchCont>
        </Left>

        <Right style={{zIndex:1,}}>
            <Pressable onPress={HandleFilters}><MaterialCommunityIcons style={{margin:10}} name="filter-outline" size={30} color="#FE4265" /></Pressable>
        </Right>
      </Top>
        <Bottom>
            <View style={{margin:5}}>
                <Text style={{fontFamily:'Quicksand_400Regular', fontSize:16, padding:5}}>Cuisine</Text>
              <ScrollView horizontal={true} contentContainerStyle={{width:'100%', justifyContent:'space-between'}}>
                <Pressable onPress={SelectFilter1} backgroundColor={filterColor} style={styles.containerButton}>
                  <Text textColor={textColor} style={{color:textColor, fontSize:16, padding:5,}}>Italian</Text>
                </Pressable>
                <Pressable onPress={SelectFilter2} backgroundColor={filterColor} style={styles.containerButton}>
                  <Text textColor={textColor} style={{color:textColor, fontSize:16, padding:5,}}>Mexican</Text>
                </Pressable>
                <Pressable style={{backgroundColor:'white', borderColor:'#FF1A44', borderWidth:1, borderRadius:10, marginHorizontal:5}}>
                  <Text textColor={textColor} style={{color:textColor, fontSize:16, padding:5,}}>Vietnamese</Text>
                </Pressable>
                <Pressable style={{backgroundColor:'white', borderColor:'#FF1A44', borderWidth:1, borderRadius:10, marginHorizontal:5}}>
                  <Text textColor={textColor} style={{color:textColor, fontSize:16, padding:5,}}>American</Text>
                </Pressable>
              </ScrollView>
            </View>

            <View style={{margin:5}}>
                <Text style={{fontFamily:'Quicksand_400Regular', fontSize:16, padding:5}}>Distance from me</Text>
              <ScrollView horizontal={true} contentContainerStyle={{width:'100%', justifyContent:'space-between'}}>
                <Pressable style={{backgroundColor:'white', borderColor:'#FF1A44', borderWidth:1, borderRadius:10, marginHorizontal:5}}>
                  <Text style={{color:'#FF1A44', fontFamily:'Quicksand_300Light', fontSize:18, padding:5}}>200m</Text>
                </Pressable>
                <Pressable style={{backgroundColor:'white', borderColor:'#FF1A44', borderWidth:1, borderRadius:10, marginHorizontal:5}}>
                  <Text style={{color:'#FF1A44', fontFamily:'Quicksand_300Light', fontSize:18, padding:5}}>500m</Text>
                </Pressable>
                <Pressable style={{backgroundColor:'white', borderColor:'#FF1A44', borderWidth:1, borderRadius:10, marginHorizontal:5}}>
                  <Text style={{color:'#FF1A44', fontFamily:'Quicksand_300Light', fontSize:18, padding:5}}>1km</Text>
                </Pressable>
                <Pressable style={{backgroundColor:'white', borderColor:'#FF1A44', borderWidth:1, borderRadius:10, marginHorizontal:5}}>
                  <Text style={{color:'#FF1A44', fontFamily:'Quicksand_300Light', fontSize:18, padding:5}}>5km</Text>
                </Pressable>
                <Pressable style={{backgroundColor:'white', borderColor:'#FF1A44', borderWidth:1, borderRadius:10, marginHorizontal:5}}>
                  <Text style={{color:'#FF1A44', fontFamily:'Quicksand_300Light', fontSize:18, padding:5}}>10km</Text>
                </Pressable>
              </ScrollView>
            </View>

            <View style={{margin:5}}>
                <Text style={{fontFamily:'Quicksand_400Regular', fontSize:16, padding:5}}>Dietary restrictions</Text>
              <ScrollView horizontal={true} contentContainerStyle={{width:'100%', justifyContent:'space-between'}}>
                <Pressable style={{backgroundColor:'white', borderColor:'#FF1A44', borderWidth:1, borderRadius:10, marginHorizontal:5}}>
                  <Text style={{color:'#FF1A44', fontFamily:'Quicksand_300Light', fontSize:18, padding:5}}>Gluten Free</Text>
                </Pressable>
                <Pressable style={{backgroundColor:'white', borderColor:'#FF1A44', borderWidth:1, borderRadius:10, marginHorizontal:5}}>
                  <Text style={{color:'#FF1A44', fontFamily:'Quicksand_300Light', fontSize:18, padding:5}}>Dairy Free</Text>
                </Pressable>
                <Pressable style={{backgroundColor:'white', borderColor:'#FF1A44', borderWidth:1, borderRadius:10, marginHorizontal:5}}>
                  <Text style={{color:'#FF1A44', fontFamily:'Quicksand_300Light', fontSize:18, padding:5}}>Nut Free</Text>
                </Pressable>
                <Pressable style={{backgroundColor:'white', borderColor:'#FF1A44', borderWidth:1, borderRadius:10, marginHorizontal:5}}>
                  <Text style={{color:'#FF1A44', fontFamily:'Quicksand_300Light', fontSize:18, padding:5}}>Vegetarian</Text>
                </Pressable>
              </ScrollView>
            </View>

            <View style={{margin:5}}>
                <Text style={{fontFamily:'Quicksand_400Regular', fontSize:16, padding:5}}>Time available</Text>
              <ScrollView horizontal={true} contentContainerStyle={{width:'100%', justifyContent:'space-between'}}>
                <Pressable style={{backgroundColor:'white', borderColor:'#FF1A44', borderWidth:1, borderRadius:10, marginHorizontal:5}}>
                  <Text style={{color:'#FF1A44', fontFamily:'Quicksand_300Light', fontSize:18, padding:5}}>Now</Text>
                </Pressable>
                <Pressable style={{backgroundColor:'white', borderColor:'#FF1A44', borderWidth:1, borderRadius:10, marginHorizontal:5}}>
                  <Text style={{color:'#FF1A44', fontFamily:'Quicksand_300Light', fontSize:18, padding:5}}>30 min</Text>
                </Pressable>
                <Pressable style={{backgroundColor:'white', borderColor:'#FF1A44', borderWidth:1, borderRadius:10, marginHorizontal:5}}>
                  <Text style={{color:'#FF1A44', fontFamily:'Quicksand_300Light', fontSize:18, padding:5}}>1 hr</Text>
                </Pressable>
                <Pressable style={{backgroundColor:'white', borderColor:'#FF1A44', borderWidth:1, borderRadius:10, marginHorizontal:5}}>
                  <Text style={{color:'#FF1A44', fontFamily:'Quicksand_300Light', fontSize:18, padding:5}}>2 hrs</Text>
                </Pressable>
                <Pressable style={{backgroundColor:'white', borderColor:'#FF1A44', borderWidth:1, borderRadius:10, marginHorizontal:5}}>
                  <Text style={{color:'#FF1A44', fontFamily:'Quicksand_300Light', fontSize:18, padding:5}}>2+ hrs</Text>
                </Pressable>
              </ScrollView>
            </View>
        </Bottom>
    </FiltersCont>
}

export default Filters;