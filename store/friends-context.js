import { createContext, useReducer } from "react";

export const FriendsContext = createContext({
    friends: [],
    setFriends:(friends)=>{},
    addFriend: ({user}) => {},
    deleteFriend: (id) => {}
});

function friendsReducer(state,action){
    switch(action.type) {
        case 'ADD': 
            //const id = new Date().toString() + Math.random().toString();
            return[action.payload, ...state];
        case 'SET':
            return action.payload;
        case 'DELETE':
            return state.filter((friend) => friend.id !==action.payload);
        default:
                return state;
    }
}

function FriendsContextProvider({children}) {
    const [friendsState, dispatch]= useReducer(friendsReducer, [] ); 

    function addFriend(friendData) {
        dispatch({type: 'ADD', payload: friendData });
    }

    function setFriends(friends){
        dispatch({ type:'SET', payload:friends });
    }

    function deleteFriend(id){
        dispatch({type: 'DELETE', payload:id });
    }

    const value = {
        friends: friendsState,
        addFriend: addFriend,
        setFreinds: setFriends,
        deleteFriend: deleteFriend
    };

    return (
        <FriendsContext.Provider value={value}>
            {children}
        </FriendsContext.Provider>
    );
}

export default FriendsContextProvider;