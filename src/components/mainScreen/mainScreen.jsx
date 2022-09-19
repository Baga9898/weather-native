import React       from 'react';
import { styles }  from '../../style';
import { 
    View, 
    Text, 
}                  from 'react-native';
import LeftSide    from './leftSide';
import RightSide   from './rightSide';

const MainScreen = ({ forecast }) => {
    return (
        <View style={styles.current}>
            <View style={styles.currentWrapper}>
                <LeftSide forecast={forecast}/>
                <RightSide forecast={forecast}/>
            </View>
            <Text style={styles.currentDescription}>
                {forecast.current.weather[0].description}
            </Text>
        </View>
    )
}

export default MainScreen;
