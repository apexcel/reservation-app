import React from 'react';

import { isEmpty } from 'Utils/utils.ts'
import { setCookie, getCookie, deleteCookie } from 'Utils/browserUtils.ts'

import Input from 'Components/modal/Input.tsx'
import useInput from 'Reducers/useInput.ts'
import AdminApi from 'Api/AdminApi'
import UserApi from 'Api/UserApi'

export default function SignIn({ setIsLogin, adminLogin }) {

    const [{ username, password }, onChangeInput] = useInput({
        username: '', password: ''
    });

    const login = async (username, password) => {
        const data = {
            username: username,
            password: password
        };
        let response = null;

        try {
            if (adminLogin) response = await AdminApi.signIn(data);
            else response = await UserApi.signIn(data);
            setCookie('userToken', response.data.access_token);
            console.log(response)
            setIsLogin(true);
        }
        catch (err) {
            throw err;
        }
        return;
    };

    const onSignIn = async (ev) => {
        ev.preventDefault();
        if (isEmpty(username) || isEmpty(password)) return;
        else return login(username, password);
    };

    return (
        <form className='form-wrapper'>
            <fieldset className='sign-in-fieldset'>
                <legend className='legend-title'>
                    <h1>{adminLogin ? 'Admin' : 'Dilettante'}</h1>
                </legend>
                <Input id='username' name='username' className='common__input' onChange={onChangeInput} type='text' placeHolder='Username' />
                <Input id='password' name='password' className='common__input' onChange={onChangeInput} type='password' placeHolder='Password' />
                <div className='btn-field'>
                    <button className='btn btn-primary' type='button' onClick={onSignIn}>Sign in</button>
                </div>
            </fieldset>
        </form>
    );
}