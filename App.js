import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useFonts,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

var logo = require ('./assets/logo.png');

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Raleway_700Bold,
  });
  if (!fontsLoaded) {
    return <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>
  </LinearGradient>;
  } else {
  return (

    <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>
      <Text style={{color:'white', fontFamily:'Raleway_700Bold', fontSize:32}}>SaveThePlate</Text>
      <Image style={{width:100, height:100, marginTop:20}} source={logo}/>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
    </LinearGradient>
  );
  }
}

function Login() {
  return (
    <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>
      <Text style={{color:'white', fontFamily:'Raleway_700Bold', fontSize:32}}>SaveThePlate</Text>
      <Image style={{width:40, height:40, marginTop:5}} source={logo}/>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
    </LinearGradient>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Home" style={{display:'none'}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
