import React, { useEffect, useState } from 'react'
import AdminApi from '../../../utils/api/AdminApi';

export default function KakaoAPI() {
    const Kakao = globalThis.Kakao;

    const [accessCode, setAccessCode] = useState('');
    const [tokenData, setTokenData] = useState({})

    useEffect(() => {
        if (globalThis.location.search.length > 0) {
            getCode();
            if (accessCode.length > 0 && !Kakao.Auth.getAccessToken()) {
                getKakaoAuthToken()
            }
        }
    })

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

    return (
        <div>
            <div onClick={getKakaoAuthCode}>
                <img
                    src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
                    width="222"
                />
            </div>
            <div onClick={kakaoLogOut}>
                Logout
            </div>
            <div onClick={getKakaoFriendsList}>
                getKakaoFriendsList
            </div>
        </div>
    )
}