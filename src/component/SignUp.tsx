import React, { useRef, useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import useInput from '../reducer/useInput.ts'

import '../styles/common.scss'
import '../styles/signup.scss'

export default function SignUp() {

    const initForm = {
        id: '',
        pw: '',
        pw_check: '',
        first_name: '',
        last_name: '',
        dob: '',
        tel: '',
    }

    const [signUpForm, onChangeInput, reset] = useInput(initForm)

    useEffect(() => {
        console.log(signUpForm)
    })


    const onSignUp = (e) => {
        e.preventDefault();
        try {
            const firstEmptyItem = Object.values(signUpForm).map(el => el !== '');
            firstEmptyItem.map((el, idx) => {
                let classList = document.getElementById(Object.keys(signUpForm)[idx]).classList;
                el ? (classList.remove("empty-warn")): (classList.add("empty-warn"));
            });
            // axios.post('http://localhost:9000/api/signup', signUpForm).then(res => console.log(res))
        }
        catch (err) {
            // redirect 503 error page;
            throw err;
        }
    }

    const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((el, idx) =>
        <option key={idx}>{el}</option>
    )

    //TODO: 아이디 중복 확인 하기, 비밀번호 2중 확인 일치, 생년월일 제대로된 입력인지 확인
    // 휴대폰양식 확인, 알맞은 이메일 양식확인
    return (
        <form className='signup-form'>
            <fieldset className='signup-fieldset'>
                <div className='input-box'>
                    <h3><label htmlFor='id'>Username</label></h3>
                    <input className='form-input' onChange={onChangeInput} id='id' type='text' name='id' maxLength={20} />
                </div>

                <div className='input-box'>
                    <h3><label htmlFor='pw'>Password</label></h3>
                    <input className='form-input' onChange={onChangeInput} id='pw' type='password' name='pw' maxLength={20} />
                </div>

                <div className='input-box'>
                    <h3><label htmlFor='pw_check'>Password Check</label></h3>
                    <input className='form-input' onChange={onChangeInput} id='pw_check' type='password' name='pw_check' maxLength={20} />
                </div>

                <div className='input-box'>
                    <h3><label htmlFor='first_name'>First Name</label></h3>
                    <input className='form-input' onChange={onChangeInput} id='first_name' type='text' name='first_name' maxLength={40} />
                </div>

                <div className='input-box'>
                    <h3><label htmlFor='last_name'>Last Name</label></h3>
                    <input className='form-input' onChange={onChangeInput} id='last_name' type='text' name='last_name' maxLength={40} />
                </div>

                <div className='input-box'>
                    <h3><label htmlFor='dob'>Day of Birth</label></h3>
                    <input className='form-input' onChange={onChangeInput} id='dob' type='date' name='dob' maxLength={6} />
                </div>

                <div className='input-box'>
                    <h3><label htmlFor='tel'>Tel</label></h3>
                    <input className='form-input' onChange={onChangeInput} id='tel' type='tel' name='tel' maxLength={16} />
                </div>

                <div className='btn_area'><button type="button" onClick={onSignUp} className='btn_primary'>Sign Up</button></div>
            </fieldset>
        </form>
    )
}