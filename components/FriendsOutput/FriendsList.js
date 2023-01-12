import { SafeAreaView,StyleSheet, View, FlatList, Text, Pressable } from "react-native";
import FriendItem from "./FriendItem";
import { GlobalStyles } from "../../constants/style";

import { FriendsContext } from '../../store/friends-context';

import { useContext, useLayoutEffect } from 'react';

import addFriend from '../../screens/AddFriend';
import { useNavigation } from "@react-navigation/native";

function renderFriendItem (itemData){
    return <FriendItem {...itemData.item}/>;
}

function FriendsList ({ friends, route, navigation }) {
    const friendCtx = useContext(FriendsContext);

    const navigations = useNavigation();

    function FriendsPressHandler(){
        navigations.navigate('AddFriend', { });
    }
    const ListFooter = () => {
        return (
                <Pressable
                    onPress={FriendsPressHandler}
                    style={({pressed}) => pressed && styles.pressed}
                >
                    <View style={styles.friendItem}>
                        <View>
                            <Text style={styles.user}>+Add Friend</Text>
                        </View>
                    </View>
                </Pressable>
        );
    }

    return (
        <SafeAreaView>
        <FlatList 
            data={friends} 
            renderItem={renderFriendItem} 
            keyExtractor={(item)=>item.id}
            ListFooterComponent={ListFooter}
        />
        </SafeAreaView>
    );
}

export default FriendsList;


const styles=StyleSheet.create({
pressed:{
    opacity: 0.75
},
friendItem:{
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 25,
    backgroundColor: GlobalStyles.colors.primary500,
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
},
user: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary50,
    textAlign: "center",
},   
});