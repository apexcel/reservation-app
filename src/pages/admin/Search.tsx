import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import qs from 'qs';

import useInput from 'Reducers/useInput.ts';
import UserApi from 'Api/UserApi.ts';
import { getCookie } from 'Utils/browserUtils.ts';

import Searched from './Searched.tsx';
import SearchInput from '@/components/SearchInput.tsx';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import 'Styles/search.scss';

export default function Search(): React.ReactElement {

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
            history.push(`/admin/search?q=${name ? name : searchName.name}`);
            searchName.name = '';
        }
        return;
    };

    const onClickSearchedItem = (ev, name?) => {
        history.push(`/admin/search/@${name ? name : searchName.name}`, getCookie('userToken'));
        return;
    };

    const renderUserList = (name?: string) => {
        if (name) {
            return userList.map((el, idx) => {
                const _onClick = (ev: React.MouseEvent, fullname = el.fullname) => {
                    ev.preventDefault();
                    onClickSearchedItem.call(this, ev, fullname);
                };
                if (el.fullname === name) {
                    return (
                        <ListItem key={idx} button onClick={_onClick}>
                            <ListItemText primary={el.fullname} secondary={`${el.tel} ${el.username}`} />
                            {/* 가장 최신 레슨권 표시 */}
                        </ListItem>
                    );
                }
                else {
                    return;
                }
            });
        }
        else {
            return userList.map((el, idx) => {
                const _onClick = (ev: React.MouseEvent, fullname = el.fullname) => {
                    ev.preventDefault();
                    onClickSearchedItem.call(this, ev, fullname);
                };
                return (
                    <ListItem key={idx} button onClick={_onClick}>
                        <ListItemText primary={el.fullname} secondary={`${el.tel} ${el.username}`} />
                        {/* 가장 최신 레슨권 표시 */}
                    </ListItem>
                );
            });
        }
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
                    <Route path='/admin/search/@:name' component={Searched} />
                </Switch>
                <List>
                    {history.location.pathname === '/admin/search' && !history.location.search ? renderUserList() : null}
                    {history.location.pathname === '/admin/search' && history.location.search ? renderUserList(qs.parse(history.location.search)['?q'].toString()) : null}
                </List>
            </div>
        </div>
    );
}