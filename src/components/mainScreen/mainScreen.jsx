import React, { useState }   from 'react';
import { fadeIn }            from '../../helpers';
import { styles }            from '../../style';
import { 
    View, 
    Text, 
    Animated, 
}                            from 'react-native';
import LeftSide              from './leftSide';
import RightSide             from './rightSide';

const MainScreen = ({ forecast }) => {
    const opacity = useState(new Animated.Value(0)) [0];

    fadeIn(opacity);

    return (
        <Animated.View style={[{opacity}]}>
            <View style={styles.currentWrapper}>
                <LeftSide forecast={forecast}/>
                <RightSide forecast={forecast}/>
            </View>
            <Text style={styles.currentDescription}>
                {forecast.current.weather[0].description}
            </Text>
        </Animated.View>
    )
}

export default MainScreen;
