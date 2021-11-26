import React, { useState, useEffect } from 'react';
import {Text, TouchableOpacity, View, Image, Button} from 'react-native'
import styled from 'styled-components';

const Cont = styled.View`
    width: 100%;
    height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const Row = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Selected = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FE4265;
  border-radius: 16px;
  width: 100px;
  height: 40px;
`

const Deselected = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #FE4265;
  border-radius: 16px;
  width: 100px;
  height: 40px;
`


export default CuisineSelect = ({
    onSelect=()=>{}
}) => {


const [cuisine, setCuisine] = useState()
useEffect(()=>{
    onSelect(cuisine)
},[cuisine])

function MiddleEast () {
    setCuisine("Middle East")
}

function European () {
    setCuisine("European")
}

function Indian () {
    setCuisine("Indian")
}
function Mexican () {
    setCuisine("Mexican")
}

function Western () {
    setCuisine("Western")
}

function Japanese () {
    setCuisine("Japanese")
}

function Chinese () {
    setCuisine("Chinese")
}

function Vietnamese () {
    setCuisine("Vietnamese")
}
function Korean () {
    setCuisine("Korean")
}

    return (
        <Cont>
            <Row>
                {cuisine === "Middle East"
                ? <Selected>
                    <Text style={{color:"white"}}>Middle East</Text>
                    </Selected>
                : <Deselected onPress={MiddleEast}>
                    <Text style={{color: "#FE4265"}}>Middle East</Text>
                    </Deselected>
                }
                {cuisine === "European"
                ? <Selected>
                    <Text style={{color:"white"}}>European</Text>
                    </Selected>
                : <Deselected onPress={European}>
                    <Text style={{color: "#FE4265"}}>European</Text>
                    </Deselected>
                }
                {cuisine === "Indian"
                ? <Selected>
                    <Text style={{color:"white"}}>Indian</Text>
                    </Selected>
                : <Deselected onPress={Indian}>
                    <Text style={{color: "#FE4265"}}>Indian</Text>
                    </Deselected>
                }
            </Row>

            <Row>
                {cuisine === "Mexican"
                ? <Selected>
                    <Text style={{color:"white"}}>Mexican</Text>
                    </Selected>
                : <Deselected onPress={Mexican}>
                    <Text style={{color: "#FE4265"}}>Mexican</Text>
                    </Deselected>
                }
                {cuisine === "Western"
                ? <Selected>
                    <Text style={{color:"white"}}>Western</Text>
                    </Selected>
                : <Deselected onPress={Western}>
                    <Text style={{color: "#FE4265"}}>Western</Text>
                    </Deselected>
                }
                {cuisine === "Japanese" 
                ? <Selected>
                    <Text style={{color:"white"}}>Japanese</Text>
                    </Selected>
                : <Deselected onPress={Japanese}>
                    <Text style={{color: "#FE4265"}}>Japanese</Text>
                    </Deselected>
                }
            </Row>

            <Row>
            {cuisine === "Chinese" 
                ? <Selected>
                    <Text style={{color:"white"}}>Chinese</Text>
                    </Selected>
                : <Deselected onPress={Chinese}>
                    <Text style={{color: "#FE4265"}}>Chinese</Text>
                    </Deselected>
                }
                {cuisine === "Vietnamese"
                ? <Selected>
                    <Text style={{color:"white"}}>Vietnamese</Text>
                    </Selected>
                : <Deselected onPress={Vietnamese}>
                    <Text style={{color: "#FE4265"}}>Vietnamese</Text>
                    </Deselected>
                }
                {cuisine === "Korean"
                ? <Selected>
                    <Text style={{color:"white"}}>Korean</Text>
                    </Selected>
                : <Deselected onPress={Korean}>
                    <Text style={{color: "#FE4265"}}>Korean</Text>
                    </Deselected>
                }
            </Row>
        </Cont>
    );
};