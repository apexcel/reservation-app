import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import axios from 'axios'

export default function LoginForm({ logged, isEmpty }) {

    const [userData, setUserData] = useState({id: '', pw: ''})
    const [emptyError, setEmptyError] = useState({id: false, pw: false})

    useEffect(() => {
        console.log(emptyError)
    }, [emptyError])

    const onChangeHandler = (e) => {
        e.preventDefault()
        const { value, id } = e.target
        setUserData({ ...userData, [id]: value })
    }

    const onSignInHandler = async (e) => {
        e.preventDefault()

        if (!isEmpty(userData.id) && !isEmpty(userData.pw)) setEmptyError({...emptyError, id: true, pw: true})
        else setEmptyError({id: false, pw: false})

        const cfg = {
            url:'http://localhost:9000/api/login_check', 
            data: {
                user: userData,
                stamp: new Date().getTime()
            }
        }

        await axios.post(cfg.url, cfg.data)
                    .then(res => res.data)
                    .then(cl => console.log(cl))
    }

    const onSignUpHandler = (e) => {
        e.preventDefault()
        console.log(e.target)
    }
    return (
        <div>
            { logged ? '' :
            <form>
                <input id='id' onChange={onChangeHandler} type='text' name='id' placeholder='USERNAME' />
                <input id='pw' onChange={onChangeHandler} type='password' name='pw' placeholder='PASSWORD' />
                <button type='button' onClick={onSignInHandler}>Sign in</button>
                <button type='button' onClick={onSignUpHandler}><Link to='/signup'>Sign up</Link></button>
            </form>}
        </div>
    )
}