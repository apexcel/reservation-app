import React, { useState, useEffect, useReducer } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import LoginForm from './LoginForm.tsx'
import SignUp from './SignUp.tsx'
import Header from './Header.tsx'
import UserInformation from './UserInfomation.tsx'
import Table from './Table.tsx'
import Calendar from './calendar/Calendar.tsx'

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

    const tHeadState = [
        {headerName: "소정", field: "so", range: []},
        {headerName: "현영", field: "hyun", range: []},
    ];

    const tBodyState = [
        {so: "so1", hyun: "hy1"},
        {so: "so2", hyun: "hy2"},
        {so: "so3", hyun: "hy3"},
    ];

    return (
        <div className='container'>
            <Calendar />
            <Table tHeadState={tHeadState} tBodyState={tBodyState}/>
            { logged ? <Header  setLogged={setLogged} /> : ''}
            <Switch>
                <Route exact path='/' component={() => <LoginForm isEmpty={isEmpty} setUserInfo={setUserInfo} logged={logged} setLogged={setLogged} userInfo={userInfo} />} />
                <Route exact path='/signup' component={() => <SignUp />} />
                <Route path='/userinfo' component={() => <UserInformation userInfo={userInfo}/>} />
            </Switch>
        </div>
    )
}