import React, { useState }      from 'react';
import { fadeIn, formatAMPM }   from '../../helpers';
import { styles }               from '../../style';
import { 
    View, 
    Text, 
    FlatList,
    Animated,
}                               from 'react-native';

const Hourly = ({ forecast }) => {
    const opacity = useState(new Animated.Value(0)) [0];

    fadeIn(opacity);

    return (
        <Animated.View style={[{opacity}]}>
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
        </Animated.View>
    )
}

export default Hourly;