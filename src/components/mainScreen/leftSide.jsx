import React                from 'react';
import { iconChoser }       from '../../helpers';
import { styles }           from '../../style';
import { 
    View, 
    Text, 
    Image, 
}                           from 'react-native';
import { feelsLike, uvi }   from '../../weatherTexts';

const LeftSide = ({ forecast }) => {
    return (
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
            <Image
                style={styles.mediumIcon}
                source={iconChoser(forecast.current.weather[0].id, false, true)}
            />
        </View>
    )
}

export default LeftSide;