import React from 'react';

const MainScreen = () => {
  return (
    <View style={styles.current}>
    <View>
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