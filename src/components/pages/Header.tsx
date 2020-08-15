import React from 'react'
import { Link } from 'react-router-dom'

import '../../styles/header.scss'

export default function Header({ setIsLogin, userState }) {

    const logout = (e) => {
        e.preventDefault();
        setIsLogin(false);
        window.location.replace('/');
    }

    return (
        <header className='main-top-header'>
            <nav className='main-nav'>
                { userState.isAdmin ? <Link className='link' to='/admin'>Admin</Link> : null}
                <Link className='link' to='/'>Main</Link>
                <Link className='link' to='/profile'>Profile</Link>
                <div className='main-nav-about-user'>
                    <button className='signout-btn' type='button' onClick={logout}>Sign Out</button>
                </div>
            </nav>
        </header>
    )
}