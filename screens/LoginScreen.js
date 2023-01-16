import { useContext, useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlayAuth from '../components/UI/LoadingOverlayAuth';
import { login } from '../util/auth';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx =  useContext(AuthContext);

  async function loginHandler({email, password}) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
    } 
    setIsAuthenticating(false);
  }
    
  if (isAuthenticating){
    return <LoadingOverlayAuth message="Loggin you in..." />;
  } 
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
