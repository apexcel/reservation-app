import React, { useState, useEffect } from 'react'
import LoginForm from './LoginForm.tsx'
// styles
import '../styles/app.scss'

export default function App() {

    const [userLogin, setUserLogin] = useState(false)

    return(
        <div className='container'>
            <LoginForm />
        </div>
    )
}