import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Redirect, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

// custom
import { userStateAtom } from 'Atoms/globalAtoms.ts';
import { isEmpty } from 'Utils/utils.ts';
import { getCookie, deleteCookie } from 'Utils/browserUtils.ts';
import { decryptAES } from 'Utils/cryptoUtils.ts';
import { useInterval } from 'Reducers/useInterval.ts';

import UserApi from 'Api/UserApi.ts';
import Loading from 'Components/Loading.tsx';
import RestrictedRoute from 'Components/RestrictedRoute.tsx';

// pages
import Header from './pages/layout/Header.tsx';
import Footer from './pages/layout/Footer.tsx';
import Profile from './pages/user/Profile.tsx';
import Main from './pages/Main.tsx';
import SignIn from './pages/SignIn.tsx';
import Admin from './pages/admin/Admin.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import KakaoDevApp from './pages/KakaoDevApp.tsx';

// styles
import 'Styles/App.scss';
import 'Styles/Common.scss';

async function addKakaoScript() {
    const script = document.createElement('script');
    script.id = 'kakao-sdk';
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    document.body.append(script);
    await globalThis.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
    return;
}

export default function App(): React.ReactElement {
    const [userState, setUserState] = useRecoilState<IObject>(userStateAtom);
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        if (!globalThis.Kakao) {
            addKakaoScript();
        }
        else {
            if (!globalThis.Kakao.isInitialized()) {
                globalThis.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
                console.log('Kakao SDK Init:', globalThis.Kakao.isInitialized());
            }
        }
        setIsLoading(false);
    });

    useEffect(() => {
        probeUserCookie();
    }, []);

    // TODO: 쿠키 이용 및 세션을 통한 로그인 검증
    const probeUserCookie = async () => {
        const userCookie = getCookie('userToken');
        const token = jwtDecode(userCookie);

        if (isEmpty(userState) && !isEmpty(userCookie)) {
            if (decryptAES(token.access_code).username === 'guest' || token.exp > new Date().valueOf()) {
                const id = decryptAES(token.access_code).id;
                const response = await UserApi.getUserInfo(userCookie, id).then(res => res.data.token);
                const userInfo = jwtDecode(response);
                setUserState(userInfo);
                setIsLogin(true);
                return;
            }
            else {
                alert("로그인 정보가 만료되었습니다.");
                setIsLogin(false);
                deleteCookie('userToken');
                globalThis.location.replace('/');
                return;
            }
        }
        return;
    };

    useInterval(() => {
        probeUserCookie();
    }, 1800 * 1000);

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
                                isAllow={(isLogin === true && userState.isAdmin === true)}
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
    );
}