import React, { useState } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import SearchUser from './SearchUser.tsx'
import SignUp from './SignUp.tsx'

import '../../../styles/admin.scss'

export default function Admin() {

    const className = 'admin__page';

    return (
        <div className={`${className}-container`}>
        <aside className={`${className}-aside`}>
            <nav className={`${className}-nav`}>
                <Link className='link' to='/admin/signup'>Enroll User</Link>
                <Link className='link' to='/admin/search-user'>Search User</Link>
            </nav>
        </aside>
        <section className={`${className}-section`}>
            <Switch>
                <Route path='/admin/signup' component={() => <SignUp />} />
                <Route path='/admin/search-user' component={() => <SearchUser />} />
            </Switch>
        </section>
        </div>
    )
}