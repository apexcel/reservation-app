import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil'
import { userInfoAtom, baseURLAtom } from '../atoms/globalAtoms.ts'
import { isEmpty } from '../../utils/utils.ts'
import useInput from '../../reducer/useInput.ts'
import axios from 'axios';

export default function SignIn({ setLogged }) {

    const [userState, setUserState] = useRecoilState(userInfoAtom);
    const baseUrl = useRecoilValue(baseURLAtom);

    const [{ id, pw }, onChangeInput, reset] = useInput({
        id: '', pw: ''
    });

    const onSignIn = async (ev) => {
        ev.preventDefault();
        if (isEmpty(id) || isEmpty(pw)) {
            return;
        }

        const config = {
            url: `${baseUrl}/api/login/sign-in`,
            form_data: {
                user: { id, pw },
                stamp: new Date().getTime()
            }
        };

        try {
            const response = await axios.post(config.url, config.form_data).then(res => res.data)
            console.log(response)
            // TODO:하루당 예약 횟수 제한하기
            if (response.auth) {
                setUserState({
                    user: response.result[0],
                    stamp: response.stamp,
                    auth: response.auth,
                })
                setLogged(true)
            }
        } catch (err) {
            throw err;
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