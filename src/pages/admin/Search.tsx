import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import useInput from 'Reducers/useInput.ts';
import UserApi from 'Api/UserApi.ts';
import { setCookie, getCookie, deleteCookie } from 'Utils/browserUtils.ts';


import Input from 'Components/modal/Input.tsx';
import Searched from './Searched.tsx';

import 'Styles/search.scss';

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
                    UserApi.getAllUserInfo(getCookie('userToken')).then(resp => {
                        if (isMounted) setUserList(resp.data);
                    });
                }
            }
        }
        return () => {
            isMounted = false;
        };
    }, []);

    const onSearch = (ev) => {
        ev.preventDefault();
        setNameForSearch(searchName.name);
        history.push(`/admin/search/finduser/${searchName.name}`, getCookie('userToken'));
        searchName.name = '';
        return;
    };

    const onClickUserList = (ev, name) => {
        ev.preventDefault();
        setNameForSearch(name);
        history.push(`/admin/search/finduser/${name}`, getCookie('userToken'));
        searchName.name = '';
        return;
    };

    const renderUserList = () => {
        return userList.map((el, idx) => {
            const _onClick = (ev: React.MouseEvent , name = el.fullname) => {
                ev.preventDefault();
                onClickUserList.call(this, ev, name);
            };

            return (<div className='user-list-container' onClick={_onClick} key={idx}>
                <div>{el.fullname}</div>
                <div>{el.username}</div>
                <div>{el.tel}</div>
            </div>);
        });
    };

    return (
        <div>
            <div>
                <Input labelTitle='Search User name' onChange={onChangeInput} id='name' name='name' type='text' maxLength={20} />
                <button type='button' onClick={onSearch}>Search</button>
            </div>
            <div>
                <Switch>
                    <Route path='/admin/search/finduser/:name' component={Searched} />
                </Switch>
                {(searchName.name === '' && history.location.pathname === '/admin/search') ? renderUserList() : ''}
            </div>
        </div>
    );
}