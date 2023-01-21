import { useContext, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../config/firebaseConfig';
import { Alert } from 'react-native';
import AuthContent from '../../components/Auth/AuthContent';
import LoadingOverlayAuth from '../../components/UI/LoadingOverlayAuth';
import { createUser } from '../../utils/database';

function SignupScreen() {
  const [loading, setLoading] = useState(false);

  async function signupHandler({email, password}) {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = await createUser({id: response.user.uid, email: response.user.email, user: response.user.email})
      // navigation.navigate('Sign In');
    } catch (error) {
      Alert.alert(
        'Signup failed',
        error.message
      );
    }
    setLoading(false);
  }
    
  if (loading){
    return <LoadingOverlayAuth message="creating user..." />;
  }
  return <AuthContent onAuthenticate={signupHandler}/>;
}

export default SignupScreen;
