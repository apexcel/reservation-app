import React from 'react'
import { Link } from 'react-router-dom'

import { setCookie, getCookie, deleteCookie } from 'Utils/browserUtils.ts'

import 'Styles/header.scss'

export default function Header({ setIsLogin, userState }) {

    const logout = (ev) => {
        ev.preventDefault();
        setIsLogin(false);
        deleteCookie('userToken');
        globalThis.location.replace('/');
    };

    return (
        <header className='main-top-header'>
            <nav className='main-nav'>
                { userState.isAdmin ? <Link className='link' to='/admin'>Admin</Link> : null}
                <Link className='link' to='/'>Main</Link>
                { userState.isAdmin ? null : <Link className='link' to='/profile'>Profile</Link> }
                <div className='main-nav-about-user'>
                    <button className='signout-btn' type='button' onClick={logout}>Sign Out</button>
                </div>
            </nav>
        </header>
    )
}