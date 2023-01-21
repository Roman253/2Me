import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../config/firebaseConfig';
import { Alert } from 'react-native';
import AuthContent from '../../components/Auth/AuthContent';
import LoadingOverlayAuth from '../../components/UI/LoadingOverlayAuth';

function LoginScreen() {
  const [loading, setLoading] = useState(false);

  async function loginHandler({email, password}) {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        error.message
      );
    } 
    setLoading(false);
  }
    
  if (loading){
    return <LoadingOverlayAuth message="Loggin you in..." />;
  } 
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
