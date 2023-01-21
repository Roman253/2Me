import {StyleSheet, View, Text, TextInput} from 'react-native';

import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/style';
import Button from '../components/UI/Button';
import { useContext, useEffect, useLayoutEffect } from 'react';
import { FriendsContext } from '../store/friends-context';
import { deleteFriend, getFriends } from '../utils/database';

function ManageFriend({route, navigation}) {
    const friendCtx = useContext(FriendsContext);
   
    const friendId = route.params.friendId;

    useLayoutEffect(() => {
        navigation.setOptions({
            user: 'Add user'
        });     
    }, [navigation]);

    const {user} = route.params;

    async function deleteFriendHandler(){
        await deleteFriend(friendId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }


    return (
        <View style={styles.container}>
            <View>
                <View style={styles.friendContainer}>
                    <Text style={styles.friendName}>{user}</Text>
                </View>
                <Button mode="flat" onPress={cancelHandler}>Cancel</Button>
                    <View style={styles.deleteContainer}>
                        <IconButton 
                            icon="trash"
                            color={GlobalStyles.colors.error500}
                            size={36} 
                            onPress={deleteFriendHandler}
                        />
                    </View>
            </View>
        </View>
    );
}

export default ManageFriend;

const styles =StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },
    friendName:{
        color: GlobalStyles.colors.primary200,
        fontSize:24,
        padding:10
    },
    friendContainer:{
        alignItems: 'center',
        borderBottomColor: GlobalStyles.colors.primary200,
        borderBottomWidth: 2,
        marginBottom: 50,
    }

})