import React, {useState, useEffect}   from 'react';
import { LinearGradient }             from 'expo-linear-gradient';
import { loadForecast }               from '../../helpers';
import { StatusBar }                  from 'expo-status-bar';
import { 
    ScrollView, 
    RefreshControl, 
    Text,
    Animated,
    Easing,
    View,
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

    const rotate = () => {
        rotateValue.setValue(0);
        Animated.timing(rotateValue, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => rotate());
    }

    let rotateValue = new Animated.Value(0);

    const RotateData = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    rotate();

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
                <View >
                    <Animated.Image 
                        style={{height: 250, width: 180, transform: [{rotate: RotateData}]}} 
                        source={require('../../../assets/stickers/hat.png')} 
                    />
                    <Text style={{ color: '#fff', marginTop: 20, fontWeight: '600', }}>ПогодОЧКА загружается...</Text>
                </View>
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
