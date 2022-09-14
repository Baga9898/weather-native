import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
    },
    current: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 20,
    },
    currentLeft: {
        paddingTop: 30,
    },
    currentRight: {
        marginRight: 10,
    },
    largeIcon: {
        width: 170,
        height: 250,
    },
    currentTemp: {
        fontSize: 55,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 30,
    },
    currentDescription: {
        width: '100%',
        fontWeight: '400',
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 30,
        color: '#fff',
        marginBottom: 20,
    },
    feelsLike: {
        color: '#fff',
        marginLeft: 30,
    },
    uvi: {
        color: '#fff',
        marginLeft: 30,
    },
    text: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 24,
        marginVertical: 12,
        marginLeft: 7,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 30,
    },
    hour: {
        padding: 6,
        alignItems: 'center',
        marginHorizontal: 15,
        marginVertical: 30,
    },
    hourlyTime: {
        color: 'rgba(255,255,255,0.5)',
        fontWeight: '200',
        marginBottom: 10,
    },
    hourlyTemp: {
        fontSize: 20,
        fontWeight: '400',
        color: '#fff',
    },
    smallIcon: {
        with: 24,
        height: 24,
    },
    devider: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.1)',
        height: 1,
    },
    daily: {
        paddingVertical: 20,
        marginTop: 10,
    },
    dailyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        marginBottom: 15,
    },
    dailyDay: {
        color: '#fff',
        width: 100,
    },
    dayNNight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 50,
    },
    dailyTempDay: {
        color: '#fff',

    },
    dailyTempNight: {
        color: 'rgba(255,255,255,0.5)',
    },
    extraInfo: {
        width: '100%',
        backgroundColor: 'rgba(150,150,150,0.1)',
        paddingVertical: 30,
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    extraItem: {
        marginBottom: 20,
        width: '50%',
    },
    extraTitle: {
        color: 'rgba(255,255,255,0.5)',
        marginBottom: 10,
    },
    extraValue: {
        color: '#fff',
        fontSize: 20,
    },
});
