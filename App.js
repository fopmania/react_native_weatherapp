import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Location, Permissions } from 'expo'

import Weather from './Weather';



const API_KEY = 'd34d2b3258cd87bd346542c60329a7e8'

export default class App extends React.Component {
  state = {
    isLoaded: false,
    error:null,
    temperature:null,
    name:null
  };

  componentDidMount(){
    console.log("componentDidMount start");
    this._getLocationAsync();
//     navigator.geolocation.getCurrentPosition( 
//       (position) =>{
// //        this.setState({        });
//           console.log("position");

//         this._getWeather(position.coords.latitude, position.coords.longitude);
//       }, (error) =>{
//         console.log(error.message);
//         this.setState({
//           isLoaded: false,
//           error: error.message
//         }, 
//         {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000});
//       }   
//    );
   console.log("componentDidMount- end");

  }

  _getLocationAsync = async () => {
    console.log("_getLocationAsync");
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log(status);
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      // this.setState({
      //   locationResult: 'Permission to access location was denied',
      // });
    }
    console.log("_getLocationAsync 2");
 
    let location = await Location.getCurrentPositionAsync({});

//    {"mocked":false, "timestamp":1534821223000,
//      "coords":{ "speed":0,"heading":0,"accuracy":20,"longitude":-122.084,"altitude":0,"latitude":37.4219983 }
      // }

    this._getWeather(location.coords.latitude, location.coords.longitude);

    console.log(location);

  };
 
  _getWeather = (lat, lon) => {
    console.log("_getWeather");
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}`)
    .then(response => response.json())
    .then(json => {
      this.setState({
        temperature: Math.floor(json.main.temp - 273.15),
        name: json.weather[0].main,
        isLoaded: true
      })
      console.log(json);
      console.log(this.state.temperature + ", " + this.state.name);
    });
  }

  render() {
    const { isLoaded, error, temperature, name } = this.state
    return (
      <View style={styles.container}>
      <StatusBar hidden={true}/>
      { 
        isLoaded ? ( <Weather 
          weatherName = {name} 
          temp={temperature} /> ) : 
        (
          <View style={styles.loading}>
             <Text style={styles.loadingText}>Getting the weather </Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        )
      }
      </View>
    );
  }
   
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  errorText:{
    color:'red',
    marginBottom:40
  },

  loading:{
    flex: 1,
    backgroundColor:'#FDF6AA',
    justifyContent:'flex-end',
    paddingLeft: 25
  },
  loadingText:{
    fontSize: 38,
    marginBottom: 24
  }
});
 