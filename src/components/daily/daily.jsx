import React, { useState }      from 'react';
import { fadeIn, iconChoser }   from '../../helpers';
import { 
    View, 
    Text, 
    Image, 
    FlatList,
    Animated,
}                       from 'react-native';
import { days }         from '../../weatherTexts';
import { styles }       from '../../style';

const Daily = ({ forecast }) => {
    const opacity = useState(new Animated.Value(0)) [0];

    fadeIn(opacity);

    return (
        <Animated.View style={[{opacity}]}>
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
        </Animated.View>
    )
}

export default Daily;
