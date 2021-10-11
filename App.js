import React from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput } from 'react-native';
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
      {/* just testing, feel free to delete once we get everything going */}
      <Button
          title="Restaurant"
          onPress={() => navigation.navigate('RestaurantHome')}
      />
    </LinearGradient>
  );
  }
}

function Login({ navigation }) {
// Eilidh's section - customer UI
  return (
    <LinearGradient colors={['#F3AE81', '#E94168']} style={styles.container}>
      <Text style={{color:'white', fontFamily:'Raleway_700Bold', fontSize:32}}>SaveThePlate</Text>
      <Image style={{width:40, height:40, marginTop:5}} source={logo}/>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
      {/* just added this to see if it works, feel free to delete */}
      <Text>you are on the login page</Text>
    </LinearGradient>
  );
}

//


// Adrian's's section - restaurant UI

function RestaurantHome ({  navigation }) {
  return (
    <LinearGradient colors={['#F3AE81', '#E94168']} style={homeStyles.container}>
      {/* top bar goes here */}

      <View>

        <View>
          <Text>Orders</Text>

          <Text>Listed</Text>
        </View>



        {/* seleciton UI component goes here */}
        
      </View>

      {/* search component goes here */}

      <View>
        {/* orders go here */}
      </View>


      


      

        


    {/* bottom bar */}
  </LinearGradient>
  )
}

// 

function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Home" style={{display:'none'}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RestaurantHome" component={RestaurantHome}/>
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

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center' 
  }
});

export default App;
