import {Pressable, View, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { GlobalStyles } from '../../constants/style';


function IconButton ({icon, size, color, onPress}){
    return (
        <Pressable 
            onPress={onPress}
            style={({pressed}) => pressed && styles.pressed}
        >
            <View style={styles.button}>
                <Ionicons name={icon} size={size} color={color} />
            </View>
        </Pressable>
    );
}

export default IconButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary500
    },
    flat: {
        backgroundColor: 'transparent'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    flatText: {
        color: GlobalStyles.colors.primary200,
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 4
    }
});