import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';

import CountDown from 'react-native-countdown-component';

function WelcomeScreen() {

  const buttonClickedHandler = () => {
    console.log('You have been clicked a button!');
    // do something
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.screen}>
        <TouchableOpacity
            onPress={buttonClickedHandler}
            style={styles.roundButton1}>
            <Text>Call</Text>
            <Text>Friend</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={buttonClickedHandler}
            style={styles.roundButton2}>
            <Text>5:00</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#eb1064',
  },  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundButton1: {
    padding: 50,
    marginTop: 20,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#ccc',
  },
  roundButton2: {
    marginTop: 150,
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 37,
    backgroundColor: '#be7b1c',
  },
});


