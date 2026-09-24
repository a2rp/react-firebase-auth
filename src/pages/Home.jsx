import { MdArrowForward, MdLock, MdPersonAdd, MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import styles from "./home.module.scss";

const Home = () => (
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
        <div className={styles.cards}>
            <article><MdPersonAdd /><h2>Register</h2><p>Create a Firebase email and password account.</p><NavLink to="/register">Open register</NavLink></article>
            <article><MdLock /><h2>Login</h2><p>Authenticate existing users and handle form errors.</p><NavLink to="/login">Open login</NavLink></article>
            <article><MdSpaceDashboard /><h2>Dashboard</h2><p>Reach a protected route after successful authentication.</p><NavLink to="/dashboard">View dashboard</NavLink></article>
        </div>
        <div className={styles.note}><strong>What to try next</strong><span>Configure Firebase environment values, create an account, then verify that the dashboard route remains private after signing out.</span></div>
    </section>
);

export default Home;
