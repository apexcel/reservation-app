import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import LoginForm from './LoginForm.tsx'
import SignUp from './SignUp.tsx'

// styles
import '../styles/app.scss'

export default function App() {

    const [logged, setLogged] = useState(false)

    useEffect(() => {
        sessionStorage.setItem('userData', 'Kim')
        console.log(sessionStorage.getItem('userData'))
    })

    const isEmpty = (obj) => {    
        if (obj === '' || obj === null || obj === undefined || (obj !== null && typeof obj === 'object' && !Object.keys(obj).length)) {
            return true            
        }
        else {
            return false
        }
    }

    return(
        <div className='container'>
            <Switch>
                <Route exact path='/' component={() => <LoginForm isEmpty={isEmpty} logged={logged}/>}/>
                <Route exact path='/signup' component={() => <SignUp />}/>
            </Switch>
        </div>
    )
}