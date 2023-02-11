import {View, Text, StyleSheet, Alert} from 'react-native';
import  {useContext, useEffect} from 'react';
import Input from '../components/ManageFriend/Input';

import { GlobalStyles } from '../constants/style';
import { useState } from 'react';
import Button from '../components/UI/Button';
import { FriendsContext } from '../store/friends-context';
import { storeFriend } from '../utils/database';
import { SelectList } from 'react-native-dropdown-select-list';
import { ref, onValue, set, get, child } from "firebase/database";
import { database } from '../config/firebaseConfig';
import { useAuthentication } from '../utils/hooks/useAuthentication';

function AddFriend ({ route, navigation}) {
    
    const {user} = useAuthentication()
    const [friend, setFriend] = useState(null);
    const [users, setUsers] = useState([]);
    const [rawUsers, setRawUsers] = useState([])
    const [usersList, setUsersList] = useState([]);
    const [isFetching,setIsFetching]=useState(true);

    const usersRef = ref(database, 'users/');
    useEffect(() => {
      return onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        setRawUsers(data)
        const formattedUsers= Object.keys(data).map(i => ({key: i, value: {...data[i]}}));
        setUsers(formattedUsers);
        const formattedUsersList= Object.keys(data).map(i => ({key: i, value: data[i].email || data[i].user}));
        setUsersList(formattedUsersList)
        setIsFetching(false);
      });
    }, []);
    
    if(isFetching){
        return (
          <View>
            <Text>Loading...</Text>
          </View>
        )
    }

    function cancelHandler() {
        navigation.goBack();
    }

   
    function inputChangeHandler (inputIdentifier, enteredValue) {
        setInputValues((curInputValues)=>{
            return {
                ...curInputValues,
                [inputIdentifier]:enteredValue
            };
        });
    }

    async function submitHandler (){

            if (!friend ){
                Alert.alert('Friend is empty','Fill friend field');
                return; 
            }
            
            const id = await storeFriend(user, friend);
            //friendCtx.addFriend({user: inputValues.userName, id:id});
            navigation.goBack();
        };

    return (
        <View style={styles.form}>
            {/*<Text style={styles.title}>Add Friend</Text>*/}
            <SelectList 
                setSelected={(val) => {
                    const foundUser = rawUsers[val]
                    if(foundUser){
                        setFriend(foundUser)
                    }
                }}
                data={usersList.filter(u => u.key !== user.uid)} 
                label="Select Friend to Add"
            />
            <View style={styles.buttons} >
                <Button style={styles.button} mode="flat" onPress={cancelHandler}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>Add</Button>
            </View>
        </View>
    );
}

export default AddFriend;

const styles=StyleSheet.create({
    form: {
        // backgroundColor: GlobalStyles.colors.primary700,
        flex: 1
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    buttons: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    }
});
