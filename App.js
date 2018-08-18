import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

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
    navigator.geolocation.getCurrentPosition( 
      (position) =>{
        this.setState({
        });
        this._getWeather(position.coords.latitude, position.coords.longitude);
      }, (error) =>{
        this.setState({
          isLoaded: false,
          error: error.message
        });
      }   
   );

  }

  _getWeather = (lat, lon) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}`)
    .then(response => response.json())
    .then(json => {
      this.setState({
        temperature: Math.floor(json.main.temp - 273.15),
        name: json.weather[0].main,
        isLoaded: true
      })
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
 