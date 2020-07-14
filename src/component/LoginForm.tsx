import React, { useEffect, useState } from 'react'

export default function LoginForm() {

    const [userData, setUserData] = useState({})

    useEffect(() => {
        console.log(userData)
    }, [userData])

    const onChangeHandler = (e) => {
        e.preventDefault()
        const {value, id} = e.target
        setUserData({...userData, [id]: value})
    }

    const onSumbitHandler = async (e) => {
        e.preventDefault()
        await fetch('http://localhost:9000/api/login_check').then(res => res.status)
    }
    return (
        <div>
            <input id='userId' onChange={onChangeHandler} type='text' name='userId' placeholder='USERNAME' />
            <input id='userPw' onChange={onChangeHandler} type='password' name='userPw' placeholder='PASSWORD' />
            <button type='button' onClick={onSumbitHandler}>Sign in</button>
        </div>
    )
}