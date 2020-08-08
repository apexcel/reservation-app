import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil'
import { userStateAtom, baseURLAtom } from '../../atoms/globalAtoms.ts'
import { isEmpty } from '../../utils/utils.ts'
import Input from '../modal/Input.tsx'
import useInput from '../../reducer/useInput.ts'
import axios from 'axios';

export default function SignIn({ setLogged }) {

    const [userState, setUserState] = useRecoilState(userStateAtom);
    const baseURL = useRecoilValue(baseURLAtom);

    const [{ username, password }, onChangeInput, reset] = useInput({
        username: '', password: ''
    });

    const onSignIn = async (ev) => {
        ev.preventDefault();
        if (isEmpty(username) || isEmpty(password)) {
            return;
        }

        const config = {
            url: `${baseURL}/api/login/sign-in`,
            data: {
                username: username,
                password: password,
                stamp: new Date().getTime()
            }
        };

        try {
            const resp = await axios.post(config.url, config.data).then(res => res.data)
            console.log(resp)
            // TODO:하루당 예약 횟수 제한하기
            if (resp) {
                setUserState({
                    username: resp.username,
                    fullname: resp.fullname,
                    dob: resp.dob,
                    lessons: resp.dob,
                    reservations: resp.reservations,
                    stamp: resp.stamp,
                })
                setLogged(true)
            }
        } catch (err) {
            throw err;
        }

    }

    return (
        <form className='form-wrapper'>
            <fieldset className='sign-in-fieldset'>
                <legend className='legend-title'>
                    <h1>Dilettante</h1>
                </legend>
                <Input id='username' name='username' onChangeInput={onChangeInput} type='text' placeHolder='Username' />
                <Input id='password' name='password' onChangeInput={onChangeInput} type='password' placeHolder='Password' />
                <div className='btn-field'>
                    <button className='btn-primary' type='button' onClick={onSignIn}>Sign in</button>
                </div>
                <Link to='/signup'>
                    <button className='btn-primary' type='button'>Sign up</button>
                </Link>
            </fieldset>
        </form>
    );
}