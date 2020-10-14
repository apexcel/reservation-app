import React from 'react';
import { useSetRecoilState } from 'recoil';
import { userStateAtom } from 'Atoms/globalAtoms.ts';
import jwtDecode from 'jwt-decode';

import { isEmpty } from 'Utils/utils.ts';
import { setCookie } from 'Utils/browserUtils.ts';
import { encryptAES, decryptAES } from 'Utils/cryptoUtils.ts';

import Input from 'Components/modal/Input.tsx';
import useInput from 'Reducers/useInput.ts';
import UserApi from 'Api/UserApi.ts';
import AuthApi from 'Api/AuthApi.ts';

interface SignInProps {
    setIsLogin: (set: boolean)=> void,
    adminLogin: boolean
}

export default function SignIn({ setIsLogin, adminLogin }: SignInProps): React.ReactElement {

    const setUserState = useSetRecoilState(userStateAtom);

    const [{ username, password }, onChangeInput] = useInput({
        username: '', password: ''
    });

    const login = async (username, password) => {
        const data = {
            username: username,
            password: password
        };

        const encData = encryptAES(data);
        let response = null;

        if (adminLogin) response = await AuthApi.signIn({ sign_in_form: encData });
        else response = await AuthApi.signIn({ sign_in_form: encData });

        if (response !== null) {
            console.log(response)
            const token = response.data.token;
            const decoded = decryptAES(jwtDecode(token).access_code);
            const userInfo = await UserApi.getUserInfo(response.data.token, decoded.id).then(res => jwtDecode(res.data.token));
            console.log(userInfo)
            setUserState({
                username: userInfo.username,
                fullname: userInfo.fullname,
                dob: userInfo.dob,
                tel: userInfo.tel,
                lessons: userInfo.lessons,
                reservations: userInfo.reservations,
                isAdmin: userInfo.isAdmin
            });

            setCookie('userToken', token);
            setIsLogin(true);
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