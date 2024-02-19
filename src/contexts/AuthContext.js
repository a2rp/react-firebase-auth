import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";

const AuthContext = React.createContext({});

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();

    const register = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    };

    const login = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async (email, password) => {
        await signOut(auth);
        console.log(currentUser, "after logout");
    };

    const resetPassword = async (email) => {
        return await sendPasswordResetEmail(auth, email);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    const value = { currentUser, register, login, logout, resetPassword };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

