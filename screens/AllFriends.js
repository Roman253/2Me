import { useState, useEffect } from 'react';
import { ref, onValue, set } from "firebase/database";
import { View, Text } from 'react-native';

import LoadingOverlay from '../components/UI/LoadingOverlay';
import { database } from '../config/firebaseConfig';
import FriendsList from '../components/FriendsOutput/FriendsList';
import { useAuthentication } from '../utils/hooks/useAuthentication';


function AllFriends() {
  const {user} = useAuthentication()
  const [isFetching,setIsFetching]=useState(true);
  const [friends, setFriends] = useState([])

  useEffect(() => {
    if(user && user.uid){
      const friendsRef = ref(database, `users/${user.uid}/friends/`);
      return onValue(friendsRef, (snapshot) => {
        const data = snapshot.val();
        const formattedFriends = Object.keys(data).map(i => ({id: i, ...data[i]}));
        setFriends(formattedFriends);
        setIsFetching(false);
      });
    }
  }, [user]);

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
