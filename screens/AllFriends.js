import { useState, useEffect } from 'react';
import { ref, onValue, set } from "firebase/database";
import { View, Text } from 'react-native';

import LoadingOverlay from '../components/UI/LoadingOverlay';
import { database } from '../config/firebaseConfig';
import FriendsList from '../components/FriendsOutput/FriendsList';


function AllFriends() {
  const [isFetching,setIsFetching]=useState(true);
  
  const friendsRef = ref(database, 'friends/');
  const [friends, setFriends] = useState([])

  useEffect(() => {
    return onValue(friendsRef, (snapshot) => {
      const data = snapshot.val();
      const formattedFriends = Object.keys(data).map(i => ({id: i, ...data[i]}));
      setFriends(formattedFriends);
      setIsFetching(false);
    });
  }, []);

  if(isFetching) {
    return <LoadingOverlay/>
  }

  return (
  <View>    
    <FriendsList friends={friends}/>
  </View>
  );
}

export default AllFriends;
