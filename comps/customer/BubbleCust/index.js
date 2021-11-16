import { flexbox } from '@mui/system';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import {Card, ListItem, Icon, Button} from 'react-native-elements';


const BubbleCust = ({
    onPress=()=>{},
    heading="",
    back="",
    next="",
    show=true,
    src=require("../../../assets/meal.png"),
}) => {

    if(show === true){
    return (
        <View style={{}}>
        <View style={styles.container}>
            <View style={styles.textCont}>
                <Text style={styles.heading}>{heading}</Text>
            </View>
            <View style={styles.imgCont}>
                <Image style={{width:280, height:350, borderRadius:20}} source={src}/>
            </View>
            <View style={styles.bttnCont}>
                <TouchableOpacity style={styles.buttonRight} onPress={onPress}>
                    <Text style={styles.nextBttn}>{next}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonLeft} onPress={onPress}>
                    <Text style={styles.backBttn}>{back}</Text>
                </TouchableOpacity>
            </View>
        </View>
        </View>
    );
    }

    return <></>
}

export default BubbleCust;

const styles = StyleSheet.create({
    container: {
      zIndex: 5,
      width: 350,
      borderRadius: 20,

      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },

    textCont: {
        alignItems:'center',
        marginTop:20,
        marginBottom:15,
    },
    imgCont: {
        alignItems:'center',
        margin:5,
    },
    bttnCont: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:15,
        marginBottom:20,
    },

    
    heading: {
        color: 'black',
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        width:250,
    },
    
    buttonLeft: {
        position: 'absolute',
        left: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: 130,
        height: 30,
        borderRadius: 20,

        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    buttonRight: {
        position: 'absolute',
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#aaa',
        width: 130,
        height: 30,
        borderRadius: 20,

        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    backBttn: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
    },
    nextBttn: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
    }

});