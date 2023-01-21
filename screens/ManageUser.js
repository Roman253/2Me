import { useContext, useLayoutEffect, useState, useEffect } from 'react';
import {StyleSheet, View, Text, TextInput, KeyboardAvoidingView,  Alert} from 'react-native';
import { ref, onValue, set } from "firebase/database";
import { database } from '../config/firebaseConfig';
import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/style';
import { userContext } from '../store/UserContext';
import UserForm from '../components/ManageFriend/UserForm';
import { updateUser, deleteUser } from '../utils/database';
import {useAuthentication} from '../utils/hooks/useAuthentication';


KeyboardAvoidingView
function ManageUser({ route, navigation}) {
    const { user } = useAuthentication();
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
  

    async function deleteUserHandler(){
        await deleteUser(currentUser.id);
        userCtx.deleteUser(currentUser.id);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(userData) {
        const userIsValid = userData.user.trim().length>0;
        const emailIsValid = userData.email.trim().length>0;
        
        if (!userIsValid || !emailIsValid ) {
            Alert.alert('Invalid input','Please check your input values');
            return; 
        }
        await updateUser(currentUser.id, userData);
        navigation.goBack();
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View
                style={styles.container}
            >
                <UserForm 
                    onCancel={cancelHandler}
                    onSubmit={confirmHandler}
                    defaultValues={currentUser || {}}
                /> 
                <View style={styles.deleteContainer}>
                    <IconButton 
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={36} 
                        onPress={deleteUserHandler}
                    />
                </View>                
            </View>
    </KeyboardAvoidingView> 
    );
}

export default ManageUser;

const styles =StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
//        borderTopWidth: 2,
//        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },
    userName:{
        color: GlobalStyles.colors.primary200,
        fontSize:24,
        padding:10
    },
    userContainer:{
        alignItems: 'center',
//        borderBottomColor: GlobalStyles.colors.primary200,
//        borderBottomWidth: 2,
        marginBottom: 50,
    }

})