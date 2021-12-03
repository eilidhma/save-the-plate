import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const Vegetarian = ({
  show=0
 }) => {
  if (show === 0){
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
  show=0
 }) => {
  if (show === 0){
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
  show=0
 }) => {
  if (show === 0){
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
  show=0
 }) => {
  if (show === 0){
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

const Diets = ({
  showVege=0,
  showDairy=0,
  showGluten=0,
  showNut=0,
 }) => {
 
 return (
  <View style={styles.container}>
    <View style={styles.iconContainer}>
      <Vegetarian show={showVege}/>
      <DairyFree show={showDairy}/>
      <GlutenFree show={showGluten}/>
      <NutFree show={showNut}/>
    </View>
  </View>
 );
}

export default Diets;

const styles = StyleSheet.create({
 container: {
  alignItems: 'center',
  justifyContent: 'center',
  width: "100%",
 },
 iconContainer: {
  flexDirection: "row",
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

