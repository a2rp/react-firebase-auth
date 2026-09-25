import React, { useEffect, useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import Router from "./router";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    const [showGoTop, setShowGoTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowGoTop(window.scrollY > 420);

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <NavLink className={styles.brand} to="/home" title="Firebase authentication home">
                    <img src={process.env.PUBLIC_URL + "/logo.png"} alt="Ashish Ranjan logo" />
                    <span><small>A2RP</small>React Firebase Auth</span>
                </NavLink>
                <nav className={styles.nav} aria-label="Primary navigation">
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/login">Login</NavLink>
                </nav>
            </header>
            <main className={styles.main}>
                <div className={styles.routerContainer}><Router /></div>
                <Footer />
            </main>
            {showGoTop && <button className={styles.goTopButton} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Go to top" title="Go to top"><MdKeyboardArrowUp /></button>}
            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default App;