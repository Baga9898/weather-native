import React            from 'react';
import { View, Text }   from 'react-native';
import { styles }       from '../../style';

const ExtraItem = ({ title, value, valueMetric }) => {
  return (
    <View style={styles.extraItem}>
        <Text style={styles.extraTitle}>
            {title}
        </Text>
        <Text style={styles.extraValue}>
            {value}{valueMetric}
        </Text>
    </View>
  )
}

export default ExtraItem;
