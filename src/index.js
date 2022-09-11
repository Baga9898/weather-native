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
    TouchableOpacity,
} from 'react-native';

const openWeatherKey = '874d0af8e952eb0b39aa7aa85cefabf8';
let url = `http://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&lang=ru&appid=${openWeatherKey}`;

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
    const feelsLike = 'Ощущается ';
    const humidity = 'Влажность ';

    const days = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
    ];

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
                    {/* <Text style={styles.feelsLike}>
                        {humidity}
                        {forecast.current.humidity}%
                    </Text> */}
                </View>
                <View style={styles.currentRight}>
                    <TouchableOpacity onPress={mainIconPressHandler}>
                        <Image
                            style={styles.largeIcon}
                            source={require('../assets/soCold.png')}
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
                renderItem={(dayView) => {
                    // const day = new Date(dayView.item.dt);
                    // const currentDay = day.getDay();
                    // const chosentDay = days[currentDay];
                    // console.log(chosentDay);
                    return (
                        <View style={styles.dailyRow}>
                            <Text style={styles.dailyDay}>
                                Day
                            </Text>
                            <Text>
                                i
                            </Text>
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
        with: 100,
        height: 100,
    },
    devider: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.1)',
        height: 1,
    },
    daily: {
        paddingVertical: 20,
    },
    dailyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        marginBottom: 10,
    },
    dailyDay: {
        color: '#fff',
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
});

export default Weather;
