import React, {useState, useEffect}               from 'react';
import { LinearGradient }                         from 'expo-linear-gradient';
import { iconChoser, formatAMPM, loadForecast }   from '../../helpers';
import { styles }                                 from '../../style';
import { 
    SafeAreaView, 
    View, 
    Text, 
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
} from '../../weatherTexts';

const Weather = () => {
    const [forecast, setForecast] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [clicksCount, setClicksCount] = useState(0);

    useEffect(() => {
        loadForecast(setRefreshing, setForecast);
    }, []);

    if (!forecast) {
        return (
            <SafeAreaView>
                <ActivityIndicator size='large' />
            </SafeAreaView>
        );
    }

    const current = forecast.current.weather[0];

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
                onRefresh={() => loadForecast(setRefreshing, setForecast)} 
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

export default Weather;
