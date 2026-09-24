import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter basename="/react-firebase-auth">
        <AuthProvider><App /></AuthProvider>
    </BrowserRouter>,
);
