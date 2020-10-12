import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import useInput from 'Reducers/useInput.ts';
import UserApi from 'Api/UserApi.ts';
import { setCookie, getCookie, deleteCookie } from 'Utils/browserUtils.ts';


import Input from 'Components/modal/Input.tsx';
import Searched from './Searched.tsx';

import 'Styles/search.scss';
import SearchInput from '@/components/SearchInput.tsx';

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

    const onSearch = (ev: React.MouseEvent<HTMLButtonElement> & React.KeyboardEvent, name?: string) => {
        if (ev.key === 'Enter' || ev.button === 0) {
            ev.preventDefault();
            setNameForSearch(name ? name : searchName.name);
            history.push(`/admin/search/finduser/${name ? name : searchName.name}`, getCookie('userToken'));
            searchName.name = '';
        }
        return;
    };
    
    const renderUserList = () => {
        return userList.map((el, idx) => {
            const _onClick = (ev: React.MouseEvent, name = el.fullname) => {
                ev.preventDefault();
                onSearch.call(this, ev, name);
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
            <SearchInput
                onChange={onChangeInput}
                id='name'
                name='name'
                type='text'
                maxLength={20}
                placeholder='검색어를 입력하세요'
                searchEvent={onSearch}
            />
            <div>
                <Switch>
                    <Route path='/admin/search/finduser/:name' component={Searched} />
                </Switch>
                {(searchName.name === '' && history.location.pathname === '/admin/search') ? renderUserList() : ''}
            </div>
        </div>
    );
}