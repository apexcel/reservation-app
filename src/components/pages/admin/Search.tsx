import React, { useEffect, useState } from 'react'
import { Route, Switch, Link, useHistory } from 'react-router-dom'
import useInput from '../../../reducer/useInput.ts'
import Input from '../../modal/Input.tsx'
import Searched from './Searched.tsx'

export default function Search() {

    const [searchFor, onChangeInput] = useInput({name: ''});
    const [sname, SetsName] = useState('');
    const history = useHistory();

    useEffect(() => {
        console.log(sname)
    })

    const onSearch = (ev) => {
        ev.preventDefault();
        SetsName(searchFor.name)
    }

    return (
        <div>
            <div>
                <Input labelTitle='Search User name' onChange={onChangeInput} id='name' name='name' type='text' maxLength={20}/>
                <button type='button' onClick={onSearch}>Search</button>
            </div>
            <Searched username={sname} />
        </div>
    )
}