import { Alert, Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ForgotPassword = () => {
    const [email, setEmail] = useState("email2@mail.com");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { resetPassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!emailRegex.test(email)) {
            return setError("Invalid email address");
        }

        try {
            setIsLoading(true);
            setError("");
            setMessage("");
            await resetPassword(email);
            setMessage("Check email for password reset link");
        } catch (error) {
            console.log(error.message, "forgot p[assword error message");
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                sx={{ maxWidth: "480px" }}
            >
                <h1>Reset password</h1>
                <div style={{ marginTop: "30px" }}>
                    {error.length > 0
                        ? <Alert severity="error">{error}</Alert>
                        : ""}
                    {message.length > 0
                        ? <Alert severity="success">{message}</Alert>
                        : ""}
                </div>
                <TextField
                    required
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    sx={{ marginTop: "30px" }}
                />
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ marginTop: "30px" }}
                    disabled={isLoading}
                >Submit</Button>

                <div style={{ marginTop: "30px", display: "flex", justifyContent: "space-between", gap: "30px" }}>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Register</NavLink>
                </div>
            </Box>
        </div>
    )
}

export default ForgotPassword
