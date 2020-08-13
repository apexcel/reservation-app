import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil'
import { userStateAtom, baseURLAtom } from '../../atoms/globalAtoms.ts'
import { isEmpty } from '../../utils/utils.ts'
import Input from '../modal/Input.tsx'
import useInput from '../../reducer/useInput.ts'
import axios from 'axios';

export default function SignIn({ setIsLogin, adminLogin }) {

    const [userState, setUserState] = useRecoilState(userStateAtom);
    const baseURL = useRecoilValue(baseURLAtom);

    const [{ username, password }, onChangeInput] = useInput({
        username: '', password: ''
    });

    const callGetUserInfoAPI = async () => {

        const url = adminLogin ? `${baseURL}/api/admin/signin` : `${baseURL}/api/userinfo/signin`
        const data = {
            username: username,
            password: password,
            stamp: new Date().getTime()
        };

        try {
            const resp = await axios.post(url, data).then(res => res.data)
            if (resp) {
                if (adminLogin) {
                    setUserState({
                        username: resp.username,
                        fullname: resp.fullname,
                        stamp: resp.stamp,
                        isAdmin: resp.isAdmin
                    })
                }
                else {
                    setUserState({
                        username: resp.username,
                        fullname: resp.fullname,
                        dob: resp.dob,
                        lessons: resp.lessons,
                        reservations: resp.reservations,
                        stamp: resp.stamp,
                    })
                }
                setIsLogin(true)
            }
        }
        catch (err) {
            throw err;
        }
    }

    const onSignIn = async (ev) => {
        ev.preventDefault();
        if (isEmpty(username) || isEmpty(password)) return;
        else callGetUserInfoAPI();
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
                    <button className='btn-primary' type='button' onClick={onSignIn}>Sign in</button>
                </div>
            </fieldset>
        </form>
    );
}