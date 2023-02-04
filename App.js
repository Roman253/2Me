//import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {useAuthentication} from './utils/hooks/useAuthentication';
import { Ionicons } from '@expo/vector-icons';
import WelcomeScreen from './screens/WelcomeScreen';
import AllFriends from './screens/AllFriends';
import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';
import ManageFriend from './screens/ManageFriend';
import IconButton from './components/UI/IconButton';
import { GlobalStyles } from './constants/style';
import AddFriend from './screens/AddFriend';
import ManageUser from './screens/ManageUser';
import LoginScreen from './screens/auth/Login';
import SignupScreen from './screens/auth/Signup';
import {auth} from './config/firebaseConfig';
import { signOut } from 'firebase/auth'




const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: 'white',
          contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

function HomeStack() {
  return (
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

  );
}

function Home() {
  return (
  <Drawer.Navigator 
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
        headerRight:({tintColor}) => (
          <IconButton 
            icon="exit" 
            color={tintColor} 
            size={24} 
            onPress={async ()=>{
              await signOut(auth)
            }} 
          />
        ),
      }}
    />
   {/* <Drawer.Screen 
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
    />*/}
  </Drawer.Navigator>);
}

function Root() {
  const { user } = useAuthentication();

  return user ? <HomeStack /> : <AuthStack />;
}

export default function App() {
  return (
    <ThemeProvider>
      <StatusBar style="light" />
      <Root />
    </ThemeProvider>

  );
}
