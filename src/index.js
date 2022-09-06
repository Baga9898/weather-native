import React, {useState, useEffect} from 'react';
import * as Location from 'expo-location';
import { Alert, SafeAreaView, View, Text, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, Image, Dimensions } from 'react-native';

const openWeatherKey = '874d0af8e952eb0b39aa7aa85cefabf8';
let url = `http://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${openWeatherKey}`;

const Weather = () => {
    const [forecast, setForecast] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const loadForecast = async () => {
        setRefreshing(true);

        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Невозможно получить значение текущей локации', 'Попробуйте предоставить приложению доступ к геолокации');
        }

        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

        response = await fetch(`${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
        const data = await response.json();

        if (!response.ok) {
            Alert.alert('Ошибка', 'Что - то пошло не так');
        } else {
            setForecast(data);
        }

        setRefreshing(false);
    }

    useEffect(() => {
        loadForecast();
    }, []);

    if (!forecast) {
        return (
            <SafeAreaView>
                <ActivityIndicator size='large' />
            </SafeAreaView>
        );
    }

    const current = forecast.current.weather[0];

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView 
            refreshControl={
                <RefreshControl 
                refreshing={refreshing} 
                onRefresh={() => loadForecast()} 
                />
            }
            style={{marginTop: 50}}
        >
            <Text style={styles.title}>
                Current Weather
            </Text>
            <Text style={{alignItems: 'center', textAlign: 'center'}}>
                Your Location
            </Text>
            <View style={styles.current}>
                <Image
                    style={styles.largeIcon}
                    source={{
                        uri: `http://openweathermap.org/img/wn/${current.icon}@4x.png`,
                    }}
                />
                <Text style={styles.currentTemp}>
                    {Math.round(forecast.current.temp)}℃
                </Text>
            </View>

            <Text style={styles.currentDescription}>
                {current.description}
            </Text>

            <View style={styles.extraInfo}>
                <View style={styles.info}>
                    <Image
                        source={require('../assets/temp.png')}
                        style={{width: 40, height: 40, borderRadius: 40/2, marginLeft: 50}}
                    />
                    <Text style={styles.text}>
                        {forecast.current.feels_like}℃
                    </Text>
                    <Text style={styles.text}>
                        Feells like
                    </Text>
                </View>
                <View style={styles.info}>
                    <Image
                        source={require('../assets/humidity.png')}
                        style={{width: 40, height: 40, borderRadius: 40/2, marginLeft: 50}}
                    />
                    <Text style={styles.text}>
                        {forecast.current.humidity}%
                    </Text>
                    <Text style={styles.text}>
                        Humidity
                    </Text>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecdbba',
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        color: '#c84b31',
    },
    current: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    largeIcon: {
        width: 300,
        height: 250,
    },
    currentTemp: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    currentDescription: {
        width: '100%',
        textAlign: 'center',
        fontWeight: '200',
        fontSize: 24,
        marginBottom: 5,
    },
    info: {
        width: ,
    },
});

export default Weather;
