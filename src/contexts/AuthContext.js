import React, { useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, isFirebaseConfigured } from "../firebase.config";

const AuthContext = React.createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const requireAuth = () => {
        if (!auth) {
            throw new Error("Firebase is not configured. Copy .env.example to .env, add your Firebase Web app settings, then restart the app.");
        }
    };

    const register = (email, password) => { requireAuth(); return createUserWithEmailAndPassword(auth, email, password); };
    const login = (email, password) => { requireAuth(); return signInWithEmailAndPassword(auth, email, password); };
    const logout = () => { requireAuth(); return signOut(auth); };
    const resetPassword = (email) => { requireAuth(); return sendPasswordResetEmail(auth, email); };

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            return undefined;
        }

        return onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        }, () => {
            setCurrentUser(null);
            setLoading(false);
        });
    }, []);

    return <AuthContext.Provider value={{ currentUser, loading, isFirebaseConfigured, register, login, logout, resetPassword }}>{children}</AuthContext.Provider>;
};
