import {View, StyleSheet} from 'react-native';
import { GlobalStyles } from '../../constants/style';

import FriendsList from "./FriendsList";


function FriendsOutput ({friends}){
    return (
        <View>
            <FriendsList friends={friends}/>
        </View>
    );
}

export default FriendsOutput;

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom:0,
        backgroundColor: GlobalStyles.colors.primary700
    }
});