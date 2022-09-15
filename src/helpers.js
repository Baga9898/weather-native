import { noLocationInfo, tryGrantAccess, errorTitle, someWentWrong } from './weatherTexts';
import { Alert }                                                     from 'react-native';
import { url }                                                       from './constants';
import * as Location                                                 from 'expo-location';

export const loadForecast = async (setRefreshing, setForecast) => {
    setRefreshing(true);
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
        Alert.alert(noLocationInfo, tryGrantAccess);
    }

    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    response = await fetch(`${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
    const data = await response.json();

    if (!response.ok) {
        Alert.alert(errorTitle, someWentWrong);
    } else {
        setForecast(data);
    }

    setRefreshing(false);
}

export const formatAMPM = (date, withMinutes) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes.toString().padStart(2, '0');
    let strTime = withMinutes ? `${hours}:${minutes} ${ampm}` : `${hours} ${ampm}`;
    return strTime;
}

export const iconChoser = (weatherId, isMainIcon) => {
    switch(weatherId) {
        case 200:
        case 201:
        case 202:
        case 210:
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
            return isMainIcon ? require('../assets/stickers/soCold.png') : require('../assets/weatherIcons/ThunderStorm/thunderStorm.png');
        case 300:
        case 301:
        case 302:
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
            return isMainIcon ? require('../assets/stickers/soCold.png') : require('../assets/weatherIcons/Drizzle/drizzle.png');
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
        case 511:
        case 520:
        case 521:
        case 522:
        case 531:
            return isMainIcon ? require('../assets/stickers/soCold.png') : require('../assets/weatherIcons/Rain/rain.png');
        case 600:
        case 601:
        case 602:
        case 611:
        case 612:
        case 613:
        case 615:
        case 616:
        case 620:
        case 621:
        case 622:
            return isMainIcon ? require('../assets/stickers/soCold.png') : require('../assets/weatherIcons/Snow/snow.png');
        case 701:
        case 711:
        case 721:
        case 731:
        case 741:
        case 751:
        case 761:
        case 762:
        case 771:
        case 781:
            return isMainIcon ? require('../assets/stickers/soCold.png') : require('../assets/weatherIcons/Atmosphere/nebula.png');
        case 800:
            return isMainIcon ? require('../assets/stickers/soCold.png') : require('../assets/weatherIcons/Clear/sunny.png');
        case 801:
            return isMainIcon ? require('../assets/stickers/soCold.png') : require('../assets/weatherIcons/Clouds/fewClouds.png');
        case 802:
            return isMainIcon ? require('../assets/stickers/soCold.png') : require('../assets/weatherIcons/Clouds/scaterredClouds.png');
        case 803:
        case 804:
            return isMainIcon ? require('../assets/stickers/soCold.png') : require('../assets/weatherIcons/Clouds/brokenClouds.png');
    }
};
