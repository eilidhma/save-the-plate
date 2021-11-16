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
    iconName="filter-outline"
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

    // !--------------------- CUISINE --------------------!
    // ITALIAN 
    const [c1Color, setC1Color] = useState("white")
    const [c1TextColor, setC1TextColor] = useState("#ff1a44")
    const [c1Selected, setC1Selected] = useState(false)
    const SelectCuisine1 = () => {
      setC1Selected(!c1Selected)
      
      if(c1Selected === false){
        setC1Color("#ff1a44")
        setC1TextColor("white")
      } else {
        setC1Color("white")
        setC1TextColor("#ff1a44")
      }
    }
    // MEXICAN
    const [c2Color, setC2Color] = useState("white")
    const [c2TextColor, setC2TextColor] = useState("#ff1a44")
    const [c2Selected, setC2Selected] = useState(false)
    const SelectCuisine2 = () => {
      setC2Selected(!c2Selected)
      
      if(c2Selected === false){
        setC2Color("#ff1a44")
        setC2TextColor("white")
      } else {
        setC2Color("white")
        setC2TextColor("#ff1a44")
      }
    }
    // VIETNAMESE
    const [c3Color, setC3Color] = useState("white")
    const [c3TextColor, setC3TextColor] = useState("#ff1a44")
    const [c3Selected, setC3Selected] = useState(false)
    const SelectCuisine3 = () => {
      setC3Selected(!c3Selected)
      
      if(c3Selected === false){
        setC3Color("#ff1a44")
        setC3TextColor("white")
      } else {
        setC3Color("white")
        setC3TextColor("#ff1a44")
      }
    }
    // AMERICAN
    const [c4Color, setC4Color] = useState("white")
    const [c4TextColor, setC4TextColor] = useState("#ff1a44")
    const [c4Selected, setC4Selected] = useState(false)
    const SelectCuisine4 = () => {
      setC4Selected(!c4Selected)
      
      if(c4Selected === false){
        setC4Color("#ff1a44")
        setC4TextColor("white")
      } else {
        setC4Color("white")
        setC4TextColor("#ff1a44")
      }
    }

    // !--------------------- DISTANCE --------------------!
    // 200m 
    const [dist1Color, setDist1Color] = useState("white")
    const [dist1TextColor, setDist1TextColor] = useState("#ff1a44")
    const [dist1Selected, setDist1Selected] = useState(false)
    const SelectDistance1 = () => {
      setDist1Selected(!dist1Selected)
      
      if(dist1Selected === false){
        setDist1Color("#ff1a44")
        setDist1TextColor("white")
      } else {
        setDist1Color("white")
        setDist1TextColor("#ff1a44")
      }
    }
    // 500m
    const [dist2Color, setDist2Color] = useState("white")
    const [dist2TextColor, setDist2TextColor] = useState("#ff1a44")
    const [dist2Selected, setDist2Selected] = useState(false)
    const SelectDistance2 = () => {
      setDist2Selected(!dist2Selected)
      
      if(dist2Selected === false){
        setDist2Color("#ff1a44")
        setDist2TextColor("white")
      } else {
        setDist2Color("white")
        setDist2TextColor("#ff1a44")
      }
    }
    // 1km
    const [dist3Color, setDist3Color] = useState("white")
    const [dist3TextColor, setDist3TextColor] = useState("#ff1a44")
    const [dist3Selected, setDist3Selected] = useState(false)
    const SelectDistance3 = () => {
      setDist3Selected(!dist3Selected)
      
      if(dist3Selected === false){
        setDist3Color("#ff1a44")
        setDist3TextColor("white")
      } else {
        setDist3Color("white")
        setDist3TextColor("#ff1a44")
      }
    }
    // 5km
    const [dist4Color, setDist4Color] = useState("white")
    const [dist4TextColor, setDist4TextColor] = useState("#ff1a44")
    const [dist4Selected, setDist4Selected] = useState(false)
    const SelectDistance4 = () => {
      setDist4Selected(!dist4Selected)
      
      if(dist4Selected === false){
        setDist4Color("#ff1a44")
        setDist4TextColor("white")
      } else {
        setDist4Color("white")
        setDist4TextColor("#ff1a44")
      }
    }
    // 10km
    const [dist5Color, setDist5Color] = useState("white")
    const [dist5TextColor, setDist5TextColor] = useState("#ff1a44")
    const [dist5Selected, setDist5Selected] = useState(false)
    const SelectDistance5 = () => {
      setDist5Selected(!dist5Selected)
      
      if(dist5Selected === false){
        setDist5Color("#ff1a44")
        setDist5TextColor("white")
      } else {
        setDist5Color("white")
        setDist5TextColor("#ff1a44")
      }
    }

    // !--------------------- DIETARY --------------------!
    // Gluten Free 
    const [diet1Color, setDiet1Color] = useState("white")
    const [diet1TextColor, setDiet1TextColor] = useState("#ff1a44")
    const [diet1Selected, setDiet1Selected] = useState(false)
    const SelectDiet1 = () => {
      setDiet1Selected(!diet1Selected)
      
      if(diet1Selected === false){
        setDiet1Color("#ff1a44")
        setDiet1TextColor("white")
      } else {
        setDiet1Color("white")
        setDiet1TextColor("#ff1a44")
      }
    }
    // Dairy Free
    const [diet2Color, setDiet2Color] = useState("white")
    const [diet2TextColor, setDiet2TextColor] = useState("#ff1a44")
    const [diet2Selected, setDiet2Selected] = useState(false)
    const SelectDiet2 = () => {
      setDiet2Selected(!diet2Selected)
      
      if(diet2Selected === false){
        setDiet2Color("#ff1a44")
        setDiet2TextColor("white")
      } else {
        setDiet2Color("white")
        setDiet2TextColor("#ff1a44")
      }
    }
    // Nut Free
    const [diet3Color, setDiet3Color] = useState("white")
    const [diet3TextColor, setDiet3TextColor] = useState("#ff1a44")
    const [diet3Selected, setDiet3Selected] = useState(false)
    const SelectDiet3 = () => {
      setDiet3Selected(!diet3Selected)
      
      if(diet3Selected === false){
        setDiet3Color("#ff1a44")
        setDiet3TextColor("white")
      } else {
        setDiet3Color("white")
        setDiet3TextColor("#ff1a44")
      }
    }
    // Vegetarien
    const [diet4Color, setDiet4Color] = useState("white")
    const [diet4TextColor, setDiet4TextColor] = useState("#ff1a44")
    const [diet4Selected, setDiet4Selected] = useState(false)
    const SelectDiet4 = () => {
      setDiet4Selected(!diet4Selected)
      
      if(diet4Selected === false){
        setDiet4Color("#ff1a44")
        setDiet4TextColor("white")
      } else {
        setDiet4Color("white")
        setDiet4TextColor("#ff1a44")
      }
    }

    // !--------------------- TIME --------------------!
    // Now
    const [time1Color, setTime1Color] = useState("white")
    const [time1TextColor, setTime1TextColor] = useState("#ff1a44")
    const [time1Selected, setTime1Selected] = useState(false)
    const SelectTime1 = () => {
      setTime1Selected(!time1Selected)
      
      if(time1Selected === false){
        setTime1Color("#ff1a44")
        setTime1TextColor("white")
      } else {
        setTime1Color("white")
        setTime1TextColor("#ff1a44")
      }
    }
    // 30 min
    const [time2Color, setTime2Color] = useState("white")
    const [time2TextColor, setTime2TextColor] = useState("#ff1a44")
    const [time2Selected, setTime2Selected] = useState(false)
    const SelectTime2 = () => {
      setTime2Selected(!time2Selected)
      
      if(time2Selected === false){
        setTime2Color("#ff1a44")
        setTime2TextColor("white")
      } else {
        setTime2Color("white")
        setTime2TextColor("#ff1a44")
      }
    }
    // 1 hour
    const [time3Color, setTime3Color] = useState("white")
    const [time3TextColor, setTime3TextColor] = useState("#ff1a44")
    const [time3Selected, setTime3Selected] = useState(false)
    const SelectTime3 = () => {
      setTime3Selected(!time3Selected)
      
      if(time3Selected === false){
        setTime3Color("#ff1a44")
        setTime3TextColor("white")
      } else {
        setTime3Color("white")
        setTime3TextColor("#ff1a44")
      }
    }
    // 2 hours
    const [time4Color, setTime4Color] = useState("white")
    const [time4TextColor, setTime4TextColor] = useState("#ff1a44")
    const [time4Selected, setTime4Selected] = useState(false)
    const SelectTime4 = () => {
      setTime4Selected(!time4Selected)
      
      if(time4Selected === false){
        setTime4Color("#ff1a44")
        setTime4TextColor("white")
      } else {
        setTime4Color("white")
        setTime4TextColor("#ff1a44")
      }
    }
    // 3 hours +
    const [time5Color, setTime5Color] = useState("white")
    const [time5TextColor, setTime5TextColor] = useState("#ff1a44")
    const [time5Selected, setTime5Selected] = useState(false)
    const SelectTime5 = () => {
      setTime5Selected(!time5Selected)
      
      if(time5Selected === false){
        setTime5Color("#ff1a44")
        setTime5TextColor("white")
      } else {
        setTime5Color("white")
        setTime5TextColor("#ff1a44")
      }
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
                <Text style={{fontFamily:'Quicksand_400Regular', fontSize:16, padding:5}}>Cuisine</Text>
              <ScrollView horizontal={true} contentContainerStyle={{width:'100%', justifyContent:'space-between'}}>
                <Pressable onPress={SelectCuisine1} backgroundColor={c1Color} style={styles.containerButton}>
                  <Text textColor={c1TextColor} style={{color:c1TextColor, fontSize:16, padding:5,}}>Italian</Text>
                </Pressable>
                <Pressable onPress={SelectCuisine2} backgroundColor={c2Color} style={styles.containerButton}>
                  <Text textColor={c2TextColor} style={{color:c2TextColor, fontSize:16, padding:5,}}>Mexican</Text>
                </Pressable>
                <Pressable onPress={SelectCuisine3} backgroundColor={c3Color} style={styles.containerButton}>
                  <Text textColor={c3TextColor} style={{color:c3TextColor, fontSize:16, padding:5,}}>Vietnamese</Text>
                </Pressable>
                <Pressable onPress={SelectCuisine4} backgroundColor={c4Color} style={styles.containerButton}>
                  <Text textColor={c4TextColor} style={{color:c4TextColor, fontSize:16, padding:5,}}>American</Text>
                </Pressable>
              </ScrollView>
            </View>

            <View style={{margin:5}}>
                <Text style={{fontFamily:'Quicksand_400Regular', fontSize:16, padding:5}}>Distance from me</Text>
              <ScrollView horizontal={true} contentContainerStyle={{width:'100%', justifyContent:'space-between'}}>
                <Pressable onPress={SelectDistance1} backgroundColor={dist1Color} style={styles.containerButton}>
                  <Text textColor={dist1TextColor} style={{color:dist1TextColor, fontSize:16, padding:5,}}>200m</Text>
                </Pressable>
                <Pressable onPress={SelectDistance2} backgroundColor={dist2Color} style={styles.containerButton}>
                  <Text textColor={dist2TextColor} style={{color:dist2TextColor, fontSize:16, padding:5,}}>500m</Text>
                </Pressable>
                <Pressable onPress={SelectDistance3} backgroundColor={dist3Color} style={styles.containerButton}>
                  <Text textColor={dist3TextColor} style={{color:dist3TextColor, fontSize:16, padding:5,}}>1km</Text>
                </Pressable>
                <Pressable onPress={SelectDistance4} backgroundColor={dist4Color} style={styles.containerButton}>
                  <Text textColor={dist4TextColor} style={{color:dist4TextColor, fontSize:16, padding:5,}}>5km</Text>
                </Pressable>
                <Pressable onPress={SelectDistance5} backgroundColor={dist5Color} style={styles.containerButton}>
                  <Text textColor={dist5TextColor} style={{color:dist5TextColor, fontSize:16, padding:5,}}>10km</Text>
                </Pressable>
              </ScrollView>
            </View>

            <View style={{margin:5}}>
                <Text style={{fontFamily:'Quicksand_400Regular', fontSize:16, padding:5}}>Dietary restrictions</Text>
              <ScrollView horizontal={true} contentContainerStyle={{width:'100%', justifyContent:'space-between'}}>
                <Pressable onPress={SelectDiet1} backgroundColor={diet1Color} style={styles.containerButton}>
                  <Text textColor={diet1TextColor} style={{color:diet1TextColor, fontSize:16, padding:5,}}>Gluten Free</Text>
                </Pressable>
                <Pressable onPress={SelectDiet2} backgroundColor={diet2Color} style={styles.containerButton}>
                  <Text textColor={diet2TextColor} style={{color:diet2TextColor, fontSize:16, padding:5,}}>Dairy Free</Text>
                </Pressable>
                <Pressable onPress={SelectDiet3} backgroundColor={diet3Color} style={styles.containerButton}>
                  <Text textColor={diet3TextColor} style={{color:diet3TextColor, fontSize:16, padding:5,}}>Nut Free</Text>
                </Pressable>
                <Pressable onPress={SelectDiet4} backgroundColor={diet4Color} style={styles.containerButton}>
                  <Text textColor={diet4TextColor} style={{color:diet4TextColor, fontSize:16, padding:5,}}>Vegetarian</Text>
                </Pressable>
              </ScrollView>
            </View>

            <View style={{margin:5}}>
                <Text style={{fontFamily:'Quicksand_400Regular', fontSize:16, padding:5}}>Time available</Text>
              <ScrollView horizontal={true} contentContainerStyle={{width:'100%', justifyContent:'space-between'}}>
                <Pressable onPress={SelectTime1} backgroundColor={time1Color} style={styles.containerButton}>
                  <Text textColor={time1TextColor} style={{color:time1TextColor, fontSize:16, padding:5,}}>Now</Text>
                </Pressable>
                <Pressable onPress={SelectTime2} backgroundColor={time2Color} style={styles.containerButton}>
                  <Text textColor={time2TextColor} style={{color:time2TextColor, fontSize:16, padding:5,}}>30 min</Text>
                </Pressable>
                <Pressable onPress={SelectTime3} backgroundColor={time3Color} style={styles.containerButton}>
                  <Text textColor={time3TextColor} style={{color:time3TextColor, fontSize:16, padding:5,}}>1 hr</Text>
                </Pressable>
                <Pressable onPress={SelectTime4} backgroundColor={time4Color} style={styles.containerButton}>
                  <Text textColor={time4TextColor} style={{color:time4TextColor, fontSize:16, padding:5,}}>2 hrs</Text>
                </Pressable>
                <Pressable onPress={SelectTime5} backgroundColor={time5Color} style={styles.containerButton}>
                  <Text textColor={time5TextColor} style={{color:time5TextColor, fontSize:16, padding:5,}}>3+ hrs</Text>
                </Pressable>
              </ScrollView>
            </View>
        </Bottom>
    </FiltersCont>
}

export default Filters;