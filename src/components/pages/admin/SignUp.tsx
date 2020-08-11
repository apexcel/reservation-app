import React, {useEffect } from 'react';
import { useRecoilValue } from 'recoil'
import { baseURLAtom } from '../../../atoms/globalAtoms.ts'
import { isEmpty } from '../../../utils/utils.ts'
import useInput from '../../../reducer/useInput.ts';
import axios from 'axios';

import Input from '../../modal/Input.tsx'
import SelectOption from '../../modal/SelectOption.tsx';

import '../../../styles/common.scss'
import '../../../styles/signup.scss'

export default function SignUp() {

    const initForm = {
        username: '',
        password: '',
        password_check: '',
        first_name: '',
        last_name: '',
        dob_yy: '',
        dob_mm: '',
        dob_dd: '',
        tel: '',
        is_admin: false
    }

    const [signUpForm, onChangeInput, onChangeCheck, reset] = useInput(initForm)
    const baseURL = useRecoilValue(baseURLAtom);

    useEffect(() => {
        console.log(signUpForm)
    })

    const signUpAPI = async (ev) => {
        ev.preventDefault();
        const config = {
            url: `${baseURL}/api/userinfo/sign-up`,
            data: {
                username: signUpForm.username,
                password: signUpForm.password,
                fullname: signUpForm.last_name + signUpForm.first_name,
                dob: new Date(signUpForm.dob_yy, signUpForm.dob_mm - 1, signUpForm.dob_dd),
                tel: signUpForm.tel
            }
        };

        try {
            const firstEmptyItem = Object.values(signUpForm).map(el => el !== '');
            firstEmptyItem.map((el, idx) => {
                let classList = document.getElementById(Object.keys(signUpForm)[idx]).classList;
                el ? (classList.remove("empty-warn")) : (classList.add("empty-warn"));
            });
            //axios.post('http://localhost:9000/api/login/sign-up', signUpForm).then(res => console.log(res))
            await axios.post(config.url, config.data).then(res => console.log(res))
        }
        catch (err) {
            // redirect 503 error page;
            throw err;
        }
    }

    const isAbleId = () => {

    }

    const isSamePassword = () => {
        if (signUpForm.password === signUpForm.password_check) return true;
        return false;
    }

    //TODO: 아이디 중복 확인 하기, 비밀번호 2중 확인 일치, 생년월일 제대로된 입력인지 확인
    // 휴대폰양식 확인, 알맞은 이메일 양식확인
    return (
        <form className='signup-form'>
            <fieldset className='signup-fieldset'>
                <Input
                    onChangeInput={onChangeInput}
                    name='username'
                    id='username'
                    labelTitle='Username'
                    type='text'
                    maxLength={20}
                />

                <Input
                    onChangeInput={onChangeInput}
                    name='password'
                    id='password'
                    labelTitle='Password'
                    type='password'
                    maxLength={40}
                />

                <Input
                    onChangeInput={onChangeInput}
                    name='password_check'
                    id='password_check'
                    labelTitle='Password Check'
                    type='password'
                    maxLength={40}
                />

                {/* Name */}
                <div className='name-box'>
                    <Input
                        onChangeInput={onChangeInput}
                        name='first_name'
                        id='first_name'
                        labelTitle='First Name'
                        type='text'
                        maxLength={40}
                    />

                    <Input
                        onChangeInput={onChangeInput}
                        name='last_name'
                        id='last_name'
                        labelTitle='Last Name'
                        type='text'
                        maxLength={40}
                    />
                </div>

                {/* DOB */}

                <div className='dob-box'>
                    <Input
                        onChangeInput={onChangeInput}
                        name='dob_yy'
                        id='dob_yy'
                        labelTitle='Year'
                        type='text'
                        maxLength={4}
                    />

                    <SelectOption
                        onChangeInput={onChangeInput}
                        name='dob_mm'
                        id='dob_mm'
                        labelTitle='Month'
                        optionArray={['Month', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                    />

                    <Input
                        onChangeInput={onChangeInput}
                        name='dob_dd'
                        id='dob_dd'
                        labelTitle='Day'
                        type='text'
                        maxLength={2}
                    />
                </div>

                <Input
                    onChangeInput={onChangeInput}
                    name='tel'
                    id='tel'
                    labelTitle='Telephone'
                    type='tel'
                    maxLength={11}
                />

                <Input
                    onChangeInput={onChangeCheck}
                    name='is_admin'
                    id='is_admin'
                    labelTitle='Is Admin'
                    type='checkbox'
                />

                <div className='btn-area'><button type="button" onClick={signUpAPI} className='btn_primary'>Sign Up</button></div>
            </fieldset>
        </form>
    )
}