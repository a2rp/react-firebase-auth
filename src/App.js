import React from "react";
import styles from "./styles.module.scss";
import Router from "./router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";


const App = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <NavLink to="/home" style={{ color: "#fff" }}>
                    a2rp: react firebase authentication
                </NavLink>
            </div>
            <div className={styles.main}>
                <div className={styles.routerContainer}>
                    <Router />
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

export default App
