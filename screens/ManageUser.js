import { useContext, useLayoutEffect } from 'react';
import {StyleSheet, View, Text, TextInput, KeyboardAvoidingView,  Alert} from 'react-native';

import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/style';

import { userContext } from '../store/UserContext';
import UserForm from '../components/ManageFriend/UserForm';
import { updateUser, deleteUser } from '../util/database';

KeyboardAvoidingView
function ManageUser({ route, navigation}) {
    const userCtx = useContext(userContext);

    const user = userCtx.userData; 

    async function deleteUserHandler(){
        await deleteUser(user.id);
        userCtx.deleteUser(user.id);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(userData) {
        const userIsValid = userData.user.trim().length>0;
        const emailIsValid = userData.email.trim().length>0;
        const passwordIsValid = userData.password.trim().length>0;
        
        if (!userIsValid || !emailIsValid || !passwordIsValid ) {
            Alert.alert('Invalid input','Please check your input values');
            return; 
        }
        userCtx.updateUser(user.id, userData);
        await updateUser(user.id, userData);
        navigation.goBack();
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <UserForm 
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                defaultValues={userCtx.userData}
            /> 
            <View>
                {/*<View style={styles.userContainer}>
                    <Text style={styles.userName}>{user.name}</Text>
                </View>*/}
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