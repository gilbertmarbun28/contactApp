import React, { Component } from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class homeContact extends Component{
    render(){
        return(
            <View style = {style.home}>
                <Text style={{fontSize:25}}>Home</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    home:{
        alignItems:'center',
        justifyContent:'center',
        paddingTop:15,
    },
});