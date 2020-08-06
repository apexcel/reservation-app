import React from 'react'
import { Link } from 'react-router-dom'

import '../../styles/header.scss'

export default function Header({ setLogged }) {
    const logout = (e) => {
        e.preventDefault();
        setLogged(false);
    }

    return (
        <header className='man-top-header'>
            <nav className='main-top-nav'>
                <Link className='main-header-link' to='/'>Main</Link>
                <Link className='main-header-link' to='/profile'>Profile: Working on</Link>
                <div className='main-header-about-user'>
                    <button type='button' onClick={logout}>logout</button>
                </div>
            </nav>
        </header>
    )
}