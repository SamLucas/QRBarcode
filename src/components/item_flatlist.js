import React, { Component } from 'react';
import { Text, StyleSheet, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Import icons 
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'

const Item = ({ data }) => {
    return (
        <TouchableOpacity style={style.container} onPress={() => Linking.openURL(data.data)}>
            <Text style={style.text}>{data.key}</Text>
            <Text style={style.text}>{data.data.substring(0, 30)}</Text>
            <IconFontAwesome style={style.icon} name='trash-o' size={25} />
        </TouchableOpacity >
    );
}

module.exports = Item

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        padding: 12,
        borderRadius: 5
    },
    text: {
        fontSize: 14,
        padding: 10,
        marginTop: 2
    },
    icon: {
        padding: 10,
        color: '#9C27B0'
    }
})