import React, { useState, useEffect }from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput, ScrollView, Modal, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useFonts,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300, Quicksand_300Light
} from '@expo-google-fonts/quicksand';

import { NavigationContainer } from '@react-navigation/native';
import styled from 'styled-components';

import * as ImagePicker from 'expo-image-picker';

import { MaterialCommunityIcons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import PlatesSaved from '../../comps/customer/PlatesSaved';
import InfoCard from '../../comps/customer/InfoCard';
import But from '../../comps/global/Button';
import DietSelect from '../../comps/global/DietSelect';

import { storage, auth } from '../../firebase';
import "firebase/storage";
import axios from 'axios';

// add a modal that says the item is added

const TopCont = styled.Pressable`
  display:flex;
  flex-direction:row;
  width:90%;
  justify-content:flex-start;
  align-items:center;
  position:absolute;
  top:80px;
`

const IconCont = styled.Pressable`
  display:flex;
  border-radius:100px;
  border:2px solid #ffffff;
  width:100px;
  height:100px;
  justify-content:center;
  align-items:center;
`

const Cards = styled.View`
  display:flex;
  justify-content:flex-start;
  align-items:center;
  position:absolute;
  top:190px;
  width:100%;
`

const EditMenuCont = styled.View`
  width: 90%;
  height: 415px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 15px;
  margin-top:10px;
  padding:20px;
  padding-bottom:10px;
  overflow: hidden;
`;

const AddItemButton = styled.View`
  width: 130%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0px;
`

const SingleLineInput = styled.View`
  width: 67%;
  height: 40px;
  border-radius:15px;
  border: 1px solid #FE4265;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 10px
`;

const DescriptionCont = styled.View`
  width: 67%;
  height: 100px;
  border-radius:15px;
  border: 1px solid #FE4265;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
`

const AddItemModal = styled.Pressable`
 display: flex;
 flex-direction: column;
 justify-content: space-between;
 width: 100%;
 height: 679px;
 padding-right: 5%;
 padding-left: 5%;
 padding-top: 40px;
 padding-bottom: 37px;
 background-color: #ffffff;
 border-radius: 30px;
 position: relative;
 bottom: -230px;
`

const CloseModal = styled.TouchableOpacity`
  position: absolute;
  top:10px;
  right: 10px;
  width: 13px;
  height: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;

const TextCont = styled.View`
  width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: baseline;
  position: relative;
  top: 10px;
`

const ModalRow = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`

const ButtonCont = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

const ImageButtons = styled.View `
  width: 206px;
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: flex-start;
`

const CameraButtonCont = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 122px;
`

const CameraButton = styled.TouchableOpacity`
width: 50px;
height: 50px;
border-radius: 10px;
display: flex;
justify-content: center;
align-items: center;
background-color: #FE4265;
`


export default function Menu({
  restaurant="Fratelli's Bistro",
  navigation
}) {

  const [modalVisible, setModalVisible] = useState(false);
  const [EditItem, setEditItem] = useState(false);

  // values to post to database
  const [mealName, setMealName] = useState();
  const [description, setDescription] = useState()
  const [price, setPrice] = useState()
  const [oldprice, setOldPrice] = useState()
  const [nF, setnF] = useState()
  const [gF, setGF] = useState()
  const [dF, setDF] = useState()
  const [v, setV] = useState()
  const [fuid, set] = useState()
  const [menuItems, setMenuItems] = useState()
  const [restData, setRestData] = useState()

  const [refresh1, SetRefresh1] = useState()
  const [refresh2, SetRefresh2] = useState()
  // state to set image
  const [image, setImage] = useState(null);


  // get permissions
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        var { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        var { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
      /* const url = await storage.ref().child('menu/item66.jpg').getDownloadURL()
      console.log("url",url) */
    })();
  }, []);

  // get meal data and restuarant data
  useEffect(() => {

let isUnmount = false;

(async () => {
  if(!isUnmount){
    var uid = auth.currentUser?.uid;
    const result = await axios.get('/meals.php')
    const restaurantName = await axios.get('/users.php?fuid=' + auth.currentUser.uid)
    setMenuItems(result.data);
    setRestData(restaurantName.data[0].full_name)
    /* console.log(restData) */
    /* console.log(auth.currentUser.uid) */
    /* console.log(result.data) */
  }

})();

return () => {
  isUnmount = true;
}

}, [EditItem]);

  // get image from gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };



  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });


    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


  const AddMeal = async () => {
    const restaurantId = await axios.get('/users.php?fuid=' + auth.currentUser.uid)

    /* console.log(restaurantId.data[0].id) */
    const newMeal = await axios.post('/meals.php', {
      m_name:mealName,
      description:description,
      old_price:oldprice,
      new_price:price,
      nf:nF,
      gf:gF,
      df:dF,
      v:v,
      u_id:restaurantId.data[0].id
    });

    /* console.log(newMeal.data) */
    UploadIMG(newMeal.data)
  }


  const UploadIMG = async(img_name)=>{

    /* console.log(file_uri, "file") */
    const file = await fetch(image);
    const blob =  await file.blob();

    const storageRef = storage.ref();
    const imgRef = storageRef.child(`menu/item${img_name}.jpg`);

    imgRef.put(blob).then((snapshot) => {
    });
  }


  return (
    <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>
      {/* new item modal */}
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={60}>
      <AddItemModal onPress={() => Keyboard.dismiss()}>
        <CloseModal onPress={()=>setModalVisible(!modalVisible)}>
          <AntDesign name="close" size={13} color="#C4C4C4" />
        </CloseModal>

        <Text style={{alignSelf: 'center', fontSize: 25, color: "#C4C4C4"}}>
          Add New Item
        </Text>
        
        {/* image row */}
        <ModalRow style={{justifyContent:'flex-start'}}>
        <TextCont>
          <Text style={{fontWeight: 'bold'}}>Image:</Text>
        </TextCont>

          <ImageButtons>
            {image === null 
              ? <View style={{width:206, height:122, borderRadius:10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#AAAAAA'}}>
                <Text>Click on icons to add an image</Text>
              </View>
              : <Image style={{width:206, height:122, borderRadius:10}} source={{uri:image}}/>
            }

            <CameraButtonCont >

              <CameraButton onPress={takePicture}>
                <MaterialIcons name="add-a-photo" size={24} color="white" />
              </CameraButton>

              <CameraButton onPress={pickImage}>
                <MaterialIcons name="add-photo-alternate" size={24} color="white" />
              </CameraButton>
            </CameraButtonCont>
          </ImageButtons>
        </ModalRow>
        

        {/* Name row */}
        <ModalRow>
          <TextCont>
            <Text style={{fontWeight: 'bold'}}>Name:</Text>
          </TextCont>

          <SingleLineInput>
            <TextInput placeholder="Name" placeholderTextColor="#aaaaaa" onChangeText={text=>setMealName(text)}></TextInput>
          </SingleLineInput>
        </ModalRow>

        {/* Description */}
        <ModalRow>
          <TextCont>
            <Text style={{fontWeight: 'bold'}}>Description:</Text>
          </TextCont>

        <DescriptionCont>
          <TextInput placeholder="Description" placeholderTextColor="#aaaaaa" onChangeText={text=>setDescription(text)}></TextInput>
        </DescriptionCont>
        </ModalRow>

        {/* price row */}
        <ModalRow>
          <TextCont>
            <Text style={{fontWeight: 'bold'}}>Price:</Text>
          </TextCont>

          <SingleLineInput>
            <TextInput keyboardType="decimal-pad" placeholder="Price" placeholderTextColor="#aaaaaa" onChangeText={text=>setPrice(text)}></TextInput>
          </SingleLineInput>
        </ModalRow>

        
        <ModalRow>
          <TextCont>
            <Text style={{fontWeight: 'bold'}}>Old Price:</Text>
          </TextCont>

          <SingleLineInput>
            <TextInput keyboardType="decimal-pad" placeholder="Old Price" placeholderTextColor="#aaaaaa" onChangeText={text=>setOldPrice(text)}></TextInput>
          </SingleLineInput>
        </ModalRow>
        
        {/* dietary options */}
        <ModalRow>
          <TextCont>
            <Text style={{fontWeight: 'bold'}}>Dietary restrictions:</Text>
          </TextCont>

          <View style={{width:"67%"}}>
            {/* dietary options should return some function */}
            <DietSelect
              onNut={n=>setnF(n)}
              onGluten={g=>setGF(g)}
              onDairy={d=>setDF(d)}
              onVegeterian={v=>setV(v)}/>
          </View>
        </ModalRow>
        <ButtonCont>
          <But width="45%" text="Add Item" onPress={()=>{
            AddMeal()
            setModalVisible(!modalVisible)
            setImage(null)
          }}/>
          <But width="45%" text="Cancel" bgColor="#F3AD81" onPress={()=>{
            setModalVisible(!modalVisible)
            setImage(null)
            }}/>
        </ButtonCont>
      </AddItemModal>
      </KeyboardAvoidingView>

      </Modal>

      {/* edit item modal */}
      <Modal
      animationType="slide"
      transparent={true}
      visible={EditItem}
      >
      
      <AddItemModal>
        <CloseModal onPress={()=>setEditItem(!EditItem)}>
          <AntDesign name="close" size={13} color="#C4C4C4" />
        </CloseModal>

        <Text style={{alignSelf: 'center', fontSize: 25, color: "#C4C4C4"}}>
            Edit Existing Item
        </Text>
        
        {/* image row */}
        <ModalRow style={{justifyContent:'flex-start'}}>
        <TextCont>
          <Text style={{fontWeight: 'bold'}}>Image:</Text>
        </TextCont>

          <ImageButtons>
            {image === null 
              ? <View style={{width:206, height:122, borderRadius:10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#AAAAAA'}}>
                <Text>Click on icons to add an image</Text>
              </View>
              : <Image style={{width:206, height:122, borderRadius:10}} source={{uri:image}}/>
            }

            <CameraButtonCont >

              <CameraButton onPress={takePicture}>
                <MaterialIcons name="add-a-photo" size={24} color="white" />
              </CameraButton>

              <CameraButton onPress={pickImage}>
                <MaterialIcons name="add-photo-alternate" size={24} color="white" />
              </CameraButton>
            </CameraButtonCont>
          </ImageButtons>
        </ModalRow>

        {/* Name row */}
        <ModalRow>
          <TextCont>
            <Text style={{fontWeight: 'bold'}}>Name:</Text>
          </TextCont>

          <SingleLineInput>
            <TextInput placeholder="Name" placeholderTextColor="#aaaaaa"></TextInput>
          </SingleLineInput>
        </ModalRow>

        {/* Description */}
        <ModalRow>
          <TextCont>
            <Text style={{fontWeight: 'bold'}}>Description:</Text>
          </TextCont>

        <DescriptionCont>
          <TextInput placeholder="Description" placeholderTextColor="#aaaaaa"></TextInput>
        </DescriptionCont>
        </ModalRow>

        {/* price row */}
        <ModalRow>
          <TextCont>
            <Text style={{fontWeight: 'bold'}}>Price:</Text>
          </TextCont>

          <SingleLineInput>
            <TextInput placeholder="Price" placeholderTextColor="#aaaaaa"></TextInput>
          </SingleLineInput>
        </ModalRow>
        
        {/* dietary options */}
        <ModalRow>
          <TextCont>
            <Text style={{fontWeight: 'bold'}}>Dietary restrictions:</Text>
          </TextCont>

          <View style={{width:"67%"}}>
            <DietSelect/>
          </View>
        </ModalRow>
        <ButtonCont>
          <But width="45%" text="Confirm Changes"/>
          <But width="45%" text="Cancel" bgColor="#F3AD81" onPress={()=>{
            setEditItem(!EditItem)
            setImage(null)
            }}/>
        </ButtonCont>
 
      </AddItemModal>
      </Modal>
      

      <TopCont>
        <IconCont >
          <MaterialCommunityIcons name="account" size={60} color="#ffffff" />
        </IconCont>
      <Text style={{fontSize:30, fontWeight:'400', color:'#ffffff', marginLeft:20}}>{restData}</Text>
      </TopCont>

      <Cards>
        <EditMenuCont>
        <Text style={{color: "#FE4265", fontSize: 18, fontWeight: 'bold', alignSelf: 'flex-start'}} >Menu</Text>

        <View style={{width: '100%', height: '95%', paddingBottom:10}}>
            <ScrollView contentContainerStyle={{width: '100%', alignItems:'center', paddingBottom: 70}}>
            {menuItems ? menuItems.filter((x)=> {return x.fuid === auth.currentUser?.uid}).map((meals) => (
              <But 
              key={meals.mid} 
              text={meals.m_name} 
              margintop="10px"/>
            )) : null}

            </ScrollView>
        </View>
        </EditMenuCont>
        <Pressable style={styles.peachButton} onPress={()=>setModalVisible(!modalVisible)}>
          <Text style={{fontSize:18, color:'white'}}>Add New Item</Text>
        </Pressable>


        <Pressable style={styles.whiteButton} onPress={()=>navigation.goBack()}>
          <Text style={{fontSize:18, color:'#FE4265'}}>{"<"} Back</Text>
        </Pressable>
      </Cards>
      
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor:'#F3AE81',
    width:200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    padding:5,
    borderRadius:20,
  },
  whiteButton: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor:'white',
    width:250,
    height:40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:15,
    padding:5,
    borderRadius:20,
  },
  peachButton: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor:'#F3AD81',
    width:250,
    height:40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:15,
    padding:5,
    borderRadius:20,
  },
});