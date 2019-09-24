import React, { Component } from 'react';
import { Text, StyleSheet, Linking } from 'react-native';

// Import icons 
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconEvilIcons from 'react-native-vector-icons/EvilIcons'
import { View } from 'react-native-animatable';

export default class ItemFlatList extends Component {

    isURL = str => {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return pattern.test(str);
    }

    render() {
        return (
            <View style={style.container} >
                <Text style={style.text}>{this.props.data.key}</Text>
                <Text style={style.text}>{this.props.data.data.substring(0, 25)}</Text>
                <View style={style.groupButton}>
                    <IconFontAwesome style={style.icon} name='trash-o' size={25} onPress={() => this.props.deleteItemById(this.props.data.key)} />
                    {this.isURL(this.props.data.data) ?
                        <IconEvilIcons name='link' size={30} style={style.icon} onPress={() => Linking.openURL(this.props.data.data)} /> :
                        <IconEvilIcons name='link' size={30} style={[style.iconDisabled, style.icon]} />}
                </View>
            </View >
        )
    }
}

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
    groupButton: {
        position: "absolute",
        right: 10,
        top: 10,
        flexDirection: "row",
    },
    icon: {
        marginTop: 5,
        padding: 5,
        color: '#9C27B0',
        fontWeight: "bold",
    },
    iconDisabled: {
        opacity: 0.4,
    }
})