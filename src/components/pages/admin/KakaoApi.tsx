import React, { useEffect, useState } from 'react'
import AdminApi from '../../../utils/api/AdminApi';
import { autoComplete } from '../../../utils/autoComplete.ts'
import { debounce } from '../../../utils/utils.ts'

import '../../../styles/kakaoapi.scss'

export default function KakaoAPI() {
    const Kakao = globalThis.Kakao;

    const [accessCode, setAccessCode] = useState('');
    const [friendsList, setFriendsList] = useState([]);
    const [friendsNameList, setFriendsNameList] = useState([]);
    const [testList, setTestList] = useState([
        '김명수', '김동제', '이익순', '이동익', '최강서', '함익병', '박명수'
    ]);
    const [searchWord, setSearchWord] = useState('');

    useEffect(() => {
        if (globalThis.location.search.length > 0) {
            getCode();
            if (accessCode.length > 0 && !Kakao.Auth.getAccessToken()) {
                getKakaoAuthToken()
            }
        }
    })

    useEffect(() => {
        autoComplete(document.getElementById('ipt'), friendsNameList)
    }, [searchWord])

    const getCode = () => {
        const { search } = globalThis.location;
        const index = search.indexOf('=');
        const code = search.slice(index + 1);
        setAccessCode(code)
        return code;
    };

    const getKakaoAuthCode = async () => {
        Kakao.Auth.authorize({
            redirectUri: 'http://localhost:3001/admin/kakao-api',
            scope: 'profile, birthday, talk_message, friends',
        });
        return;
    };

    const getKakaoAuthToken = async () => {
        const res = await AdminApi.getKakaoAccessToken({ code: accessCode });
        Kakao.Auth.setAccessToken(res.data.access_token)
        return;
    }

    const getKakaoFriendsList = () => {
        Kakao.API.request({
            url: '/v1/api/talk/friends',
            success: function (response) {
                const friendNames = response.elements.map(el => el.profile_nickname)
                setFriendsList(response.elements)
                setFriendsNameList(friendNames)
                console.log(response);
            },
            fail: function (error) {
                console.log(error);
            }
        });
    }

    const kakaoLogOut = () => {
        Kakao.Auth.logout(function () {
            console.log(Kakao.Auth.getAccessToken());
        });
    }

    const renderFriendsList = () => {
        return friendsList.map((el, idx) =>
            <div key={idx}>
                <div>{el.profile_nickname}</div>
            </div>
        );
    }

    const onChangeSearch = (ev) => {
        ev.preventDefault();
        const { value } = ev.target;
        setSearchWord(value);
    }

    const onKeyDown = (ev) => {
        if (ev.key === 'ArrowDown') {
            console.log(ev.target)
        }
        else if (ev.key === 'ArrowUp') {
            console.log(ev)
        }
    }

    return (
        <div>
            <div onClick={getKakaoAuthCode}>
                <img
                    src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
                    width="222"
                />
            </div>
            <div onClick={kakaoLogOut}>
                로그아웃
            </div>
            <div onClick={getKakaoFriendsList}>
                카카오에서 친구목록 가져오기
            </div>
            {friendsList.length > 0 ? renderFriendsList() : '친구목록 없음'}
            <input id='ipt' onChange={onChangeSearch} type='text' />
            <div id='list'>

            </div>
        </div>
    )
}