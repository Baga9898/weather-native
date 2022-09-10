import React, {useState, useEffect} from 'react';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import { 
    Alert, 
    SafeAreaView, 
    View, 
    Text, 
    StyleSheet, 
    ActivityIndicator, 
    ScrollView, 
    RefreshControl, 
    Image, 
    Dimensions,
    FlatList,
} from 'react-native';

const openWeatherKey = '874d0af8e952eb0b39aa7aa85cefabf8';
let url = `http://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&lang=ru&appid=${openWeatherKey}`;

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
    const feelsLike = 'Ощущается ';

    const formatAMPM = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes.toString().padStart(2, '0');
        let strTime = hours + ' ' + ampm;
        return strTime;
    }
    
    // console.log(formatAMPM(new Date(2022, 1, 1)));

  return (
    <LinearGradient
        colors={['#4681c9', '#364699']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
    >
        <ScrollView 
            refreshControl={
                <RefreshControl 
                refreshing={refreshing} 
                onRefresh={() => loadForecast()} 
                />
            }
            style={{marginTop: 50}}
        >
            <View style={styles.current}>
                <View style={styles.currentLeft}>
                    <Text style={styles.currentTemp}>
                        {Math.round(forecast.current.temp)}°
                    </Text>
                    <Text style={styles.feelsLike}>
                        {feelsLike}
                        {Math.round(forecast.current.feels_like)}°
                    </Text>
                </View>
                <View>
                    <Image
                        style={styles.largeIcon}
                        source={require('../assets/soCold.png')}
                    />
                </View>
            </View>
            {/* <Text style={styles.currentDescription}>
                        {current.description}
                        переменная облачная но не точно облачность
            </Text> */}
            {/* <View style={styles.extraInfo}>
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
            </View> */}
            {/* <View>
                <Text style={styles.subtitle}>Почасовой прогноз</Text>
            </View> */}
            <View style={styles.devider}></View>
            <FlatList
                horizontal
                data={forecast.hourly.slice(0, 24)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(hour) => {
                    const weather = hour.item.weather[0];
                    let date = formatAMPM(new Date(hour.item.dt * 1000));
                    return (
                        <View style={styles.hour}>
                            <Text style={{fontWeight:'bold', color:'#fff'}}>
                                {date}
                            </Text>
                            <Text style={{color: '#fff'}}>
                                {Math.round(hour.item.temp)}°
                            </Text>
                            {/* <Image
                                style={styles.hourlyIcon}
                                source={require('../assets/sunny.png')}
                            /> */}
                            {/* <Text style={{fontWeight: 'bold', color: '#fff'}}>
                                {weather.description}
                            </Text> */}
                        </View>
                    );
                }}
            />
            <View style={styles.devider}></View>
        </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
    },
    current: {
        flexDirection: 'row',  
    },
    currentLeft: {
        paddingTop: 30,
    },
    largeIcon: {
        width: 300,
        height: 250,
    },
    currentTemp: {
        fontSize: 55,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 30,
    },
    currentDescription: {
        width: '100%',
        fontWeight: '400',
        fontSize: 24,
        marginBottom: 5,
        marginLeft: 30,
        color: '#fff',
    },
    feelsLike: {
        color: '#fff',
        marginLeft: 30,
    },
    info: {
        width: Dimensions.get('screen').width/2.5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center',
    },
    extraInfo: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        padding: 10,
    },
    text: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 24,
        marginVertical: 12,
        marginLeft: 7,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 30,
    },
    hour: {
        padding: 6,
        alignItems: 'center',
    },
    hourlyIcon: {
        with: 50,
        height: 50,
    },
    smallIcon: {
        with: 100,
        height: 100,
    },
    devider: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.1)',
        height: 1,
        marginTop: 30,
        marginBottom: 30,
    },
});

export default Weather;
