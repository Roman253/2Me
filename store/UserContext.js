import { createContext, useReducer } from "react";

const DUMMY_USER = 
    {
        id:'e11',
        user: 'Roman',
        email: 'Roman@gmail.com',
        password: 'qwe'
    }


export const userContext = createContext({
    userData: '',
    deleteUser: (id) => {},
    updateUser: (id, {user, email, password}) => {}
});

function MeReducer(state,action){
    switch(action.type) {
        //case 'ADD': 
        //const id = new Date().toString() + Math.random().toString();
        //return [{ ...action.payload, id:id }, ...state];
        case'UPDATE': 
            return action.payload.data;
        case 'DELETE':
            return state.filter((user) => user.id !==action.payload);
        default:
            return state;
    } 
}

function UserContextProvider({children}) {
    const [MeState, dispatch]= useReducer(MeReducer, DUMMY_USER ); 

   // function addFriend(friendData) {
    //    dispatch({type: 'ADD', payload: friendData });
   // }

    function deleteUser(id){
        dispatch({type: 'DELETE', payload:id });
    }

    function updateUser(id, userData){
        dispatch({type:'UPDATE', payload: {id:id, data: userData}});
    }

    const value = {
        userData: MeState,
        //addMe: addMe,
        deleteUser: deleteUser,
        updateUser: updateUser
    };

    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    );
}

export default UserContextProvider;