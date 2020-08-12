import React, {useEffect } from 'react';
import { useRecoilValue } from 'recoil'
import { baseURLAtom } from '../../../atoms/globalAtoms.ts'
import { useHistory } from 'react-router-dom';
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
        passwordCheck: '',
        firstname: '',
        lastname: '',
        dobYear: '',
        dobMonth: '',
        dobDate: '',
        tel: '',
        isAdmin: false,
    }

    const [signUpForm, onChangeInput, onChangeCheck] = useInput(initForm)
    const baseURL = useRecoilValue(baseURLAtom);
    const histoty = useHistory();

    useEffect(() => {
        console.log(signUpForm)
    })

    const callSignUpAPI = async (ev) => {
        ev.preventDefault();
        const config = {
            url: `${baseURL}/api/userinfo/sign-up`,
            data: {
                username: signUpForm.username,
                password: signUpForm.password,
                fullname: signUpForm.lastname + signUpForm.firstname,
                dob: new Date(signUpForm.dobYear, signUpForm.dobMonth - 1, signUpForm.dobDate),
                tel: signUpForm.tel,
                isAdmin: signUpForm.isAdmin
            }
        };

        try {
            const firstEmptyItem = Object.values(signUpForm).map(el => el !== '');
            firstEmptyItem.map((el, idx) => {
                let classList = document.getElementById(Object.keys(signUpForm)[idx]).classList;
                el ? (classList.remove("empty-warn")) : (classList.add("empty-warn"));
            });
            axios.post(config.url, config.data).then(res => console.log(res))
        }
        catch (err) {
            // redirect 503 error page;
            throw err;
        }
        finally {
            const userPower = signUpForm.isAdmin ? 'Admin' : '일반회원';
            alert(`${signUpForm.lastname}${signUpForm.firstname}의 ${userPower} 등록이 되었습니다.`)
            window.location.replace(`/admin`)
        }
    }


    const isSamePassword = () => {
        if (signUpForm.password === signUpForm.passwordCheck) return true;
        return false;
    }

    //TODO: 아이디 중복 확인 하기, 비밀번호 2중 확인 일치, 생년월일 제대로된 입력인지 확인
    // 휴대폰양식 확인, 알맞은 이메일 양식확인
    return (
        <form className='signup-form'>
            <fieldset className='signup-fieldset'>
                <Input
                    onChange={onChangeInput}
                    name='username'
                    id='username'
                    labelTitle='Username'
                    type='text'
                    maxLength={20}
                />

                <Input
                    onChange={onChangeInput}
                    name='password'
                    id='password'
                    labelTitle='Password'
                    type='password'
                    maxLength={40}
                />

                <Input
                    onChange={onChangeInput}
                    name='passwordCheck'
                    id='passwordCheck'
                    labelTitle='Password Check'
                    type='password'
                    maxLength={40}
                />

                {/* Name */}
                <div className='name-box'>
                    <Input
                        onChange={onChangeInput}
                        name='firstname'
                        id='firstname'
                        labelTitle='First Name'
                        type='text'
                        maxLength={40}
                    />

                    <Input
                        onChange={onChangeInput}
                        name='lastname'
                        id='lastname'
                        labelTitle='Last Name'
                        type='text'
                        maxLength={40}
                    />
                </div>

                {/* DOB */}

                <div className='dob-box'>
                    <Input
                        onChange={onChangeInput}
                        name='dobYear'
                        id='dobYear'
                        labelTitle='Year'
                        type='text'
                        maxLength={4}
                    />

                    <SelectOption
                        onChange={onChangeInput}
                        name='dobMonth'
                        id='dobMonth'
                        labelTitle='Month'
                        optionArray={['Month', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                    />

                    <Input
                        onChange={onChangeInput}
                        name='dobDate'
                        id='dobDate'
                        labelTitle='Day'
                        type='text'
                        maxLength={2}
                    />
                </div>

                <Input
                    onChange={onChangeInput}
                    name='tel'
                    id='tel'
                    labelTitle='Telephone'
                    type='tel'
                    maxLength={11}
                />

                <Input
                    onChange={onChangeCheck}
                    name='isAdmin'
                    id='isAdmin'
                    labelTitle='Is Admin'
                    type='checkbox'
                />

                <div className='btn-area'>
                    <button type="button" onClick={callSignUpAPI} className='btn_primary'>Sign Up</button>
                </div>
            </fieldset>
        </form>
    )
}