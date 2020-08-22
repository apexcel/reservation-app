import React, { useEffect, useState } from 'react'
import UserApi from '../../utils/api/UserApi'

export default function KakaoDevApp() {

    const Kakao = globalThis.Kakao;
    const [accessCode, setAccessCode] = useState('');
    const [tokenData, setTokenData] = useState({})

    useEffect(() => {
        if (globalThis.location.search.length > 0) {
            getCode();
            if (accessCode.length > 0 && (accessCode !== getCode())) {
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

    const getKakaoAuthToken = async () => {
        const res = await UserApi.getKakaoAccessToken({ code: accessCode });
        Kakao.Auth.setAccessToken(res.data.access_token)
        return;
    }

    const getKakaoAuthCode = async () => {
        if (!Kakao.Auth.getAccessToken()) {
            console.log('Not logged in.');
            Kakao.Auth.authorize({
                redirectUri: 'http://localhost:3001/kakao-devapp',
                scope: 'profile, birthday, talk_message, friends',
            });
        }
        return;
    };

    const getMyProfile = () => {
        Kakao.API.request({
            url: '/v2/user/me',
            success: function (response) {
                console.log(response);
            },
            fail: function (error) {
                console.log(error);
            }
        });
    }

    const unlinkKaKao = () => {
        Kakao.API.request({
            url: '/v1/user/unlink',
            success: function (response) {
                console.log(response);
                setAccessCode('')
                setTokenData({})
                globalThis.location.replace('/kakao-devapp')
            },
            fail: function (error) {
                console.log(error);
                globalThis.location.replace('/kakao-devapp')
            },
        });
    }

    return (
        <>
            KakaoDevApp
            <div onClick={getKakaoAuthCode}>
                <img
                    src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
                    width="222"
                />
            </div>
            <div onClick={getMyProfile}>
                Check
            </div>
            <div onClick={unlinkKaKao}>
                Unlink
            </div>
        </>
    )
}