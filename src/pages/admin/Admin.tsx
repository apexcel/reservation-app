import React from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import Search from './Search.tsx';
import SignUp from './SignUp.tsx';
import KakaoAPI from './KakaoApi.tsx';

import 'Styles/admin.scss';

export default function Admin() {

    const className = 'admin__page';

    return (
        <div className={`${className}-container`}>
        <aside className={`${className}-aside`}>
            <nav className={`${className}-nav`}>
                <Link className='link' to='/admin/signup'>Enroll User</Link>
                <Link className='link' to='/admin/search'>Search User</Link>
                <Link className='link' to='/admin/kakao-api'>Kakao API</Link>
                <Link className='link' to='/admin/alluser'>All User Manipulation</Link>
            </nav>
        </aside>
        <section className={`${className}-section`}>
            <Switch>
                <Route path='/admin/signup' component={() => <SignUp />} />
                <Route path='/admin/search' component={() => <Search />} />
                <Route path='/admin/kakao-api' component={() => <KakaoAPI />} />
            </Switch>
        </section>
        </div>
    );
}