import React from 'react';
import UserApi from '../../utils/api/UserApi'
import AdminApi from '../../utils/api/AdminApi'
import { useRecoilState } from 'recoil'
import { userStateAtom } from '../../atoms/globalAtoms.ts'
import { isEmpty } from '../../utils/utils.ts'
import Input from '../modal/Input.tsx'
import useInput from '../../reducer/useInput.ts'

export default function SignIn({ setIsLogin, adminLogin }) {

    const [userState, setUserState] = useRecoilState(userStateAtom);

    const [{ username, password }, onChangeInput] = useInput({
        username: '', password: ''
    });

    const getUserInfo = async () => {
        const data = {
            username: username,
            password: password,
        };
        if (adminLogin) {
            try {
                const adminResp = await AdminApi.signIn(data).then(resp => resp.data);
                localStorage.setItem('userToken', adminResp.token);
                setIsLogin(true)
            }
            catch (err) {
                throw err;
            }
        }
        else {
            try {
                const userResp = await UserApi.signIn(data).then(resp => resp.data);
                localStorage.setItem('userToken', userResp.token);
                setIsLogin(true)
            }
            catch (err) {
                throw err;
            }
        }
        return;
    }

    const onSignIn = async (ev) => {
        ev.preventDefault();
        if (isEmpty(username) || isEmpty(password)) return;
        else getUserInfo();
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