import React, {useState, useEffect}   from 'react';
import { LinearGradient }             from 'expo-linear-gradient';
import { loadForecast }               from '../../helpers';
import { 
    ActivityIndicator, 
    ScrollView, 
    RefreshControl, 
}                                     from 'react-native';
import MainScreen                     from '../mainScreen/mainScreen';
import Hourly                         from '../hourly/hourly';
import Daily                          from '../daily/daily';
import ExtraInfo                      from '../extraInfo/extraInfo';

const Weather = () => {
    const [forecast, setForecast] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadForecast(setRefreshing, setForecast);
    }, []);

    if (!forecast) {
        return (
            <LinearGradient
                colors={['#4681c9', '#364699']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ 
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator size='large' />
            </LinearGradient>
        );
    }

  return (
    <LinearGradient
        colors={['#4681c9', '#364699']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
    >
        <ScrollView 
            style={{marginTop: 50}}
            refreshControl={
                <RefreshControl 
                    refreshing={refreshing} 
                    onRefresh={() => loadForecast(setRefreshing, setForecast)} 
                />
            }
        >
            <MainScreen forecast={forecast}/>
            <Hourly forecast={forecast}/>
            <Daily forecast={forecast}/>
            <ExtraInfo forecast={forecast}/>
        </ScrollView>
    </LinearGradient>
  )
}

export default Weather;
