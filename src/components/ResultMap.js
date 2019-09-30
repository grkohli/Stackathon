import React from 'react';
import MapView from 'react-native-maps';
import {Image, ScrollView, StyleSheet, TouchableOpacity, Text, View, Button} from 'react-native'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import openMap from 'react-native-open-maps';


export default class ResultMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      resultName: this.props.resultName,
      locationResult: null,
      errorMessage: null
    }
  }

  componentDidMount() {
    this.getLocationAsync();
  
  }
  handleMapRegionChange(mapRegion) {
    this.setState({
      mapRegion
    });
  }

  openInMaps() {
    if(this.props.resultCoordinates) {
      openMap(this.props.resultCoordinates)
    }
  }

  async getLocationAsync() {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    if(status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied'
      });
    }
    let location = await Location.getCurrentPositionAsync({});

    this.setState({
      mapRegion: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      locationResult: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude, 
      }
    })

  }

  render() {

    return (
        <View style={styles.container}>
          <Button 
            title="Open in Maps"
            type='outline'
            onPress={() => this.openInMaps()}
            style={styles.openInMapsButton}
            horizontal={true}
          />

        <MapView style={styles.map} region={this.state.mapRegion} onRegionChange={this.state.handleMapRegionChange}>
          {
            this.state.locationResult && <MapView.Marker coordinate={this.state.locationResult} title='Me'/> 
          } 
            <MapView.Marker coordinate={this.props.resultCoordinates} title={this.state.resultName}> 
              <Image source={require('../../assets/foodMarker.png')} style={{height: 25, width: 25 }} />
            </MapView.Marker>
        </MapView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5
  },
  map: {
    alignSelf: 'stretch',
    height: 375,
    borderRadius: 5
  },
  openInMapsButton: {
    backgroundColor: '#66ccff',
    height: 40,
    borderRadius: 5, 
    marginHorizontal: 50,
    marginTop: 5,
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
},
buttonText: {
    fontSize: 16
}
});
