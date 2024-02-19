import { CircularProgress } from "@mui/material";
import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import { useAuth } from "../contexts/AuthContext";

const wait = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

const Home = lazy(() => wait(500).then(() => import("../pages/Home")));
const Dashboard = lazy(() => wait(500).then(() => import("../pages/Dashboard")));
const Register = lazy(() => wait(500).then(() => import("../pages/Register")));
const Login = lazy(() => wait(500).then(() => import("../pages/Login")));
const ForgotPassword = lazy(() => wait(500).then(() => import("../pages/ForgotPassword")));
const PageNotFound = lazy(() => wait(500).then(() => import("../pages/PageNotFound")));

const Router = () => {
    const { currentUser } = useAuth();

    return (
        <React.Fragment>
            <Suspense fallback={<CircularProgress color="inherit" sx={{ marginTop: "50px", marginLeft: "50%" }} />}>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/register" element={currentUser ? <Dashboard /> : <Register />} />
                    <Route path="/login" element={currentUser ? <Dashboard /> : <Login />} />
                    <Route path="/forgot-password" element={currentUser ? <Dashboard /> : <ForgotPassword />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Suspense>
        </React.Fragment>
    )
}

export default Router
