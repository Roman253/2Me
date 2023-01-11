import { createContext, useReducer } from "react";
/*
const DUMMY_FRIENDS = [
    {
        id:'e1',
        user: 'Yosi',
        email: 'ff@gmail.com',
        password: '123'
    },
    {
        id:'e2',
        user: 'Noam',
        email: 'aa@gmail.com',
        password: '456'
    },
    {
        id:'e3',
        user: 'Lian',
        email: 'bb@gmail.com',
        password: '789'
    },
    {
        id:'e4',
        user: 'Gila',
        email: 'xx@gmail.com',
        password: '465'
    },
    {
        id:'e5',
        user: 'Moti',
        email: 'cc@gmail.com',
        password: '234'
    },
    {
        id:'e6',
        user: 'Roman',
        email: 'dd@gmail.com',
        password: '653'
    },
    {
        id:'e7',
        user: 'Amit',
        email: 'vbfg@gmail.com',
        password: '566'
    },
    {
        id:'e8',
        user: 'Lihi',
        email: 'saa@gmail.com',
        password: '753e'
    }
];
*/
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