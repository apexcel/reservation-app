import React, { useState, useEffect, useReducer } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import LoginForm from './LoginForm.tsx'
import SignUp from './SignUp.tsx'
import Header from './Header.tsx'
import UserInformation from './UserInfomation.tsx'
import Footer from './Footer.tsx'

// styles
import '../styles/app.scss'

export default function App() {

    const version = "0.0.1";

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
            { logged ? <Header setLogged={setLogged} /> : null}
            <Switch>
                <Route exact path='/' component={() => <LoginForm isEmpty={isEmpty} setUserInfo={setUserInfo} logged={logged} setLogged={setLogged} userInfo={userInfo} />} />
                <Route exact path='/signup' component={() => <SignUp />} />
                <Route path='/userinfo' component={() => <UserInformation userInfo={userInfo}/>} />
            </Switch>
            <Footer version={version} />
        </div>
    )
}