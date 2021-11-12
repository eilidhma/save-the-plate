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
        {/* <View style={styles.itemCont}>
          <Pressable style={styles.back} title="Signup"
            onPress={() => navigation.navigate('Login')} >
            <Text style={{color:'white', fontSize:18, fontWeight:'600'}}>Back</Text>
          </Pressable>
        </View> */}
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text style={{fontWeight:'500', fontSize:16}}>Name</Text>
          </View>
          <View style={styles.left}>
            <TextInput autoCompleteType={'name'} style={styles.username} placeholder={'name'} textAlign={'center'} textContentType={'name'}/>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text style={{fontWeight:'500', fontSize:16}}>Email</Text>
          </View>
          <View style={styles.left}>
            <TextInput autoCompleteType={'email'} style={styles.username} placeholder={'email'} textAlign={'center'} textContentType={'emailAddress'}/>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text style={{fontWeight:'500', fontSize:16}}>Password</Text>
          </View>
          <View style={styles.left}>
            <TextInput autoCompleteType={'password'} style={styles.username} placeholder={'password'} textAlign={'center'} textContentType={'password'}/>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text style={{fontWeight:'500', fontSize:16}}>Phone</Text>
          </View>
          <View style={styles.left}>
            <TextInput autoCompleteType={'tel'} style={styles.username} placeholder={'phone'} textAlign={'center'} textContentType={'telephoneNumber'}/>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text style={{fontWeight:'500', fontSize:16}}>Address</Text>
          </View>
          <View style={{display:'flex', flexDirection:'column'}}>
             <View style={styles.left}>
              <TextInput autoCompleteType={'street-address'} style={styles.username} placeholder={'street address'} textAlign={'center'} textContentType={'streetAddressLine1'}/>
            </View>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text></Text>
          </View>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:200}}>
             <View style={styles.left}>
              <TextInput autoCompleteType={'off'} style={styles.smallInput} placeholder={'apt #'} textAlign={'center'} textContentType={'streetAddressLine2'}/>
            </View>
            <View style={styles.left}>
              <TextInput autoCompleteType={'postal-code'} style={styles.smallInput} placeholder={'postal code'} textAlign={'center'} textContentType={'postalCode'}/>
            </View>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text></Text>
          </View>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:200}}>
             <View style={styles.left}>
              <TextInput autoCompleteType={'address'} style={styles.smallInput} placeholder={'city'} textAlign={'center'} textContentType={'addressCity'}/>
            </View>
            <View style={styles.left}>
              <TextInput autoCompleteType={'address'} style={styles.smallInput} placeholder={'province'} textAlign={'center'} textContentType={'addressState'}/>
            </View>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text style={{fontWeight:'500', fontSize:16}}>Payment</Text>
          </View>
          <View style={{display:'flex', flexDirection:'column'}}>
             <View style={styles.left}>
              <TextInput autoCompleteType={'cc-number'} style={styles.username} placeholder={'card number'} textAlign={'center'} textContentType={'creditCardNumber'}/>
            </View>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text></Text>
          </View>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:200}}>
             <View style={styles.left}>
              <TextInput autoCompleteType={'name'} style={styles.username} placeholder={'name on card'} textAlign={'center'} textContentType={'name'}/>
            </View>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text></Text>
          </View>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:200}}>
             <View style={styles.left}>
              <TextInput autoCompleteType={'cc-exp'} style={styles.smallInput} placeholder={'expiry'} textAlign={'center'} textContentType={'none'}/>
            </View>
            <View style={styles.left}>
              <TextInput autoCompleteType={'cc-csc'} style={styles.smallInput} placeholder={'CVC'} textAlign={'center'} textContentType={'none'}/>
            </View>
          </View>
        </View>
        <Pressable style={styles.shadowProp} title="Signup"
        onPress={() => navigation.navigate('Login')} >
        <Text style={{color:'white', fontFamily:'Quicksand_300Light', fontSize:18}}>Sign Up</Text>
      </Pressable>
      </View> 
      
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom:50
  },
  gradient: {
    width:'90%',
    height:'80%',
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
    marginTop:50,
    padding:5,
    borderRadius:20,
  },
  back: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor:'rgba(254,66,101,0.25)',
    width:100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  smallInput: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor:'#FFF',
    width:95,
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
