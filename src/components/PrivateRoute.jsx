import { CircularProgress } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();
    if (loading) return <CircularProgress color="inherit" />;
    return currentUser ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
