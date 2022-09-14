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
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { 
    feelsLike,
    humidity,
    windSpeed,
    uvi,
    days,
    dewPoint,
    pressure,
    sunrise,
    sunset,
} from './weatherTexts';
import { iconChoser } from './helpers';
import { url } from './constants';

const Weather = () => {
    const [forecast, setForecast] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [clicksCount, setClicksCount] = useState(0);

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

    const formatAMPM = (date, withMinutes) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes.toString().padStart(2, '0');
        let strTime = withMinutes ? `${hours}:${minutes} ${ampm}` : `${hours} ${ampm}`;
        return strTime;
    }

    const mainIconPressHandler = () => {
        setClicksCount(clicksCount + 1);
        console.log(clicksCount);
    }

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
                    <Text style={styles.uvi}>
                        {uvi}
                        {forecast.current.uvi}
                    </Text>
                </View>
                <View style={styles.currentRight}>
                    <TouchableOpacity onPress={mainIconPressHandler}>
                        <Image
                            style={styles.largeIcon}
                            source={iconChoser(forecast.current.weather[0].id, true)}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.currentDescription}>
                {current.description}
            </Text>
            <View style={styles.devider}></View>
            <FlatList
                horizontal
                data={forecast.hourly.slice(0, 24)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(hour) => {
                    const date = formatAMPM(new Date(hour.item.dt * 1000));
                    return (
                        <View style={styles.hour}>
                            <Text style={styles.hourlyTime}>
                                {date}
                            </Text>
                            <Text style={styles.hourlyTemp}>
                                {Math.round(hour.item.temp)}°
                            </Text>
                        </View>
                    );
                }}
            />
            <View style={styles.devider}></View>
            <FlatList
                style={styles.daily}
                data={forecast.daily.slice(0, 7)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(dayView, index) => {
                    const date = new Date(dayView.item.dt * 1000);
                    const currentDay = date.getDay();
                    const chosenDay = days[currentDay];
                    return (
                        <View style={styles.dailyRow}>
                            <Text style={styles.dailyDay}>
                                {chosenDay}
                            </Text>
                            <Image
                                style={styles.smallIcon}
                                source={iconChoser(dayView.item.weather[0].id)}
                            />
                            <View style={styles.dayNNight}>
                                <Text style={styles.dailyTempDay}>
                                    {Math.round(dayView.item.temp.day)}
                                </Text>
                                <Text style={styles.dailyTempNight}>
                                    {Math.round(dayView.item.temp.night)}
                                </Text>
                            </View>
                        </View>
                    );
                }}
            />
            <View style={styles.extraInfo}>
                <View style={styles.extraItem}>
                    <Text style={styles.extraTitle}>
                        {humidity}
                    </Text>
                    <Text style={styles.extraValue}>
                        {forecast.current.humidity}%
                    </Text>
                </View>
                <View style={styles.extraItem}>
                    <Text style={styles.extraTitle}>
                        {windSpeed}
                    </Text>
                    <Text style={styles.extraValue}>
                        {forecast.current.wind_speed} km/h
                    </Text>
                </View>
                <View style={styles.extraItem}>
                    <Text style={styles.extraTitle}>
                        {dewPoint}
                    </Text>
                    <Text style={styles.extraValue}>
                        {forecast.current.dew_point}°
                    </Text>
                </View>
                <View style={styles.extraItem}>
                    <Text style={styles.extraTitle}>
                        {pressure}
                    </Text>
                    <Text style={styles.extraValue}>
                        {forecast.current.pressure} hPa
                    </Text>
                </View>
                <View style={styles.extraItem}>
                    <Text style={styles.extraTitle}>
                        {sunrise}
                    </Text>
                    <Text style={styles.extraValue}>
                        {formatAMPM(new Date(forecast.current.sunrise * 1000), true)}
                    </Text>
                </View>
                <View style={styles.extraItem}>
                    <Text style={styles.extraTitle}>
                        {sunset}
                    </Text>
                    <Text style={styles.extraValue}>
                        {formatAMPM(new Date(forecast.current.sunset * 1000), true)}
                    </Text>
                </View>
            </View>
        </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
    },
    current: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 20,
    },
    currentLeft: {
        paddingTop: 30,
    },
    currentRight: {
        marginRight: 10,
    },
    largeIcon: {
        width: 170,
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
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 30,
        color: '#fff',
        marginBottom: 20,
    },
    feelsLike: {
        color: '#fff',
        marginLeft: 30,
    },
    uvi: {
        color: '#fff',
        marginLeft: 30,
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
        marginHorizontal: 15,
        marginVertical: 30,
    },
    hourlyTime: {
        color: 'rgba(255,255,255,0.5)',
        fontWeight: '200',
        marginBottom: 10,
    },
    hourlyTemp: {
        fontSize: 20,
        fontWeight: '400',
        color: '#fff',
    },
    smallIcon: {
        with: 24,
        height: 24,
    },
    devider: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.1)',
        height: 1,
    },
    daily: {
        paddingVertical: 20,
        marginTop: 10,
    },
    dailyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        marginBottom: 15,
    },
    dailyDay: {
        color: '#fff',
        width: 100,
    },
    dayNNight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 50,
    },
    dailyTempDay: {
        color: '#fff',

    },
    dailyTempNight: {
        color: 'rgba(255,255,255,0.5)',
    },
    extraInfo: {
        width: '100%',
        backgroundColor: 'rgba(150,150,150,0.1)',
        paddingVertical: 30,
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    extraItem: {
        marginBottom: 20,
        width: '50%',
    },
    extraTitle: {
        color: 'rgba(255,255,255,0.5)',
        marginBottom: 10,
    },
    extraValue: {
        color: '#fff',
        fontSize: 20,
    },
});

export default Weather;
