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
import LeftSide from './leftSide';

const MainScreen = ({ forecast }) => {
    const [clicksCount, setClicksCount] = useState(0);
    const current = forecast.current.weather[0];

    const mainIconPressHandler = () => {
        setClicksCount(clicksCount + 1);
        if(clicksCount === 100) {
            console.log('Yep!');
        }
    }

    return (
        <View style={styles.current}>
            <View style={styles.currentWrapper}>
                <LeftSide forecast={forecast}/>

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
