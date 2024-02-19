import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <ul style={{ padding: "15px 0 0 15px" }}>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
            </ul>
        </div>
    )
}

export default Home
