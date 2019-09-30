import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView,
    Button
} from 'react-native';
import SearchBar from '../components/SearchBar';
import LocationBar from '../components/LocationBar'
import yelp from '../api/yelp';
import ResultsList from '../components/ResultsList';
import { withNavigation } from 'react-navigation'
import { TouchableOpacity } from 'react-native-gesture-handler';

const SearchScreen = ({ navigation }) => {
    const [term, setTerm] = useState('');
    const [location, setLocation] = useState('');
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const searchYelpApi = async (searchTerm, searchLocation = 'Los Angeles') => {
        try {
            const {data} = await yelp.get('/search', {
                //parameters we are going to add/filter our data from Yelp
                params: {
                    limit: 50,
                    term: searchTerm,
                    location: searchLocation
                }
            });
            setResults(data.businesses);
        } catch (err) {
            setErrorMessage('Something went wrong!')
        }
    };

    const filterResultsByPrice = (price) => {
        //filters by the number of dollar signs ($, $$, $$$, $$$$)
        return results.filter(result => {
            return result.price === price;
        })
    };

    const chooseForMeButton = () => {
        const randomIndex = Math.floor(Math.random() * results.length);

        navigation.navigate('ResultsShow', { id: results[randomIndex]['id'] })
    }

    //Call searchYelpApi when component is first rendered
    //useEffect hook that passes a function that we want to run only once, 
    //or depending on if the values in the array change
    useEffect(() => {
        searchYelpApi('mexican', 'Los Angeles')
    }, []);

    return (
        <View style={styles.container}>
            <SearchBar 
                term={term} 
                onTermChange={(newTerm) => setTerm(newTerm)}
                onTermSubmit={() => searchYelpApi(term)}
            />

            <LocationBar 
                location={location} 
                onTermChange={(newLocation) => setLocation(newLocation)}
                onTermSubmit={() => searchYelpApi(term, location)}
            />

            {errorMessage ? <Text>{errorMessage}</Text> : null}

            <ScrollView>
                <ResultsList 
                    results={filterResultsByPrice('$')} 
                    title="Money is Tight - $"
                />
                <ResultsList 
                    results={filterResultsByPrice('$$')} 
                    title="I Can Spend A Little More Today - $$"
                />
                <ResultsList 
                    results={filterResultsByPrice('$$$')} 
                    title="Treat Yoself! - $$$" 
                />
                <ResultsList 
                    results={filterResultsByPrice('$$$$')} 
                    title="I've Got $$$$!" 
                />
            </ScrollView>

            <TouchableOpacity 
                title="Choose For Me - I'm Indecisive"
                type='outline'
                onPress={() => chooseForMeButton()}
                style={styles.chooseButton}
                horizontal={true}
            > 
                <Text style={styles.buttonText}>Choose For Me - I'm Indecisive</Text> 
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    chooseButton: {
        backgroundColor: '#66ccff',
        height: 40,
        borderRadius: 5, 
        marginHorizontal: 50,
        marginTop: 10,
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    }
});

export default SearchScreen;