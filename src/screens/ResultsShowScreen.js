import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import yelp from '../api/yelp';
import ResultMap from '../components/ResultMap';

const ResultsShowScreen = ({ navigation }) => {
    const [result, setResult] = useState(null);
    //getting the parameter we passed in ResultList called 'id'
    const id = navigation.getParam('id');

    const getResult = async (id) => {
        const {data} = await yelp.get(`${id}`);
        setResult(data);
    }

    //only need to retrieve the information one (not going to rerender multiple times)
    useEffect(() => {
        getResult(id);
    }, []);

    //only show something on the screen when result is a value
    if(!result) {
        return null;
    } 

    return (
        <View >
            <Text style={styles.resultName}>{result.name}</Text> 
            {
                result.location.display_address.map((elem, index) => {
                    return (
                        <Text style={styles.resultInfo} key={index}>{elem}</Text>
                    ) 
                })
            }
            <Text style={styles.resultInfo}>Phone: {result.display_phone}</Text>
            <FlatList
                horizontal={true}
                data={result.photos}
                keyExtractor={(photo) => photo}
                renderItem={({ item }) => {
                    return (
                        <Image style={styles.image} source={{ uri: item }} /> 
                    )
                }}
            />
            <ResultMap resultName={result.name} resultCoordinates={result.coordinates}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        height: 200,
        width: 200,
        marginBottom: 10,
        marginLeft: 5,
        borderRadius: 5
    },
    resultName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        marginLeft: 5,
    },
    resultInfo: {
        fontSize: 16,
        marginBottom: 5,
        borderRadius: 5,
        marginLeft: 5
    }
});

export default ResultsShowScreen;