import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button, Pressable, TextInput } from 'react-native';
import {
  useFonts,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300, 
  Quicksand_300Light, 
  Quicksand_400Regular
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
  borderRadius:20px;
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
    iconName="filter-outline",
    SelectCuisine1=()=>{},
    SelectCuisine2=()=>{},
    SelectCuisine3=()=>{},
    SelectCuisine4=()=>{},
    SelectDistance1=()=>{},
    SelectDistance2=()=>{},
    SelectDistance3=()=>{},
    SelectDistance4=()=>{},
    SelectDistance5=()=>{},
    SelectDiet1=()=>{},
    SelectDiet2=()=>{},
    SelectDiet3=()=>{},
    SelectDiet4=()=>{},
    SelectTime1=()=>{},
    SelectTime2=()=>{},
    SelectTime3=()=>{},
    SelectTime4=()=>{},
    SelectTime5=()=>{},
    c1TextColor,
    c2TextColor,
    c3TextColor,
    c4TextColor,
    c1Color,
    c2Color,
    c3Color,
    c4Color,
    dist1TextColor,
    dist2TextColor,
    dist3TextColor,
    dist4TextColor,
    dist5TextColor,
    dist1Color,
    dist2Color,
    dist3Color,
    dist4Color,
    dist5Color,
    diet1TextColor,
    diet2TextColor,
    diet3TextColor,
    diet4TextColor,
    diet1Color,
    diet2Color,
    diet3Color,
    diet4Color,
    time1TextColor,
    time2TextColor,
    time3TextColor,
    time4TextColor,
    time5TextColor,
    time1Color,
    time2Color,
    time3Color,
    time4Color,
    time5Color,

}) => {
  const [filters, setFilters] = useState(false)

  if(filters === false){
      height="40px"
      iconName="filter-outline" 
  }
  else {
      height="360px"
      iconName="filter"
  }

  const HandleFilters = () => {
      setFilters(!filters)
  }

    return <FiltersCont height={height}>
      <Top>
        <Left style={{zIndex:1,height:40}}>
            <SearchCont>
                <Search/>
            </SearchCont>
        </Left>

        <Right style={{zIndex:1,}}>
            <Pressable onPress={HandleFilters}><MaterialCommunityIcons style={{marginTop:5, marginLeft:10}} name={iconName} size={30} color="#FE4265" /></Pressable>
        </Right>
      </Top>
        <Bottom>
            <View style={{margin:5}}>
                <Text style={{fontFamily:'Raleway_400Regular', fontSize:16, padding:5}}>Cuisine</Text>
              <ScrollView horizontal={true} contentContainerStyle={{width:'100%', justifyContent:'space-between'}}>
                <Pressable onPress={SelectCuisine1} backgroundColor={c1Color} style={styles.containerButton}>
                  <Text textColor={c1TextColor} style={{color:c1TextColor, fontSize:16, padding:5, fontFamily:'Quicksand_400Regular'}}>Italian</Text>
                </Pressable>
                <Pressable onPress={SelectCuisine2} backgroundColor={c2Color} style={styles.containerButton}>
                  <Text textColor={c2TextColor} style={{color:c2TextColor, fontSize:16, padding:5, fontFamily:'Quicksand_400Regular'}}>Mexican</Text>
                </Pressable>
                <Pressable onPress={SelectCuisine3} backgroundColor={c3Color} style={styles.containerButton}>
                  <Text textColor={c3TextColor} style={{color:c3TextColor, fontSize:16, padding:5, fontFamily:'Quicksand_400Regular'}}>Vietnamese</Text>
                </Pressable>
                <Pressable onPress={SelectCuisine4} backgroundColor={c4Color} style={styles.containerButton}>
                  <Text textColor={c4TextColor} style={{color:c4TextColor, fontSize:16, padding:5, fontFamily:'Quicksand_400Regular'}}>American</Text>
                </Pressable>
              </ScrollView>
            </View>

            <View style={{margin:5}}>
                <Text style={{fontFamily:'Raleway_400Regular', fontSize:16, padding:5}}>Distance from me</Text>
              <ScrollView horizontal={true} contentContainerStyle={{width:'100%', justifyContent:'space-between'}}>
                <Pressable onPress={SelectDistance1} backgroundColor={dist1Color} style={styles.containerButton}>
                  <Text textColor={dist1TextColor} style={{color:dist1TextColor, fontSize:16, padding:5, fontFamily:'Quicksand_400Regular'}}>200m</Text>
                </Pressable>
                <Pressable onPress={SelectDistance2} backgroundColor={dist2Color} style={styles.containerButton}>
                  <Text textColor={dist2TextColor} style={{color:dist2TextColor, fontSize:16, padding:5, fontFamily:'Quicksand_400Regular'}}>500m</Text>
                </Pressable>
                <Pressable onPress={SelectDistance3} backgroundColor={dist3Color} style={styles.containerButton}>
                  <Text textColor={dist3TextColor} style={{color:dist3TextColor, fontSize:16, padding:5, fontFamily:'Quicksand_400Regular'}}>1km</Text>
                </Pressable>
                <Pressable onPress={SelectDistance4} backgroundColor={dist4Color} style={styles.containerButton}>
                  <Text textColor={dist4TextColor} style={{color:dist4TextColor, fontSize:16, padding:5, fontFamily:'Quicksand_400Regular'}}>5km</Text>
                </Pressable>
                <Pressable onPress={SelectDistance5} backgroundColor={dist5Color} style={styles.containerButton}>
                  <Text textColor={dist5TextColor} style={{color:dist5TextColor, fontSize:16, padding:5, fontFamily:'Quicksand_400Regular'}}>10km</Text>
                </Pressable>
              </ScrollView>
            </View>

            <View style={{margin:5}}>
                <Text style={{fontFamily:'Raleway_400Regular', fontSize:16, padding:5}}>Dietary restrictions</Text>
              <ScrollView horizontal={true} contentContainerStyle={{width:'100%', justifyContent:'space-between'}}>
                <Pressable onPress={SelectDiet1} backgroundColor={diet1Color} style={styles.containerButton}>
                  <Text textColor={diet1TextColor} style={{color:diet1TextColor, fontSize:16, padding:5, fontFamily:'Quicksand_400Regular'}}>Gluten Free</Text>
                </Pressable>
                <Pressable onPress={SelectDiet2} backgroundColor={diet2Color} style={styles.containerButton}>
                  <Text textColor={diet2TextColor} style={{color:diet2TextColor, fontSize:16, padding:5, fontFamily:'Quicksand_400Regular'}}>Dairy Free</Text>
                </Pressable>
                <Pressable onPress={SelectDiet3} backgroundColor={diet3Color} style={styles.containerButton}>
                  <Text textColor={diet3TextColor} style={{color:diet3TextColor, fontSize:16, padding:5, fontFamily:'Quicksand_400Regular'}}>Nut Free</Text>
                </Pressable>
                <Pressable onPress={SelectDiet4} backgroundColor={diet4Color} style={styles.containerButton}>
                  <Text textColor={diet4TextColor} style={{color:diet4TextColor, fontSize:16, padding:5, fontFamily:'Quicksand_400Regular'}}>Vegetarian</Text>
                </Pressable>
              </ScrollView>
            </View>

            <View style={{margin:5}}>
                <Text style={{fontFamily:'Raleway_400Regular', fontSize:16, padding:5}}>Time available</Text>
              <ScrollView horizontal={true} contentContainerStyle={{width:'100%', justifyContent:'space-between'}}>
                <Pressable onPress={SelectTime1} backgroundColor={time1Color} style={styles.containerButton}>
                  <Text textColor={time1TextColor} style={{color:time1TextColor, fontSize:16, padding:5, fontFamily:'Quicksand_400Regular'}}>Now</Text>
                </Pressable>
                <Pressable onPress={SelectTime2} backgroundColor={time2Color} style={styles.containerButton}>
                  <Text textColor={time2TextColor} style={{color:time2TextColor, fontSize:16, padding:5, fontFamily:'Quicksand_400Regular'}}>30 min</Text>
                </Pressable>
                <Pressable onPress={SelectTime3} backgroundColor={time3Color} style={styles.containerButton}>
                  <Text textColor={time3TextColor} style={{color:time3TextColor, fontSize:16, padding:5, fontFamily:'Quicksand_400Regular'}}>1 hr</Text>
                </Pressable>
                <Pressable onPress={SelectTime4} backgroundColor={time4Color} style={styles.containerButton}>
                  <Text textColor={time4TextColor} style={{color:time4TextColor, fontSize:16, padding:5, fontFamily:'Quicksand_400Regular'}}>2 hrs</Text>
                </Pressable>
                <Pressable onPress={SelectTime5} backgroundColor={time5Color} style={styles.containerButton}>
                  <Text textColor={time5TextColor} style={{color:time5TextColor, fontSize:16, padding:5, fontFamily:'Quicksand_400Regular'}}>3+ hrs</Text>
                </Pressable>
              </ScrollView>
            </View>
        </Bottom>
    </FiltersCont>
}

export default Filters;