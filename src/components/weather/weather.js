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
import Hourly from '../hourly/hourly';

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




            <Hourly forecast={forecast}/>
            <Daily forecast={forecast}/>
            <ExtraInfo forecast={forecast}/>
            
        </ScrollView>
    </LinearGradient>
  )
}

export default Weather;
