import React            from 'react';
import { formatAMPM }   from '../../helpers';
import { View }         from 'react-native';
import { 
    humidity,
    windSpeed,
    dewPoint,
    pressure,
    sunrise,
    sunset,
}                       from '../../weatherTexts';
import ExtraItem        from '../extraItem/extraItem';
import { styles }       from '../../style';

const ExtraInfo = ({ forecast }) => {
  return (
    <View style={styles.extraInfo}>
        <ExtraItem title={humidity} value={forecast.current.humidity} valueMetric={' %'}/>
        <ExtraItem title={windSpeed} value={forecast.current.wind_speed} valueMetric={' km/h'}/>
        <ExtraItem title={dewPoint} value={forecast.current.dew_point} valueMetric={'°'}/>
        <ExtraItem title={pressure} value={forecast.current.pressure} valueMetric={' hPa'}/>
        <ExtraItem title={sunrise} value={formatAMPM(new Date(forecast.current.sunrise * 1000), true)} valueMetric={''}/>
        <ExtraItem title={sunset} value={formatAMPM(new Date(forecast.current.sunset * 1000), true)} valueMetric={''}/>
    </View>
  )
}

export default ExtraInfo;