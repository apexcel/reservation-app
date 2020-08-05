import React, { useState, useEffect } from 'react'
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'
import { Link, Switch, Route } from 'react-router-dom'
import { baseURLAtom, userInfoAtom } from '../../atoms/globalAtoms.ts'
import useInput from '../../../reducer/useInput.ts'
import axios from 'axios'

const initForm = {
    name: "",
    counter: "",
    start: "",
    end: "",
    price: ""
};

interface SearchedUserProps {
    name: string
}

export default function Enroll() {

    const userState = useRecoilValue(userInfoAtom);
    const baseUrl = useRecoilValue(baseURLAtom);
    const [searchUser, setSearchUser] = useState(null);
    const [val, setVal] = useState()

    useEffect(() => {
        console.log(searchUser)
    })

    const [lessonForm, onChangeInput, reset] = useInput(initForm);

    const onChangeUserName = ev => {
        ev.preventDefault();
        const { value, id } = ev.target;
        setSearchUser({
            [id]: value
        })
    }

    const set = async ev => {
        ev.preventDefault();
        await setVal(searchUser.name);
    }

    function SearchedUser({match}) {
        console.log(match)
        return (
            <>
            </>
        )
    }

    return (
        <>
            <Route path='/:search' component={SearchedUser} />
                <form>
                    <fieldset>
                        <div className='input-box'>
                            <h3><label htmlFor='name'>Search User Name</label></h3>
                            <input className='form-input' onChange={onChangeUserName} id='name' type='text' name='name' maxLength={20} />
                        </div>
                        <button type='button' onClick={set}>con</button>
                        <Link to={`/:${val}`}>cc</Link>
                    </fieldset>
                </form>
            </>
    )
}