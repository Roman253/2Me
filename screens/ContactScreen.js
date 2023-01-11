import { View, Text, Button, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

function ContactScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text>Your question: </Text>
      <TextInput style={styles.highlight}/>
      <Button title='send'></Button>
    </View>
  );
}

export default ContactScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  highlight: {
    fontWeight: 'bold',
    backgroundColor: '#ccc',
    height: 40,
    margin: 12,
    borderWidth: 1,
    paddingHorizontal: 100,
    },
});
