import React, { useState, useEffect, useReducer } from 'react'
import { atom, useRecoilState } from 'recoil'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { userStateAtom } from '../atoms/globalAtoms.ts'
import { isEmpty } from '../utils/utils.ts'

import SignUp from './pages/SignUp.tsx'
import Header from './pages/Header.tsx'
import Footer from './pages/Footer.tsx'
import Profile from './pages/user/Profile.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import Main from './pages/Main.tsx'
import SignIn from './pages/SignIn.tsx'

// styles
import '../styles/app.scss'

export default function App() {

    const version = "0.0.1";
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
        return logged ? <Profile userState={userState}/> : <ErrorPage />
    }

    return (
        <div className='container'>
            {logged ? <Header setLogged={setLogged} /> : null}
            <Switch>
                <Route exact path='/' render={IndexPage} />
                <Route exact path='/profile' render={ProfilePage} />
                <Route exact path='/signup' component={() => <SignUp />} />
            </Switch>
            <Footer version={version} />
        </div>
    )
}