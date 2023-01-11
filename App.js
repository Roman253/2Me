//import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Ionicons } from '@expo/vector-icons';

import WelcomeScreen from './screens/WelcomeScreen';
import AllFriends from './screens/AllFriends';

import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';
import ManageFriend from './screens/ManageFriend';
import IconButton from './components/UI/IconButton';
import { GlobalStyles } from './constants/style';
import FriendsContextProvider from './store/friends-context';
import UserContextProvider from './store/UserContext';
import AddFriend from './screens/AddFriend';
import ManageUser from './screens/ManageUser';



const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function Home() {
      return (<Drawer.Navigator 
        screenOptions={{
          headerStyle: {backgroundColor: '#3c0a6b'},
          headerTintColor: 'white',
          drawerActiveBackgroundColor: '#f0e1ff',
          drawerActiveTintColor: '#3c0a6b',   
        }}
      >
        <Drawer.Screen 
          name="2Me" 
          component={WelcomeScreen} 
          options={{
            drawerLabel: 'Call Friend',
            drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size}/>
            ),
          }}
        />
        <Drawer.Screen 
          name="Friends list"
          component={AllFriends}
          options={{
            drawerIcon: ({color, size}) => (
             <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen 
          name="Settings"
          component={ManageUser}
          options={{
            drawerIcon: ({color, size}) => (
             <Ionicons name="settings-outline" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen 
          name="About"
          component={AboutScreen}
          options={{
            drawerIcon: ({color, size}) => (
             <Ionicons name="information-circle" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen 
          name="Contact"
          component={ContactScreen}
          options={{
            drawerIcon: ({color, size}) => (
             <Ionicons name="md-mail" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>);
}

export default function App() {
  return (
    <>
      <StatusBar style='light'/>
      <UserContextProvider>
      <FriendsContextProvider>
      <NavigationContainer>
        
        <Stack.Navigator 
          screenOptions={{
            headerStyle: {backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: 'white'
          }}
        >
          <Stack.Screen 
            name='Home'
            component={Home}
            options={{ headerShown: false }}

          />
          <Stack.Screen
            name="ManageFriend"
            component={ManageFriend}
            options={{
              presentation:'modal',
            }}
          />        
          <Stack.Screen
            name="AddFriend"
            component={AddFriend}
            options={{
              presentation:'modal',
            }}
          />        
          
          
        </Stack.Navigator>
        
      </NavigationContainer>
      </FriendsContextProvider>
      </UserContextProvider>
    </>
  );
  
}
