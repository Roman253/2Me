import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { useEffect, useState } from 'react';
import { ref, onValue, set, get, child } from "firebase/database";
import { database } from '../config/firebaseConfig';
import { useAuthentication } from '../utils/hooks/useAuthentication';


function WelcomeScreen() {
  const [currentUser, setCurrentUser] = useState(null)
  const {user} = useAuthentication()

  useEffect(() => {
    if(user && user.uid){
      const userRef = ref(database, `users/${user.uid}`);
      return onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          setCurrentUser(data);
        });
    }
  }, [user]);

  useEffect(() => {
    (() => registerForPushNotificationsAsync())();
  }, [user]);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (token) {
      console.log(token);
      console.log(user);
      set(ref(database, 'users/'+user.uid+'/token'), token)
    }

    return token;
  }

  const sendNotification = async (token) => {
      const message = {
        to: token,
        sound: 'default',
        title: 'Hi call me!',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
      };
    
      const result = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
  };

  const sendNotificationToAllFriends = async () => {
    const friendsRef = ref(database);
    get(child(friendsRef, 'users/'+user.uid.toString()+'/friends/')).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedFriends = Object.keys(data).map(i => ({id: i, ...data[i]}));
        formattedFriends.map((friend) => {
              if(friend.token){
                sendNotification(friend.token)
              }
            });

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.screen}>
        <TouchableOpacity
            onPress={sendNotificationToAllFriends}
            style={styles.roundButton1}>
            <Text>Call</Text>
            <Text>Friend</Text>
        </TouchableOpacity>
       {/* <TouchableOpacity
            onPress={buttonClickedHandler}
            style={styles.roundButton2}>
            <Text>5:00</Text>
        </TouchableOpacity>
      */}
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


