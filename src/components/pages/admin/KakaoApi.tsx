import React, { useEffect, useState, useRef } from 'react'
import { autoComplete } from '../../../utils/autoComplete.ts'
import useInput from '../../../reducer/useInput.ts'
import AdminApi from '../../../utils/api/AdminApi';
import Input from '../../modal/Input.tsx'

import '../../../styles/kakaoapi.scss'

const initForm = {
    friendName: '',
    date: '',
    time: '',
    message: ''
}

export default function KakaoAPI() {
    const Kakao = globalThis.Kakao;

    const [accessCode, setAccessCode] = useState('');
    const [friendsList, setFriendsList] = useState([]);
    const [friendsNameList, setFriendsNameList] = useState([]);
    const [msgList, setMsgList] = useState([])
    const [searchWord, setSearchWord] = useState('');
    const test = ['김동익', '김말순', '김제인', '김말숙', '김제제', '김지지']

    const [messageForm, onChangeInput] = useInput(initForm);

    useEffect(() => {
        let isMounted = false;
        if (globalThis.location.search.length > 0) {
            getCode();
            if (accessCode.length > 0 && !Kakao.Auth.getAccessToken()) {
                getKakaoAuthToken()
            }
        }
        if (!isMounted) {
            autoComplete(document.getElementById('friendName'), test)
        }
        isMounted = true;
    }, [])
    
    useEffect(() => {
        console.log(messageForm)
    })
    
    useEffect(() => {
    }, [messageForm])

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

    const setBookingMessage = (ev) => {
        ev.preventDefault();
        setMsgList([...msgList, messageForm])
    }

    const renderMsgList = () => {
        function delMsg() {

        }

        return msgList.map((el, idx) => 
            <div key={idx}>
                {el.friendName}
                {el.date}
                {el.time}
                {el.message}
                <div onClick={delMsg}>삭제</div>
            </div>
        )
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
            친구 찾기
            {/* <input ref={ref} id='search-kakao-friends' onChange={onChangeSearch} type='text' /> */}
            <Input id='friendName' name='friendName' onChange={onChangeInput} type='text' />
            <Input id='date' name='date' onChange={onChangeInput} type='date' />
            <Input id='time' name='time' onChange={onChangeInput} type='time' />
            <textarea id='message' name='message' onChange={onChangeInput} rows={5} cols={40} maxLength={200} />
            <button onClick={setBookingMessage} type='button'>발송 예약 하기</button>
            <div id='list'>
                {renderMsgList()}
            </div>
        </div>
    )
}