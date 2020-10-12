import React from 'react';
import { Link } from 'react-router-dom';

import { deleteCookie } from 'Utils/browserUtils.ts';

interface HeaderProps {
    userState: IObject,
    setIsLogin: (set: boolean) => void
}

export default function Header({ setIsLogin, userState }: HeaderProps): React.ReactElement {

    const logout = (ev) => {
        ev.preventDefault();
        deleteCookie('userToken');
        setIsLogin(false);
        globalThis.location.replace('/');
    };

    return (
        <header className='main-top-header'>
            <nav className='main-nav'>
                {userState.isAdmin ? <Link className='link' to='/admin'>Admin</Link> : <Link className='link' to='/profile'>Profile</Link>}
                <Link className='link' to='/'>Main</Link>
                <div className='main-nav-about-user'>
                    <button className='signout-btn' type='button' onClick={logout}>Sign Out</button>
                </div>
            </nav>
        </header>
    );
}