import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import useInput from '../../../reducer/useInput.ts'
import UserApi from '../../../utils/api/UserApi'

import Input from '../../modal/Input.tsx'
import Searched from './Searched.tsx'

import '../../../styles/search.scss'

export default function Search() {

    const [searchName, onChangeInput] = useInput({ name: '' });
    const [nameForSearch, setNameForSearch] = useState('');
    const [userList, setUserList] = useState([]);
    const history = useHistory();

    useEffect(() => {
        // Mounted 되었을 경우 re-rendering 하지 않도록 함
        let isMounted = true;
        if (history.location.pathname === '/admin/search') {
            if (!(userList.length > 0)) {
                if (isMounted) {
                    UserApi.getAllUserInfo().then(resp => {
                        if (isMounted) setUserList(resp.data);
                    });
                }
            }
        }
        return () => {
            isMounted = false;
        }
    }, [])

    const onSearch = (ev) => {
        ev.preventDefault();
        setNameForSearch(searchName.name)
        history.push(`/admin/search/getuser/${searchName.name}`)
        searchName.name = '';
    }

    const onClickUserList = (ev, name) => {
        ev.preventDefault()
        console.log(name)
    };

    const renderUserList = () => {

        return userList.map((el, idx) => {

            const _onClick = (ev: React.MouseEvent , name = el.fullname) => {
                ev.preventDefault();
                onClickUserList.call(this, ev, name)
            }

            return (<div className='user-list-container' onClick={_onClick} key={idx}>
                <div>{el.fullname}</div>
                <div>{el.username}</div>
                <div>{el.tel}</div>
            </div>);
        })
    };

    return (
        <div>
            <div>
                <Input labelTitle='Search User name' onChange={onChangeInput} id='name' name='name' type='text' maxLength={20} />
                <button type='button' onClick={onSearch}>Search</button>
            </div>
            <div>
                <Switch>
                    <Route path='/admin/search/getuser/:name' component={Searched} />
                </Switch>
                {(searchName.name === '' && history.location.pathname === '/admin/search') ? renderUserList() : ''}
            </div>
        </div>
    )
}