import { Alert } from "@mui/material";
import { MdArrowForward, MdLock, MdPersonAdd, MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./home.module.scss";

const Home = () => {
    const { isFirebaseConfigured } = useAuth();

    return (
        <section className={styles.page}>
        <div className={styles.hero}>
            <span className={styles.eyebrow}>FIREBASE AUTHENTICATION</span>
            <h1>Simple sign-in flows with protected access.</h1>
            <p>Explore a focused React authentication example with registration, login, password reset and a private dashboard route.</p>
            <div className={styles.actions}>
                <NavLink className={styles.primary} to="/register">Create account <MdArrowForward /></NavLink>
                <NavLink className={styles.secondary} to="/login">Sign in</NavLink>
            </div>
        </div>
        {!isFirebaseConfigured && <Alert severity="warning">Firebase Authentication is not configured. Copy <code>.env.example</code> to <code>.env</code>, add your Firebase Web app settings, enable Email/Password sign-in, and restart the app.</Alert>}
        <div className={styles.cards}>
            <article><MdPersonAdd /><h2>Register</h2><p>Create a Firebase email and password account.</p><NavLink to="/register">Open register</NavLink></article>
            <article><MdLock /><h2>Login</h2><p>Authenticate existing users and handle form errors.</p><NavLink to="/login">Open login</NavLink></article>
            <article><MdSpaceDashboard /><h2>Dashboard</h2><p>Reach a protected route after successful authentication.</p><NavLink to="/dashboard">View dashboard</NavLink></article>
            </div>
            <div className={styles.note}><strong>What to try next</strong><span>Configure Firebase environment values, create an account, then verify that the dashboard route remains private after signing out.</span></div>
        </section>
    );
};

export default Home;
