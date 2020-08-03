import React, { useState, useEffect, useReducer } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { userInfoAtom } from './atoms/globalAtoms.ts'
import { atom, useRecoilState } from 'recoil'
import LoginForm from './pages/LoginForm.tsx'
import SignUp from './pages/SignUp.tsx'
import Header from './pages/Header.tsx'
import Footer from './pages/Footer.tsx'
import Profile from './pages/Profile.tsx'
import ErrorPage from './pages/ErrorPage.tsx'

// styles
import '../styles/app.scss'

export default function App() {

    const version = "0.0.1";
    const [userState, setUserState] = useRecoilState(userInfoAtom)
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

    const isEmpty = (obj) => {
        if (obj === '' || obj === null || obj === undefined || (obj !== null && typeof obj === 'object' && !Object.keys(obj).length)) return true;
        else return false;
    }

    return (
        <div className='container'>
            {logged ? <Header setLogged={setLogged} /> : null}
            <Switch>
                <Route exact path='/' component={() => <LoginForm isEmpty={isEmpty} setUserState={setUserState} logged={logged} setLogged={setLogged} userState={userState} />} />
                <Route exact path='/signup' component={() => <SignUp />} />
                {logged ? 
                    <Route exact path='/profile' component={() => <Profile userState={userState}/>} /> 
                    : <ErrorPage /> 
                }
            </Switch>
            <Footer version={version} />
        </div>
    )
}