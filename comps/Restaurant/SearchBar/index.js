import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput } from 'react-native';
import {
  useFonts,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300, Quicksand_300Light, Quicksand_400Regular
} from '@expo-google-fonts/quicksand';
import styled from 'styled-components';
import { Feather, MaterialIcons, Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';


export default class Search extends React.Component {
    state = {
        search: '',
    };
    
    updateSearch = (search) => {
        this.setState({ search });
    };
    
    render() {
        const { search } = this.state;
        
    return (
      <SearchBar
        placeholder="Search"
        onChangeText={this.updateSearch}
        value={search}
        round={15}
        inputStyle={{backgroundColor:'white'}}
        inputContainerStyle={{width:"100%", height:"100%", backgroundColor:'white', }}
        containerStyle={{width:"90%", height:50, backgroundColor:'white', borderRadius: 15, borderTopColor:'transparent', borderBottomColor:'transparent' }}
      />
    );
  }
}