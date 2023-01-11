import {View, StyleSheet, Text, alert, Alert} from 'react-native';
import { useState } from 'react';
import { GlobalStyles } from '../../constants/style';

import Input from './Input';
import Button from '../UI/Button';

function UserForm (props, navigation){
    const [inputValues, setInputValues] = useState(props.defaultValues);

    function inputChangeHandler (inputIdentifier, enteredValue) {
        setInputValues((curInputValues)=>{
            return {
                ...curInputValues,
                [inputIdentifier]:enteredValue
            };
        });
    }

    function submitHandler (){
        const userData = {
            user: inputValues.user,
            password: inputValues.password,
            email: inputValues.email
        };

        props.onSubmit(userData);

    }

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Personal Data</Text>
            <Input 
                label="User Name" 
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(this, 'user'),
                    value: inputValues.user,
                }}
            />
            <Input 
                label="Password"
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(this, 'password'),
                    value: inputValues.password,
                }}
            />
            <Input 
                label="E-mail"
                textInputConfig={{
                    KeyboardType: 'email-address',
                    placeholder: 'user@gmail.com',
                    onChangeText: inputChangeHandler.bind(this, 'email'),
                    value: inputValues.email,
            }}
            />
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={props.onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>Update</Button>
            </View>
        </View>
    );
}

export default UserForm;

const styles=StyleSheet.create({
    form:{
        backgroundColor: GlobalStyles.colors.primary700,
        flex: 1
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'

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
