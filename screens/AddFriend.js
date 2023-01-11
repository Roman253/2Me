import {View, Text, StyleSheet, Alert} from 'react-native';
import  {useContext} from 'react';
import Input from '../components/ManageFriend/Input';

import { GlobalStyles } from '../constants/style';
import { useState } from 'react';
import Button from '../components/UI/Button';
import { FriendsContext } from '../store/friends-context';
import { storeFriend } from '../util/database';

  
    function confirmHandler (){
      //  navigation.goBack();
    
    }

function AddFriend ({ route, navigation}) {
    const [inputValues, setInputValues] = useState({
        userName: '',
        id: ''
    });

    const friendCtx = useContext(FriendsContext);

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
            const userIsValid = inputValues.userName.trim().length>0;

            if (!userIsValid ){
                Alert.alert('User is empty','Fill user field');
                return; 
            }
            
            const id = await storeFriend({user: inputValues.userName});
            friendCtx.addFriend({user: inputValues.userName, id:id});
            navigation.goBack();
        };

    return (
        <View style={styles.form}>
            {/*<Text style={styles.title}>Add Friend</Text>*/}
            <Input 
                label="User Name"
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(this, 'userName'),
                    value: inputValues.userName,
                }}
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
        backgroundColor: GlobalStyles.colors.primary700,
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
