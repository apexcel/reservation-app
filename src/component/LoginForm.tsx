import React from 'react'
import Main from './Main.tsx'
import SignIn from './SignIn.tsx'

import '../styles/loginform.scss'

export default function LoginForm({ setLogged, logged, setUserInfo, isEmpty }) {

    return (
        <>
            { logged 
                ? <Main setLogged={setLogged} setUserInfo={setUserInfo} /> 
                : <SignIn isEmpty={isEmpty} setUserInfo={setUserInfo} setLogged={setLogged}/> }
        </>
    )
}