import { View, Text, Button, StyleSheet } from 'react-native';

function AboutScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text> We believe in.. </Text>
      <Text> Want to imporve.. </Text>
    </View>
  );
}

export default AboutScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#eb1064',
  },
});
