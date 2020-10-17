import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { deleteCookie } from 'Utils/browserUtils.ts';
import Drawer from '@material-ui/core/Drawer';

interface HeaderProps {
    userState: IObject,
    setIsLogin: (set: boolean) => void
}

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function Header({ setIsLogin, userState }: HeaderProps): React.ReactElement {

    const history = useHistory();

    const logout = (ev) => {
        ev.preventDefault();
        deleteCookie('userToken');
        setIsLogin(false);
        globalThis.location.replace('/');
    };

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false
    });

    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    return (
        <header className='main-top-header'>
            <nav className='main-nav'>
                <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                    <aside className={`admin__aside-drawer`}>
                        <nav className={`admin__aside-nav`}>
                            <Link className='link' to='/admin/signup'>Enroll User</Link>
                            <Link className='link' to='/admin/search'>Search User</Link>
                            <Link className='link' to='/admin/kakao-api'>Kakao API</Link>
                            <Link className='link' to='/admin/alluser'>All User Manipulation</Link>
                        </nav>
                    </aside>
                </Drawer>
                {userState.isAdmin ? <button className='text-btn' onClick={toggleDrawer('left', true)} >Menu</button> : null}
                {userState.isAdmin ? <Link className='link' to='/admin'>Admin</Link> 
                    : userState.username !== 'guest' ? <Link className='link' to='/profile'>Profile</Link> 
                        : null}
                <Link className='link' to='/'>Main</Link>
                <div className='main-nav-about-user'>
                    <button className='text-btn' type='button' onClick={logout}>Sign Out</button>
                </div>
            </nav>
        </header>
    );
}