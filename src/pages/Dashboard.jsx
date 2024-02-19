import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Dashboard = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleLogout = async () => {
        setError("");
        try {
            Swal.fire({
                title: "Do you want to log out?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Yes",
                denyButtonText: `No`
            }).then((result) => {
                if (result.isConfirmed) {
                    const firebaseLogout = async () => {
                        await logout();
                        navigate("/login");
                    };
                    firebaseLogout();
                }
            });
        } catch (error) {
            console.log(error, "logoiy");
            setError(error.message);
        }
    };

    return (
        <div className={styles.container}>
            <Button
                className={styles.logoutButton}
                variant="contained"
                size="small"
                color="error"
                onClick={handleLogout}
            >Log out</Button>
            <h1 className={styles.heading}>Dashboard</h1>
            <div className={styles.welcome}>Welcome {currentUser.email}</div>
        </div>
    )
}

export default Dashboard
