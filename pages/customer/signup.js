import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput, Scrollable, Modal } from 'react-native';
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
import { auth } from '../../firebase';
import axios from 'axios';

var logo = require ('../../assets/logo1.png');
const Stack = createNativeStackNavigator();

import CuisineSelect from '../../comps/Restaurant/CuisineSelect';

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

  const [name, setName] = useState()
  const [fuid, setFuid] = useState('')
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [plates_saved, setPlatesSaved] = useState(0)
  const [phone, setPhone] = useState()
  const [addLine1, setAddLine1] = useState()
  const [addLine2, setAddLine2] = useState()
  const [postalCode, setPostalCode] = useState()
  const [city, setCity] = useState()
  const [province, setProvince] = useState()
  const [cardNumber, setCardNumber] = useState()
  const [cardName, setCardName] = useState()
  const [expiry, setExpiry] = useState()
  const [cvc, setCvc] = useState()

  const [isRestaurant, setIsRestaurant] = useState(null)
  const [isCuisine, setIsCuisine] = useState(false)
  const [restStep, setRestStep] = useState(0)

  const [modalVisible, setModalVisible] = useState(false)

  // CHECK IF USER IS SIGNED IN
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user) {
        var userID = auth.currentUser?.uid;
        checkIfRestaurant(userID);
      }
      
      else {
        setModalVisible(true);
      }
    });
  }, [])


  const checkIfRestaurant = async (uid) => {
    const result = await axios.get('/users.php?fuid=' + uid)
    
     var page = result.data[0].restaurant;

     if (page === '0')
     {
       navigation.navigate('Home')
       console.log(page)
     }

     else if (page === '1')
     {
       navigation.navigate('RestaurantHome')
       console.log(page)
     } 
  }


  const UserData = async (fuid) => {
    const result = await axios.post('/users.php', {
      full_name:name,
      fuid:fuid,
      email:email,
      password:password,
      plates_saved:plates_saved,
      phone:phone,
      add1:addLine1,
      add2:addLine2,
      postal_code:postalCode,
      city:city,
      province:province,
      restaurant:isRestaurant,
      cuisine:isCuisine
    });
    console.log(result, result.data);
  }


  const PostUser = () => {
    
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredendtials => {
      const user = userCredendtials.user;
      setFuid(user.uid);
      UserData(user.uid);
      console.log('Registered with:', user.email);
    })
    .catch(error => alert(error.message));
  }

  const SetCustomer = () => {
    setIsRestaurant(false)
    setModalVisible(false)
  }

  const SetRestaurant = () => {
    setIsRestaurant(true)
    setModalVisible(false)
    setRestStep(1)
  }

  return (
    <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>

      {/* customer */}
      {isRestaurant == false && <View style={{width: "100%",height: "100%", flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Text style={styles.custheading}>Customer Sign Up</Text>
      </View>
      <View style={{width:'90%', backgroundColor:'white', height:2, position:'absolute', top:118}}></View> 
      <View style={styles.custgradient}>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text style={{fontWeight:'500', fontSize:16}}>Name</Text>
          </View>
          <View style={styles.left}>
            <TextInput autoCompleteType={'name'} onChangeText={text=>setName(text)} style={styles.username} placeholder={'name'} textAlign={'center'} textContentType={'name'}/>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text style={{fontWeight:'500', fontSize:16}}>Email</Text>
          </View>
          <View style={styles.left}>
            <TextInput value={email} onChangeText={text=>setEmail(text)} autoCompleteType={'email'} style={styles.username} placeholder={'email'} textAlign={'center'} textContentType={'emailAddress'}/>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text style={{fontWeight:'500', fontSize:16}}>Password</Text>
          </View>
          <View style={styles.left}>
            <TextInput secureTextEntry value={password} onChangeText={text=>setPassword(text)} autoCompleteType={'password'} style={styles.username} placeholder={'password'} textAlign={'center'} textContentType={'password'}/>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text style={{fontWeight:'500', fontSize:16}}>Phone</Text>
          </View>
          <View style={styles.left}>
            <TextInput value={phone} onChangeText={text=>setPhone(text)} autoCompleteType={'tel'} style={styles.username} placeholder={'phone'} textAlign={'center'} textContentType={'telephoneNumber'}/>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text style={{fontWeight:'500', fontSize:16}}>Address</Text>
          </View>
          <View style={{display:'flex', flexDirection:'column'}}>
             <View style={styles.left}>
              <TextInput value={addLine1} onChangeText={text=>setAddLine1(text)} autoCompleteType={'street-address'} style={styles.username} placeholder={'street address'} textAlign={'center'} textContentType={'streetAddressLine1'}/>
            </View>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text></Text>
          </View>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:200}}>
             <View style={styles.left}>
              <TextInput value={addLine2} onChangeText={text=>setAddLine2(text)} autoCompleteType={'off'} style={styles.smallInput} placeholder={'apt #'} textAlign={'center'} textContentType={'streetAddressLine2'}/>
            </View>
            <View style={styles.left}>
              <TextInput value={postalCode} onChangeText={text=>setPostalCode(text)} autoCompleteType={'postal-code'} style={styles.smallInput} placeholder={'postal code'} textAlign={'center'} textContentType={'postalCode'}/>
            </View>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text></Text>
          </View>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:200}}>
             <View style={styles.left}>
              <TextInput value={city} onChangeText={text=>setCity(text)} autoCompleteType={'street-address'} style={styles.smallInput} placeholder={'city'} textAlign={'center'} textContentType={'addressCity'}/>
            </View>
            <View style={styles.left}>
              <TextInput value={province} onChangeText={text=>setProvince(text)} autoCompleteType={'street-address'} style={styles.smallInput} placeholder={'province'} textAlign={'center'} textContentType={'addressState'}/>
            </View>
          </View>
        </View>
        {/* <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text style={{fontWeight:'500', fontSize:16}}>Payment</Text>
          </View>
          <View style={{display:'flex', flexDirection:'column'}}>
             <View style={styles.left}>
              <TextInput value={cardNumber} onChangeText={text=>setCardNumber(text)} autoCompleteType={'cc-number'} style={styles.username} placeholder={'card number'} textAlign={'center'} textContentType={'creditCardNumber'}/>
            </View>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text></Text>
          </View>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:200}}>
             <View style={styles.left}>
              <TextInput value={cardName} onChangeText={text=>setCardName(text)} autoCompleteType={'name'} style={styles.username} placeholder={'name on card'} textAlign={'center'} textContentType={'name'}/>
            </View>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text></Text>
          </View>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:200}}>
             <View style={styles.left}>
              <TextInput value={expiry} onChangeText={text=>setExpiry(text)} autoCompleteType={'cc-exp'} style={styles.smallInput} placeholder={'expiry'} textAlign={'center'} textContentType={'none'}/>
            </View>
            <View style={styles.left}>
              <TextInput value={cvc} onChangeText={text=>setCvc(text)} autoCompleteType={'cc-csc'} style={styles.smallInput} placeholder={'CVC'} textAlign={'center'} textContentType={'none'}/>
            </View>
          </View>
        </View> */}
        <Pressable style={styles.shadowProp} title="Signup"
        onPress={PostUser} >
        <Text style={{color:'white', fontFamily:'Quicksand_300Light', fontSize:18}}>Sign Up</Text>
      </Pressable>
      </View> 
      </View> }


      {/* restaurant */}
      {isRestaurant == true && <View style={{width: "100%",height: "100%", flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Text style={styles.custheading}>Restaurant Sign Up</Text>
      </View>
      <View style={{width:'90%', backgroundColor:'white', height:2, position:'absolute', top:118}}></View> 
      {restStep == 1
      ? <View style={styles.custgradient}>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text style={{fontWeight:'500', fontSize:16}}>Restaurant Name</Text>
          </View>
          <View style={styles.left}>
            <TextInput autoCompleteType={'name'} onChangeText={text=>setName(text)} style={styles.username} placeholder={'name'} textAlign={'center'} textContentType={'name'}/>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text style={{fontWeight:'500', fontSize:16}}>Email</Text>
          </View>
          <View style={styles.left}>
            <TextInput value={email} onChangeText={text=>setEmail(text)} autoCompleteType={'email'} style={styles.username} placeholder={'email'} textAlign={'center'} textContentType={'emailAddress'}/>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text style={{fontWeight:'500', fontSize:16}}>Password</Text>
          </View>
          <View style={styles.left}>
            <TextInput secureTextEntry value={password} onChangeText={text=>setPassword(text)} autoCompleteType={'password'} style={styles.username} placeholder={'password'} textAlign={'center'} textContentType={'password'}/>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text style={{fontWeight:'500', fontSize:16}}>Phone</Text>
          </View>
          <View style={styles.left}>
            <TextInput value={phone} onChangeText={text=>setPhone(text)} autoCompleteType={'tel'} style={styles.username} placeholder={'phone'} textAlign={'center'} textContentType={'telephoneNumber'}/>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text style={{fontWeight:'500', fontSize:16}}>Address</Text>
          </View>
          <View style={{display:'flex', flexDirection:'column'}}>
            <View style={styles.left}>
              <TextInput value={addLine1} onChangeText={text=>setAddLine1(text)} autoCompleteType={'street-address'} style={styles.username} placeholder={'street address'} textAlign={'center'} textContentType={'streetAddressLine1'}/>
            </View>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text></Text>
          </View>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:200}}>
            <View style={styles.left}>
              <TextInput value={addLine2} onChangeText={text=>setAddLine2(text)} autoCompleteType={'off'} style={styles.smallInput} placeholder={'apt #'} textAlign={'center'} textContentType={'streetAddressLine2'}/>
            </View>
            <View style={styles.left}>
              <TextInput value={postalCode} onChangeText={text=>setPostalCode(text)} autoCompleteType={'postal-code'} style={styles.smallInput} placeholder={'postal code'} textAlign={'center'} textContentType={'postalCode'}/>
            </View>
          </View>
        </View>
        <View style={styles.itemCont}> 
          <View style={styles.left}>
            <Text></Text>
          </View>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:200}}>
            <View style={styles.left}>
              <TextInput value={city} onChangeText={text=>setCity(text)} autoCompleteType={'street-address'} style={styles.smallInput} placeholder={'city'} textAlign={'center'} textContentType={'addressCity'}/>
            </View>
            <View style={styles.left}>
              <TextInput value={province} onChangeText={text=>setProvince(text)} autoCompleteType={'street-address'} style={styles.smallInput} placeholder={'province'} textAlign={'center'} textContentType={'addressState'}/>
            </View>
          </View>
        </View>
        <Pressable style={styles.shadowProp}
        onPress={()=>setRestStep(2)} >
        <Text style={{color:'white', fontFamily:'Quicksand_300Light', fontSize:18}}>Next Step</Text>
      </Pressable>
      </View>
      
      : <View style={styles.gradient}>
        
        <Text style={{fontWeight:'500', fontSize:16}}>
          Select your Cuisine
        </Text>
        <CuisineSelect onSelect={(c)=>setIsCuisine(c)}/>

        <Pressable style={styles.shadowProp} title="Signup"
        onPress={PostUser} >
        <Text style={{color:'white', fontFamily:'Quicksand_300Light', fontSize:18}}>Sign Up</Text>
      </Pressable>
        </View>
      } 

      </View> }


      
      {/* modal that pops up */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{display:'flex', flexDirection:'column', width:'90%', justifyContent:'center', alignItems:'center'}}>
              <Text>Are you a signing up as a Customer or Restaurant?</Text>

              <Pressable style={styles.shadowPropDark} onPress={SetCustomer}>
                <Text style={{color:'white', fontSize:18}}>Customer</Text>
              </Pressable>
              <Pressable style={styles.shadowPropLight} onPress={SetRestaurant}>
                <Text style={{color:'white', fontSize:18}}>Restaurant</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      
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
  custgradient: {
    width:'90%',
    height:'60%',
    backgroundColor:'rgba(255,255,255,0.6)',
    display:'flex',
    flexDirection:'column',
    overflow:'hidden',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
    position: 'relative',
    top: 50
  },
  gradient: {
    width:'90%',
    height:'60%',
    backgroundColor:'rgba(255,255,255,0.6)',
    display:'flex',
    flexDirection:'column',
    overflow:'hidden',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
    position: 'relative',
    top: 50,
    paddingLeft: "5%",
    paddingRight: "5%",
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
  custheading: {
    color:'white',
    fontSize:26,
    paddingLeft:'5%',
    paddingRight:'5%',
    fontWeight:'400',
    width:'100%',
    position: 'relative',
    bottom: 70
  },

  heading: {
    color:'white',
    fontSize:26,
    paddingLeft:'5%',
    paddingRight:'5%',
    fontWeight:'400',
    width:'100%',
    position: 'relative',
    bottom: 70
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
    
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex:2,
    backgroundColor:'rgba(0,0,0,0.25)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 0,
    alignItems: "center",
    justifyContent:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:250,
    height:200
  },
  shadowPropDark: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor:'#FE4265',
    width:150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    padding:5,
    borderRadius:20,
  },
  shadowPropLight: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor:'#F3AD81',
    width:150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    padding:5,
    borderRadius:20,
  },
});
