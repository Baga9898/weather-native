import React            from 'react';
import { iconChoser }   from '../../helpers';
import { 
    View, 
    Text, 
    Image, 
    FlatList,
}                       from 'react-native';
import { days }         from '../../weatherTexts';
import { styles }       from '../../style';

const Daily = ({ forecast }) => {
    return (
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
    )
}

export default Daily;
