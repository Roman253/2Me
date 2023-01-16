import { ref, set, get } from "firebase/database";
import { database } from '../firebaseConfig';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export async function authenticate(mode, email, password){
    const id = uuidv4();
    set(ref(database, 'users/'+id.toString()), 
        user({
            email: email,
            password:password,
            returnSecureToken: true
         }));
    
    const token =  user.data.idToken;
    return token;
}

export async function createUser(email, password){
    return await authenticate('signUp', email, password);
}

export async function login(email,password){
    return await authenticate('signInWithPassword', email, password);
}

export async function getUserToken(userId, userData){
    const id = userId || uuidv4();
    get(ref(database, 'users/'+id.toString()), user);
}

/*
export function deleteFriend(id){
    set(ref(database, 'friends/' + id), null)
}


export function deleteUser(id){
    set(ref(database, 'users/' + id), null)
}*/