import React            from 'react';
import { iconChoser }   from '../../helpers';
import { styles }       from '../../style';
import { 
    View, 
    Image, 
    TouchableOpacity,
}                       from 'react-native';

const RightSide = () => {
    const [clicksCount, setClicksCount] = useState(0);
    
    const mainIconPressHandler = () => {
        setClicksCount(clicksCount + 1);
        if(clicksCount === 100) {
            console.log('Yep!');
        }
    }

    return (
        <View style={styles.currentRight}>
            <TouchableOpacity onPress={mainIconPressHandler}>
                <Image
                    style={styles.largeIcon}
                    source={iconChoser(forecast.current.weather[0].id, true)}
                />
            </TouchableOpacity>
        </View>
    )
}

export default RightSide;