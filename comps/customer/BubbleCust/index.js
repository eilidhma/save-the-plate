import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import {Card, ListItem, Icon, Button} from 'react-native-elements';


const BubbleCust = ({
    onPress1=()=>{},
    onPress2=()=>{},
    heading="",
    subheading="",
    opacity="",
    back="",
    next="",
    show=true,
    src=require("../../../assets/meal.png"),
}) => {

    if(show === false){
        return <></>
    }

    if(show === true){
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.textCont}>
                    <Text style={styles.heading}>{heading}</Text>
                </View>
                <View style={styles.imgCont}>
                    <Image style={{width:280, height:350, borderRadius:20}} source={src}/>
                </View>
                <View style={styles.textCont}>
                    <Text style={styles.heading}>{subheading}</Text>
                </View>
                <View style={styles.bttnCont}>
                    <View opacity={opacity}>
                        <TouchableOpacity style={styles.buttonLeft} onPress={onPress2}>
                            <Text style={styles.backBttn}>{back}</Text>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.buttonRight} onPress={onPress1}>
                            <Text style={styles.nextBttn}>{next}</Text>
                        </TouchableOpacity>
                    </View>
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
      padding:15,

      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },

    textCont: {
        alignItems:'center',
        marginTop:5,
        marginBottom:10,
    },
    imgCont: {
        alignItems:'center',
        margin:10,
    },
    bttnCont: {
        marginTop:5,
        marginBottom:40,
    },

    
    heading: {
        color: 'black',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        width:260,
    },
    subheading: {
        color: 'black',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        width:260,
    },
    
    buttonLeft: {
        position: 'absolute',
        left: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderColor: '#ff1a44',
        borderWidth:1,
        width: 140,
        height: 30,
        borderRadius: 20,

        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    buttonRight: {
        position: 'absolute',
        right: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff1a44',
        borderColor: '#ff1a44',
        borderWidth:1,
        width: 140,
        height: 30,
        borderRadius: 20,

        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    backBttn: {
        color: '#ff1a44',
        fontSize: 14,
        fontWeight: '500',
    },
    nextBttn: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    }

});