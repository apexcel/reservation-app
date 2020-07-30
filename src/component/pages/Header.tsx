import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({ setLogged }) {
    const logout = (e) => {
        e.preventDefault();
        setLogged(false);
    }
    
    return (
        <header>
            <nav>
                <Link to="/">Main</Link>
                <Link to="profile">Profile: Working on</Link>
            </nav>
            <button onClick={logout}>logout</button>
        </header>
    )
}