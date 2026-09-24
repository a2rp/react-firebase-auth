import { CircularProgress } from "@mui/material";
import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import { useAuth } from "../contexts/AuthContext";

const Home = lazy(() => import("../pages/Home"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

const Router = () => {
    const { currentUser } = useAuth();
    const { pathname } = useLocation();

    return (
        <Suspense key={pathname} fallback={<CircularProgress color="inherit" sx={{ display: "block", margin: "50px auto" }} />}>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/register" element={currentUser ? <Navigate to="/dashboard" replace /> : <Register />} />
                <Route path="/login" element={currentUser ? <Navigate to="/dashboard" replace /> : <Login />} />
                <Route path="/forgot-password" element={currentUser ? <Navigate to="/dashboard" replace /> : <ForgotPassword />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Suspense>
    );
};

export default Router;
