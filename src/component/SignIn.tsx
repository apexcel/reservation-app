import React, { useState, useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import useInput from '../reducer/useInput.ts'

export default function SignIn({ setUserInfo, setLogged, isEmpty }) {

    const [{ id, pw }, onChangeInput, reset] = useInput({
        id: '', pw: ''
    });

    useEffect(() => {
    }, [])

    useEffect(() => {
        console.log({ id, pw })
    })

    const onSignIn = async (e) => {
        e.preventDefault();
        if (isEmpty(id) || isEmpty(pw)) {
            return;
        }

        const config = {
            url: 'http://localhost:9000/api/login_check',
            form_data: {
                user: { id, pw },
                stamp: new Date().getTime()
            }
        };

        const response = await axios.post(config.url, config.form_data).then(res => res.data)
        console.log(response)
        if (response.auth) {
            setUserInfo({ user_info: response.result[0], stamp: response.stamp, auth: response.auth })
            setLogged(true)
        }
    }

    return (
        <form className='form-wrapper'>
            <fieldset>
                <legend>DILETTANTE</legend>
                <div className='input-box'>
                    <input className='form-input' id='id' onChange={onChangeInput} type='text' name='id' placeholder='USERNAME' />
                </div>
                <div className='input-box'>
                    <input className='form-input' id='pw' onChange={onChangeInput} type='password' name='pw' placeholder='PASSWORD' />
                </div>
                <button className='btn-primary' type='button' onClick={onSignIn}>Sign in</button>
                <button className='btn-primary' type='button'><Link to='/signup'>Sign up</Link></button>
            </fieldset>
        </form>
    );
}