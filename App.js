import { StyleSheet, View } from 'react-native';
import Weather from './src/index';

const App = () => {
  return (
    <View style={styles.container}>
      <Weather/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
