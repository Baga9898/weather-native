import React, { useState }  from 'react';
import { iconChoser }       from '../../helpers';
import { styles }           from '../../style';
import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity,
}                           from 'react-native';
import { feelsLike, uvi }   from '../../weatherTexts';

const MainScreen = ({ forecast }) => {
    const [clicksCount, setClicksCount] = useState(0);
    const current = forecast.current.weather[0];

    const mainIconPressHandler = () => {
        setClicksCount(clicksCount + 1);
        console.log(clicksCount);
    }

    return (
        <View style={styles.current}>
            <View style={styles.currentWrapper}>
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
        </View>
    )
}

export default MainScreen;
