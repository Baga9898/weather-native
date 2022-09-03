import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';



const App = () => {
  return (
    <View style={styles.container}>
      <Text>Hey!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
