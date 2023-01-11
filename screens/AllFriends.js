import { useState, useContext, useEffect } from 'react';
import { ref, onValue, set } from "firebase/database";
import { Text, View } from 'react-native';
import FriendsOutput from '../components/FriendsOutput/FriendsOutput';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { database } from '../firebaseConfig';


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
    <FriendsOutput friends={friends}/>
  </View>
  );
}

export default AllFriends;
