import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {LinearGradient} from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';


const weatherCases = {
    Rain:{
        colors:['#00C6FB', '#005BEA'],
        title: "It's raining",
        subtitle: "For more information look outside",
        icon: "weather-rainy"
    },
    Clear:{
        colors:['#FEF253', '#FF7300'],
        title: "It's a sunny day",
        subtitle: "For more information look outside",
        icon: "weather-sunny"
    },
    Thunderstorm:{
        colors:['#00ECBC', '#007ADF'],
        title: "It's a thunderstorm", 
        subtitle: "For more information look outside",
        icon: "weather-lighting"
    },
    Clouds:{
        colors:['#D7D2CC', '#304352'],
        title: "It's a cloudy",
        subtitle: "For more information look outside",
        icon: "weather-cloudy"
    },
    Snow:{
        colors:['#7DE2FC', '#B9B6E5'],
        title: "It's a cold day",
        subtitle: "Do you want to build a snowman?",
        icon: "weather-snowy"
    },
    Drizzle:{
        colors:['#89F7FE', '#66A6FF'],
        title: "It's drizzling",
        subtitle: "For more information look outside",
        icon: "weather-hail"
    },
    Haze:{
        colors:['#7DF7FE', '#66A6FF'],
        title: "It's a haze",
        subtitle: "For more information look outside",
        icon: "weather-fog"
    },
    Mist:{
        colors:['#D7D2CC', '#304352'],
        title: "It's a Mist",
        subtitle: "For more information look outside",
        icon: "weather-fog"
    }
}

function Weather({weatherName, temp} ){
    return( 
        <LinearGradient colors={weatherCases[weatherName].colors} style={styles.container}>
            <View style={styles.upper}>
                <MaterialCommunityIcons color='white' size={144} name={weatherCases[weatherName].icon} />
                <Text style={styles.temp}> {temp}º </Text>
            </View>

            <View style={styles.lower}>
                <Text style={styles.title}>{weatherCases[weatherName].title}</Text>
                <Text style={styles.subtitle}>{weatherCases[weatherName].subtitle}</Text>
            </View>
        </LinearGradient>
    );
}

Weather.propTypes = {
    temp: PropTypes.number.isRequired
};

export default Weather;


const styles = StyleSheet.create({
    container:{
        flex:1
    },
    upper:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    temp:{
        fontSize: 38,
        color:'white',
        marginTop: 10

    },
    lower:{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: 25
    },
    title:{
        fontSize: 38,
        color:'white',
        marginBottom: 10,
        fontWeight: '300'
    },
    subtitle:{
        fontSize: 24,
        color:'white',
        marginBottom: 42 
    }
});