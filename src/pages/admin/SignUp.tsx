import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { baseURLAtom } from 'Atoms/globalAtoms.ts';
import useInput from 'Reducers/useInput.ts';
import UserApi from '@/api/UserApi.ts';

import Input from 'Components/modal/Input.tsx';
import SelectOption from 'Components/modal/SelectOption.tsx';

import 'Styles/signup.scss';
import { getCookie } from 'Utils/browserUtils.ts';

export default function SignUp(): React.ReactElement {

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
        isAdmin: false
    };

    const [signUpForm, onChangeInput, onChangeCheck] = useInput(initForm);
    const baseURL = useRecoilValue(baseURLAtom);

    useEffect(() => {
        console.log(signUpForm);
    });

    const signUp = async (ev: React.MouseEvent) => {
        ev.preventDefault();
        const data = {
            username: signUpForm.username,
            password: signUpForm.password,
            fullname: signUpForm.lastname + signUpForm.firstname,
            dob: new Date(signUpForm.dobYear, signUpForm.dobMonth - 1, signUpForm.dobDate),
            tel: signUpForm.tel,
            isAdmin: signUpForm.isAdmin
        };
        const userRole = signUpForm.isAdmin ? 'Admin' : '일반회원';

        await UserApi.signUp(getCookie('userToken'), data).then(res => console.log(res));
        alert(`${signUpForm.lastname}${signUpForm.firstname}의 ${userRole} 등록이 되었습니다.`);
        globalThis.location.replace(`/admin`);
        return;
    };


    const isSamePassword = () => {
        if (signUpForm.password === signUpForm.passwordCheck) return true;
        return false;
    };

    //TODO: 아이디 중복 확인 하기, 비밀번호 2중 확인 일치, 생년월일 제대로된 입력인지 확인
    // 휴대폰양식 확인, 알맞은 이메일 양식확인
    return (
        <form className='signup-form'>
            <fieldset className='signup-fieldset'>
                <label htmlFor='username'>Username</label>
                <Input
                    className='common__input'
                    onChange={onChangeInput}
                    name='username'
                    id='username'
                    type='text'
                    maxLength={20}
                />

                <label htmlFor='password'>Password</label>
                <Input
                    className='common__input'
                    onChange={onChangeInput}
                    name='password'
                    id='password'
                    type='password'
                    maxLength={40}
                />

                <label htmlFor='passwordCheck'>Password Check</label>
                <Input
                    className='common__input'
                    onChange={onChangeInput}
                    name='passwordCheck'
                    id='passwordCheck'
                    type='password'
                    maxLength={40}
                />

                {/* Name */}
                <div className='name-box'>

                    <label htmlFor='firstname'>First Name</label>
                    <Input
                        className='common__input'
                        onChange={onChangeInput}
                        name='firstname'
                        id='firstname'
                        type='text'
                        maxLength={40}
                    />

                    <label htmlFor='lastname'>Last Name</label>
                    <Input
                        className='common__input'
                        onChange={onChangeInput}
                        name='lastname'
                        id='lastname'
                        type='text'
                        maxLength={40}
                    />
                </div>

                {/* DOB */}
                <label htmlFor='dobYear'>Year</label>
                <div className='dob-box'>
                    <Input
                        className='common__input'
                        onChange={onChangeInput}
                        name='dobYear'
                        id='dobYear'
                        type='text'
                        maxLength={4}
                    />

                    <label htmlFor='dobMonth'>Month</label>
                    <SelectOption
                        className='common__select'
                        onChange={onChangeInput}
                        name='dobMonth'
                        id='dobMonth'
                        optionArray={['Month', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                    />

                    <label htmlFor='dobDate'>Date</label>
                    <Input
                        className='common__input'
                        onChange={onChangeInput}
                        name='dobDate'
                        id='dobDate'
                        type='text'
                        maxLength={2}
                    />
                </div>

                <label htmlFor='tel'>Tel</label>
                <Input
                    className='common__input'
                    onChange={onChangeInput}
                    name='tel'
                    id='tel'
                    type='tel'
                    maxLength={11}
                />

                <label htmlFor='isAdmin'>Is Admin</label>
                <Input
                    className='common__input'
                    onChange={onChangeCheck}
                    name='isAdmin'
                    id='isAdmin'
                    type='checkbox'
                />

                <div className='btn-area'>
                    <button type="button" onClick={signUp} className='btn_primary'>Sign Up</button>
                </div>
            </fieldset>
        </form>
    );
}