import React, { useEffect, useState } from 'react'
import UserApi from 'Api/UserApi'

import 'Styles/kakaodevapp.scss'

export default function KakaoDevApp() {

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

    const getKakaoAuthToken = async () => {
        const res = await UserApi.getKakaoAccessToken({ code: accessCode });
        Kakao.Auth.setAccessToken(res.data.access_token)
        return;
    }

    const getKakaoAuthCode = async () => {
        Kakao.Auth.authorize({
            redirectUri: 'http://localhost:3001/kakao-devapp',
            scope: 'profile, birthday, talk_message, friends',
        });
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
                alert('앱 연결이 종료되었습니다.')
                setAccessCode('')
                setTokenData({})
                globalThis.location.replace('/kakao-devapp')
            },
            fail: function (error) {
                console.log(error);
                alert(`Error: ${error}`)
                globalThis.location.replace('/kakao-devapp')
            },
        });
    }

    const renderDevAppDesc = () => {
        return (
            <div className='about-this'>
                <h2>해당 서비스에 관한 안내</h2>
                <article>
                    <div>
                        <h3>무슨 서비스 인가요?</h3>
                        <span>사용자에게 예약 메세지를 보내주기 위한 카카오 API를 이용한 서비스입니다.</span>
                    </div>
                    <div>
                        <h3>동의 항목이 무엇인가요?</h3>
                        <span>
                            서비스 사용 동의사항에 동의를 하게 되면
                            카카오 서비스를 통해 프로필, 생일, 친구목록, 메세지 전송 기능을 사용하게 됩니다.
                        </span>
                    </div>
                    <div>
                        <h3>수집 항목이 있나요?</h3>
                        <span>본 시스템에서는 카카오 API를 통해 얻은 정보를 저장하거나 수집하지 않습니다.</span>
                    </div>
                    <div>
                        <h3>더 이상 사용하고 싶지 않아요</h3>
                        <span>
                            '앱 탈퇴하기' 버튼을 클릭하면 카카오 API를 통해 제공하는 서비스와 연결이 종료됩니다.
                            또는 카카오 계정관리에서 동의 철회 및 앱 연결 종료를 할 수 있습니다.
                            앱 서비스와 해당 페이지에서 제공하는 예약 시스템과 무관하므로
                            회원 탈퇴를 하거나 관리자에게 연락해주시길 바랍니다.
                        </span>
                    </div>
                </article>
            </div>
        )
    }

    return (
        <>
            <h1>KakaoDevApp</h1>
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
            <button className="kakao-api-btn">앱 탈퇴하기</button>
            </div>
            {renderDevAppDesc()}
        </>
    )
}