import { Alert, Box, Button, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { register, isFirebaseConfigured } = useAuth();
    const navigate = useNavigate();
    const [passwordInputType, setPasswordInputType] = useState("password");
    const [confirmPasswordInputType, setConfirmPasswordInputType] = useState("password");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return setError("Invalid email address");
        }

        if (password.length < 10) {
            return setError("Password must be at least 10 chars");
        }

        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            setIsLoading(true);
            setError("");
            await register(email, password);
            navigate("/dashboard");
        } catch (error) {
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
                autoComplete="on"
                onSubmit={handleSubmit}
                sx={{ maxWidth: "480px" }}
            >
                <h1>Register</h1>
                {!isFirebaseConfigured && <Alert severity="warning">Firebase Authentication is not configured. Follow the setup steps in the project README.</Alert>}
                <div style={{ marginTop: "30px" }}>
                    {error.length > 0
                        ? <Alert severity="error">{error}</Alert>
                        : ""}
                </div>
                <TextField
                    required
                    fullWidth
                    label="Email Address"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    sx={{ marginTop: "30px" }}
                />
                <TextField
                    required
                    fullWidth
                    label="Password"
                    type={passwordInputType}
                    autoComplete="new-password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                edge="end"
                                aria-label={passwordInputType === "text" ? "Hide password" : "Show password"}
                                onClick={() => setPasswordInputType((type) => type === "password" ? "text" : "password")}
                            >
                                {passwordInputType === "text" ? <VisibilityOffIcon aria-hidden="true" /> : <VisibilityIcon aria-hidden="true" />}
                            </IconButton>
                        ),
                    }}
                />
                <TextField
                    required
                    fullWidth
                    label="Confirm password"
                    type={confirmPasswordInputType}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={event => setConfirmPassword(event.target.value)}
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                edge="end"
                                aria-label={confirmPasswordInputType === "text" ? "Hide confirm password" : "Show confirm password"}
                                onClick={() => setConfirmPasswordInputType((type) => type === "password" ? "text" : "password")}
                            >
                                {confirmPasswordInputType === "text" ? <VisibilityOffIcon aria-hidden="true" /> : <VisibilityIcon aria-hidden="true" />}
                            </IconButton>
                        ),
                    }}
                />

                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ marginTop: "30px" }}
                    disabled={isLoading || !isFirebaseConfigured}
                >Submit</Button>

                <div style={{ marginTop: "30px", display: "flex", justifyContent: "space-between", gap: "30px" }}>
                    <NavLink to="/forgot-password">Forgot password</NavLink>
                    <div>
                        Already have an account? <NavLink to="/login">Login</NavLink>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default Register
