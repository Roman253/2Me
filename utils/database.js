import { Alert } from "react-native";
import { ref, set } from "firebase/database";
import { database } from '../config/firebaseConfig';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export async function storeFriend(user){
    const [currentUser, setCurrentUser] = useState(null)
  
    useEffect(() => {
        if(user && user.uid){
            const userRef = ref(database, `users/${user.uid || 'XX'}`);
            return onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                setCurrentUser(data);
              });
        }
      
    }, [user]);
    
    
    // const { friend } = useAuthentication();    
    
    // const [friend, setFriend] = useState({}); 

    // const [userIsInvalid, setUserIsInvalid] = useState({
    //     email: false
    // });
    
        
    //       const data = ref(database, 'users/').snapshot.val();
    //       const formattedFriends = Object.keys(data).map(i => ({
    //         id: i, ...data[i]
    //         if(id.user === id) ()
    //             set(ref(database, 'users/'+id.currentUser.toString()+'/friends/'+id.user.toString()), user);
    //          ) {  
    //                   Alert.alert('Invalid input', 'user does not exist');
    //         }

    //         ));

    const [credentialsInvalid, setCredentialsInvalid] = useState({
        email: false,
      });
    function submitHandler(credentials) {
        let { email, } = credentials;
    
        email = email.trim();
        
    
        const emailIsValid = email.includes('@');
        
        if ( !emailIsValid  ) {
          Alert.alert('Invalid input', 'Missing @');
          setCredentialsInvalid({
            email: !emailIsValid,
          });
          return;
        }
        onAuthenticate({ email });
      }
    


    if (user) return 
    
    const id = user.id || uuidv4();

    return id;
}


export async function createUser(user){
    const id = user.id || uuidv4();
    set(ref(database, 'users/'+id.toString()), user);
    return id;
}

export function deleteFriend(id){
    set(ref(database, 'users/'+id.currentUser.toString()+'/friends'+id), null)
}


export async function updateUser(userId, userData){
    const id = userId || uuidv4();
    await set(ref(database, 'users/'+id.toString()), userData);
}

export function deleteUser(id){
    set(ref(database, 'users/' + id), null)
}