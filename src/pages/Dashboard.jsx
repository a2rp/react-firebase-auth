import React, { useState } from "react";
import { MdLockOpen, MdLogout, MdPerson } from "react-icons/md";
import { Alert, Button } from "@mui/material";
import Swal from "sweetalert2";
import { useAuth } from "../contexts/AuthContext";
import styles from "./styles.module.scss";

const Dashboard = () => {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("");

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "Sign out?",
            text: "Your current session will be closed.",
            showCancelButton: true,
            confirmButtonText: "Sign out",
            cancelButtonText: "Keep me signed in",
        });
        if (!result.isConfirmed) return;

        try {
            setError("");
            await logout();
        } catch (logoutError) {
            setError(logoutError.message);
        }
    };

    return (
        <section className={styles.container}>
            <div className={styles.dashboardHead}>
                <div><span className={styles.eyebrow}>PRIVATE AREA</span><h1 className={styles.heading}>Dashboard</h1></div>
                <Button className={styles.logoutButton} variant="outlined" color="error" onClick={handleLogout}><MdLogout />Sign out</Button>
            </div>
            {error && <Alert severity="error">{error}</Alert>}
            <div className={styles.dashboardGrid}>
                <article><MdPerson /><span>Signed in as</span><strong>{currentUser?.email}</strong></article>
                <article><MdLockOpen /><span>Route status</span><strong>Protected</strong></article>
            </div>
            <p className={styles.welcome}>This page is available only while Firebase reports an active authenticated session.</p>
        </section>
    );
};

export default Dashboard;
