import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

const Vegetarian = ({
  show=V
 }) => {
  if (show === false){
    return (
      <Image 
        style={styles.iconDisabled} 
        source={require('../../../assets/icon-vegetarian.png')} />
    );
   };
  return (
    <Image 
      style={styles.icon} 
      source={require('../../../assets/icon-vegetarian.png')} />
  );
 };

 const DairyFree = ({
  show=D
 }) => {
  if (show === false){
    return (
      <Image 
        style={styles.iconDisabled} 
        source={require('../../../assets/icon-dairyfree.png')} />
    );
   };
  return (
    <Image 
      style={styles.icon} 
      source={require('../../../assets/icon-dairyfree.png')} />
  );
 };

 const GlutenFree = ({
  show=G
 }) => {
  if (show === false){
    return (
      <Image 
        style={styles.iconDisabled} 
        source={require('../../../assets/icon-glutenfree.png')} />
    );
   };
  return (
    <Image 
      style={styles.icon} 
      source={require('../../../assets/icon-glutenfree.png')} />
  );
 };

 const NutFree = ({
  show=N
 }) => {
  if (show === false){
  return (
    <Image 
      style={styles.iconDisabled}
      source={require('../../../assets/icon-nutfree.png')} />
    );
  };
  return (
    <Image 
      style={styles.icon}
      source={require('../../../assets/icon-nutfree.png')} />
  );
 };

const DietSelect = ({
  
 }) => {

  const [V, showV] = useState(false);

  function ShowVegetarian() {
    showV(!V)
  }

  const [D, showD] = useState(false);

  function ShowDairyFree() {
    showD(!D)
  }
 
  const [G, showG] = useState(false);

  function ShowGlutenFree() {
    showG(!G)
  }
 
  const [N, showN] = useState(false);

  function ShowNutFree() {
    showN(!N)
  }
 
 return (
  <View style={styles.container}>
    <View style={styles.iconContainer}>

    <TouchableOpacity onPress={ShowVegetarian}>
      <Vegetarian show={V}/>
    </TouchableOpacity>

    <TouchableOpacity onPress={ShowDairyFree}>
      <DairyFree show={D}/>
    </TouchableOpacity>

    <TouchableOpacity onPress={ShowGlutenFree}>
      <GlutenFree show={G}/>
    </TouchableOpacity>

    <TouchableOpacity onPress={ShowNutFree}>
      <NutFree show={N}/>
    </TouchableOpacity>

    </View>
  </View>
 );
}

export default DietSelect;

const styles = StyleSheet.create({
 container: {
  alignItems: 'center',
  justifyContent: 'center',
  width: "100%",
 },
 iconContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%"
 },
 icon: {
  width: 50,
  height: 50,
  margin: 1,
},
 iconDisabled: {
  width: 50,
  height: 50,
  margin: 1,
  opacity: 0.3,
},
});

