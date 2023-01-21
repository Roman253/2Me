import React, {useState, useEffect} from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import {auth} from '../../config/firebaseConfig';



export function useAuthentication() {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user
  };
}