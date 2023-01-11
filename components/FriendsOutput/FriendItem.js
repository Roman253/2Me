import { Pressable, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../../constants/style";
 
function FriendItem ({id, user, email, password}){
    const navigation = useNavigation();

    function friendPressHandler(){
        navigation.navigate('ManageFriend', {
            user,
            friendId: id
        });
    }

    return (
        <Pressable  
            onPress={friendPressHandler}
            style={({pressed}) => pressed && styles.pressed}
        >
            <View style={styles.friendItem}>
                <View>
                    <Text style={styles.user}>{user}</Text>
                </View>
            </View>
        </Pressable>
    );
}

export default FriendItem;

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