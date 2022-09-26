import React, {useState, useEffect}   from 'react';
import { LinearGradient }             from 'expo-linear-gradient';
import { loadForecast }               from '../../helpers';
import { StatusBar }                  from 'expo-status-bar';
import { 
    ActivityIndicator,
    ScrollView, 
    RefreshControl, 
    Text,
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
                <Text style={{ color: '#fff', marginTop: 20, fontWeight: '600', }}>ПогодОчка загружается...</Text>
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
            style={{marginTop: 30}}
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
        <StatusBar style='auto'/>
    </LinearGradient>
  )
}

export default Weather;
