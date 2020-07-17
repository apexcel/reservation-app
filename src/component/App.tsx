import React, { useState, useEffect, useReducer } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import LoginForm from './LoginForm.tsx'
import SignUp from './SignUp.tsx'

// styles
import '../styles/app.scss'

export default function App() {
    const [logged, setLogged] = useState(false)
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        if (!isEmpty(sessionStorage.getItem('userInfo'))) {
            setUserInfo(JSON.parse(sessionStorage.getItem('userInfo')));
            setLogged(true);
        }
    }, [])

    useEffect(() => {
        if (logged) sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        else sessionStorage.clear();
    }, [logged])

    const isEmpty = (obj) => {
        if (obj === '' || obj === null || obj === undefined || (obj !== null && typeof obj === 'object' && !Object.keys(obj).length)) return true;
        else return false;
    }

    return (
        <div className='container'>
            { logged ? <header>This is Header</header> : ''}
            <Switch>
                <Route exact path='/' component={() => <LoginForm isEmpty={isEmpty} setUserInfo={setUserInfo} logged={logged} setLogged={setLogged} />} />
                <Route exact path='/signup' component={() => <SignUp />} />
            </Switch>
        </div>
    )
}