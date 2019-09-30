import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons'

const LocationBar = ( {location, onTermChange, onTermSubmit} ) => {

    return (
        <View style={styles.backgroundStyle}>
            <Entypo name='pin' size={30} style={styles.iconStyle}/>
            <TextInput 
                autoCapitalize='none'
                autoCorrect={false}
                style={styles.inputStyle} 
                placeholder='Location' value={location} 
                onChangeText={(newLocation) => onTermChange(newLocation)}
                onEndEditing={() => onTermSubmit()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#cccccc',
        height: 50,
        borderRadius: 5, 
        marginHorizontal: 15,
        marginTop: 5,
        flexDirection: 'row',
        marginBottom: 10
    },
    inputStyle: {
        //use up as much space in that flex direction section
        flex: 1,
        fontSize: 18
    },
    iconStyle: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15
    }
});

export default LocationBar; 