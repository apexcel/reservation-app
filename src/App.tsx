import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Redirect, Switch } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

// custom
import { userStateAtom } from 'Atoms/globalAtoms.ts'
import { isEmpty } from 'Utils/utils.ts'
import { setCookie, getCookie, deleteCookie } from 'Utils/browserUtils.ts'
import { useInterval } from 'Reducers/useInterval.ts'
import RestrictedRoute from 'Components/RestrictedRoute.tsx'
import Loading from 'Components/Loading.tsx'

// pages
import Header from './pages/layout/Header.tsx'
import Footer from './pages/layout/Footer.tsx'
import Profile from './pages/user/Profile.tsx'
import Main from './pages/Main.tsx'
import SignIn from './pages/SignIn.tsx'
import Admin from './pages/admin/Admin.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import KakaoDevApp from './pages/KakaoDevApp.tsx'

// styles
import 'Styles/App.scss'
import 'Styles/Common.scss'

// constants
const kakaoSDK = 'https://developers.kakao.com/sdk/js/kakao.js';
const jsKey = 'ea144ad47a8a64a6e0b341fbc81d29f5';

async function addKakaoScript() {
    const script = document.createElement('script');
    script.id = 'kakao-sdk';
    script.src = kakaoSDK;
    script.async = true;
    document.body.append(script);
    globalThis.Kakao.init(jsKey);
    console.log('Kakao SDK Init:', globalThis.Kakao.isInitialized());
}

export default function App() {
    const [userState, setUserState] = useRecoilState(userStateAtom)
    const [isLogin, setIsLogin] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true);
        if (!globalThis.Kakao) {
            addKakaoScript();
        }
        else {
            if (!globalThis.Kakao.isInitialized()) {
                globalThis.Kakao.init('ea144ad47a8a64a6e0b341fbc81d29f5')
                console.log('Kakao SDK Init:', globalThis.Kakao.isInitialized())
            }
        }
        setIsLoading(false);
    });

    // TODO: 쿠키 이용 및 세션을 통한 로그인 검증
    const probeUserCookie = () => {
        const userCookie = getCookie('userToken');
        console.log(isEmpty(userCookie))
        if (!isEmpty(userCookie)) {
            const token = jwtDecode(userCookie);
            const isExpired = new Date(token.exp * 1000) < new Date();
            if (!isExpired) {
                setIsLogin(true);
                setUserState(token);
            }
            else {
                alert("세션이 만료되었습니다.");
                setIsLogin(false);
                deleteCookie('userToken');
                globalThis.location.replace('/');
            }
        }
        else {
            setIsLogin(false);
            deleteCookie('userToken');
        }
        return;
    };

    return (
        <>
            {isLoading ? <Loading /> :
                <>
                    {isLogin ? <Header setIsLogin={setIsLogin} userState={userState} /> : null}
                    <div className='container'>
                        <Switch>
                            <RestrictedRoute
                                path='/'
                                exact
                                component={<Main />}
                                fallback={<SignIn setIsLogin={setIsLogin} adminLogin={false} />}
                                isAllow={isLogin}
                            />
                            <RestrictedRoute
                                path='/admin'
                                component={<Admin />}
                                fallback={<SignIn setIsLogin={setIsLogin} adminLogin={true} />}
                                isAllow={isLogin === true && userState.isAdmin === true}
                            />
                            <RestrictedRoute
                                path='/profile'
                                component={<Profile userState={userState} />}
                                fallback={<ErrorPage httpStatus={401} />}
                                isAllow={isLogin}
                            />
                            <RestrictedRoute
                                path='/kakao-devapp'
                                component={<KakaoDevApp />}
                                fallback={<Main />}
                                isAllow={true}
                            />
                            <Redirect to='/' />
                        </Switch>
                    </div>
                    <Footer />
                </>
            }
        </>
    )
}