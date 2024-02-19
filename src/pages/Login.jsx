import { Alert, Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
    const [email, setEmail] = useState("email2@mail.com");
    const [password, setPassword] = useState("password12345");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login, currentUser } = useAuth();
    const navigate = useNavigate();
    const [passwordInputType, setPasswordInputType] = useState("password");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!emailRegex.test(email)) {
            return setError("Invalid email address");
        }

        if (password.length < 10) {
            return setError("Password must be at least 10 chars");
        }

        try {
            setIsLoading(true);
            setError("");
            const response = await login(email, password);
            console.log(response, "login response");
            navigate("/dashboard");
        } catch (error) {
            console.log(error.message, "error message");
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
                <h1>Login</h1>
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
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    sx={{ marginTop: "30px" }}
                />
                <div style={{ marginTop: "30px", position: "relative" }}>
                    <TextField
                        required
                        fullWidth
                        label="Password"
                        type={passwordInputType}
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    {passwordInputType === "text" ? <>
                        <VisibilityIcon style={{ position: "absolute", margin: "auto", top: 0, bottom: 0, right: "10px" }} onClick={() => setPasswordInputType("password")} />
                    </> : <>
                        <VisibilityOffIcon style={{ position: "absolute", margin: "auto", top: 0, bottom: 0, right: "10px" }} onClick={() => setPasswordInputType("text")} />
                    </>}
                </div>
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ marginTop: "30px" }}
                    disabled={isLoading}
                >Submit</Button>

                <div style={{ marginTop: "30px", display: "flex", justifyContent: "space-between", gap: "30px" }}>
                    <NavLink to="/forgot-password">
                        Forget password ?
                    </NavLink>
                    <div>
                        Do not have an account? <NavLink to="/register">Register</NavLink>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default Login
