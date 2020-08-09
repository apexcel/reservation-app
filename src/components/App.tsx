import React, { useState, useEffect, useReducer } from 'react'
import { atom, useRecoilState } from 'recoil'
import { BrowserRouter as Router, Route, Link, Switch, Redirect, useHistory } from 'react-router-dom'
import { userStateAtom } from '../atoms/globalAtoms.ts'
import { isEmpty } from '../utils/utils.ts'

import SignUp from './pages/SignUp.tsx'
import Header from './pages/Header.tsx'
import Footer from './pages/Footer.tsx'
import Profile from './pages/user/Profile.tsx'
import Main from './pages/Main.tsx'
import SignIn from './pages/SignIn.tsx'
import Admin from './pages/admin/Admin.tsx'
import ErrorPage from './pages/ErrorPage.tsx'

// styles
import '../styles/layout.scss'

export default function App() {
    const [userState, setUserState] = useRecoilState(userStateAtom)
    const [logged, setLogged] = useState(false)

    useEffect(() => {
        if (!isEmpty(sessionStorage.getItem('userState'))) {
            setUserState(JSON.parse(sessionStorage.getItem('userState')));
            setLogged(true);
        }
    }, [])

    useEffect(() => {
        if (logged) sessionStorage.setItem('userState', JSON.stringify(userState));
        else sessionStorage.clear();
    }, [logged])

    const IndexPage = () => {
        return logged ? <Main /> : <SignIn setLogged={setLogged} />
    }

    const ProfilePage = () => {
        return logged ? <Profile userState={userState} /> : <Redirect to='/' />
    }

    const AdminPage = () => {
        return logged && userState.isAdmin ? <Admin /> : <ErrorPage httpStatus={401} />
    }

    return (
        <>
            <div className='container'>
                {logged ? <Header setLogged={setLogged} userState={userState} /> : null}
                <Switch>
                    <Route exact path='/' component={IndexPage} />
                    <Route path='/profile' component={ProfilePage} />
                    <Route path='/signup' component={() => <SignUp />} />
                    <Route path='/admin' component={AdminPage} />
                    <Redirect to='/' />
                </Switch>
            </div>
            <Footer />
        </>
    )
}