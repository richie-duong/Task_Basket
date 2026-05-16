import { createContext, useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase";

// CREATE CONTEXT
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  // CURRENT USER
  const [currentUser, setCurrentUser] = useState(null);

  // LOADING STATE
  const [loading, setLoading] = useState(true);

  // FIREBASE AUTH LISTENER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
