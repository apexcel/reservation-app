import React from 'react'
import { Link } from 'react-router-dom'

import '../../styles/header.scss'

export default function Header({ setLogged, userState }) {

    const logout = (e) => {
        e.preventDefault();
        setLogged(false);
    }

    return (
        <header className='main-top-header'>
            <nav className='main-nav'>
                { userState.isAdmin ? <Link className='link' to='/admin'>Admin</Link> : null}
                <Link className='link' to='/'>Main</Link>
                <Link className='link' to='/profile'>Profile</Link>
                <div className='main-nav-about-user'>
                    <button type='button' onClick={logout}>logout</button>
                </div>
            </nav>
        </header>
    )
}