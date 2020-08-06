import React, { useState, useEffect } from 'react'
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'
import { Link, Switch, Route, useHistory } from 'react-router-dom'
import { baseURLAtom, userInfoAtom } from '../../../atoms/globalAtoms.ts'
import axios from 'axios'

export default function SearchUser() {

    const userState = useRecoilValue(userInfoAtom);
    const baseURL = useRecoilValue(baseURLAtom);
    const [searchUser, setSearchUser] = useState(null);

    const history = useHistory()

    const onChangeUserName = ev => {
        ev.preventDefault();
        const { value, id } = ev.target;
        setSearchUser({
            [id]: value
        })
    };

    const onSearchUser = async (ev) => {
        ev.preventDefault();
        await axios.get(`${baseURL}/api/enroll/${searchUser.name}`);
        history.push(`/search/${searchUser.name}`);
    }

    function SearchedUser({ match }) {
        console.log(match)
        console.log(match.params)
        return (
            <>
                {match.params.name}
            </>
        )
    }

    return (
        <>
            <Route path='/search/:name' component={SearchedUser} />
            <form>
                <fieldset>
                    <div className='input-box'>
                        <h3><label htmlFor='name'>Search User Name</label></h3>
                        <input className='form-input' onChange={onChangeUserName} id='name' type='text' name='name' maxLength={20} />
                    </div>
                    <button type='button' onClick={onSearchUser}>
                        Search
                    </button>
                </fieldset>
            </form>
        </>
    )
}