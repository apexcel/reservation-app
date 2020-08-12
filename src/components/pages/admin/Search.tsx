import React, { useEffect, useState } from 'react'
import { Route, Switch, Link, useHistory } from 'react-router-dom'
import useInput from '../../../reducer/useInput.ts'
import Input from '../../modal/Input.tsx'
import Searched from './Searched.tsx'

export default function Search() {

    const [searchName, onChangeInput] = useInput({name: ''});
    const [nameForSearch, setNameForSearch] = useState('');
    const history = useHistory();

    useEffect(() => {
        console.log(nameForSearch)
    })

    const onSearch = (ev) => {
        ev.preventDefault();
        setNameForSearch(searchName.name)
    }

    return (
        <div>
            <div>
                <Input labelTitle='Search User name' onChange={onChangeInput} id='name' name='name' type='text' maxLength={20}/>
                <button type='button' onClick={onSearch}>Search</button>
            </div>
            <Searched username={nameForSearch} />
        </div>
    )
}