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
}                                                 from 'react-native';
import { 
    feelsLike,
    uvi,
}                                                 from '../../weatherTexts';
import ExtraInfo from '../extraInfo/extraInfo';
import Daily from '../daily/daily';

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
            
            <Daily forecast={forecast}/>
            <ExtraInfo forecast={forecast}/>
            
        </ScrollView>
    </LinearGradient>
  )
}

export default Weather;
