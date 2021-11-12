import React from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput, Scrollable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useFonts,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300, Quicksand_300Light
} from '@expo-google-fonts/quicksand';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styled from 'styled-components';

var logo = require ('../../assets/logo1.png');
const Stack = createNativeStackNavigator();

const Right = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;

`
const Left = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
`

export default function Signup({ navigation }) {
  return (
    <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>
      <View style={{width:'100%', position:'absolute', top:80, display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Text style={styles.heading}>Sign Up</Text>
      </View>
      <View style={{width:'90%', backgroundColor:'white', height:2, position:'absolute', top:118}}></View> 
      <View style={styles.gradient}>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text>Name</Text>
          </View>
          <View style={styles.left}>
            <TextInput autoCompleteType={'name'} style={styles.username} placeholder={'name'} textAlign={'center'} textContentType={'name'}/>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text>Email</Text>
          </View>
          <View style={styles.left}>
            <TextInput autoCompleteType={'email'} style={styles.username} placeholder={'email'} textAlign={'center'} textContentType={'email'}/>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text>Password</Text>
          </View>
          <View style={styles.left}>
            <TextInput autoCompleteType={'password'} style={styles.username} placeholder={'password'} textAlign={'center'} textContentType={'password'}/>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text>Phone</Text>
          </View>
          <View style={styles.left}>
            <TextInput autoCompleteType={'phone'} style={styles.username} placeholder={'phone'} textAlign={'center'} textContentType={'phone'}/>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text>Address</Text>
          </View>
          <View style={styles.left}>
            <TextInput autoCompleteType={'address'} style={styles.username} placeholder={'street address'} textAlign={'center'} textContentType={'address'}/>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text>Payment</Text>
          </View>
          <View style={styles.left}>
            <TextInput autoCompleteType={'username'} style={styles.username} placeholder={'Name'} textAlign={'center'} textContentType={''}/>
          </View>
        </View>
      </View> 
      <Pressable style={styles.shadowProp} title="Signup"
        onPress={() => navigation.navigate('Signup')} >
        <Text style={{color:'white', fontFamily:'Quicksand_300Light', fontSize:18}}>Sign Up</Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    width:'90%',
    height:'50%',
    backgroundColor:'rgba(255,255,255,0.4)',
    display:'flex',
    flexDirection:'column',
    overflow:'hidden',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor:'#FF1A44',
    width:200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    padding:5,
    borderRadius:20,
  },
  username: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor:'#FFF',
    width:200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding:5,
    borderRadius:20,
    fontFamily:'Quicksand_300Light', 
    fontSize:16
  },
  heading: {
    color:'white',
    fontSize:26,
    paddingLeft:'5%',
    paddingRight:'5%',
    fontWeight:'400',
    width:'100%',
  },
  itemCont: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'90%',
    marginTop:20
  },
  right: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  left: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    
  }
});
