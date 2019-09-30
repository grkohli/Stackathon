import React from 'react';
import { View, Image, Text, StyleSheet, FlatList } from 'react-native';

const ResultsDetail = ({ result }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.imageStyle} source={{ uri: result.image_url }}/>
            <Text style={styles.name}>{result.name}</Text>
            <Text>{result.rating} Stars, {result.review_count} Reviews</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    //by default an image wants to collapse itself
    container: {
        marginLeft: 15
    },
    name: {
        fontWeight: "bold"
    },
    imageStyle: {
        height: 120,
        width: 250,
        borderRadius: 5
    }
});

export default ResultsDetail;