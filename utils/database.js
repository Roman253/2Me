import { Alert } from "react-native";
import { ref, set } from "firebase/database";
import { database } from '../config/firebaseConfig';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export async function storeFriend(user, friend){
    await set(ref(database, 'users/'+user.uid+'/friends/'+friend.id), friend);
}


export async function createUser(user){
    const id = user.id || uuidv4();
    set(ref(database, 'users/'+id.toString()), user);
    return id;
}

export function deleteFriend(id){
    set(ref(database, 'users/'+id.currentUser.toString()+'/friends'+id), null)
}


export async function updateUser(userId, userData){
    const id = userId || uuidv4();
    await set(ref(database, 'users/'+id.toString()), userData);
}

export function deleteUser(id){
    set(ref(database, 'users/' + id), null)
}