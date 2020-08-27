import React, { useState, useEffect, useReducer } from 'react'
import { useRecoilState } from 'recoil'
import { Route, Switch } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

// custom import
import { userStateAtom } from '../atoms/globalAtoms.ts'
import { isEmpty } from '../utils/utils.ts'

// pages
import Header from './pages/Header.tsx'
import Footer from './pages/Footer.tsx'
import Profile from './pages/user/Profile.tsx'
import Main from './pages/Main.tsx'
import SignIn from './pages/SignIn.tsx'
import Admin from './pages/admin/Admin.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import KakaoDevApp from './pages/KakaoDevApp.tsx'

// styles
import '../styles/layout.scss'

// constants
const kakaoSDK = 'https://developers.kakao.com/sdk/js/kakao.js';
const jsKey = 'ea144ad47a8a64a6e0b341fbc81d29f5';

async function addScriptTagForKakaoApi() {
    const script = document.createElement('script');
    script.id = 'kakao-sdk'
    script.src = kakaoSDK;
    script.async = true;
    document.body.append(script)
    globalThis.Kakao.init(jsKey)
    console.log('Kakao SDK Init:', globalThis.Kakao.isInitialized())
}

export default function App() {
    const [userState, setUserState] = useRecoilState(userStateAtom)
    const [isLogin, setIsLogin] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        if (!globalThis.Kakao) {
            addScriptTagForKakaoApi()
        }
        else {
            if (!globalThis.Kakao.isInitialized()) {
                globalThis.Kakao.init('ea144ad47a8a64a6e0b341fbc81d29f5')
                console.log('Kakao SDK Init:', globalThis.Kakao.isInitialized())
            }
        }
        setIsLoading(false)
        console.log(globalThis.Kakao)
    })

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (!isEmpty(token)) {
            const decodedUserState = jwtDecode(token);
            const isExpired = new Date(decodedUserState.exp * 1000) < new Date() ? true : false;
            if (isExpired) {
                setIsLogin(false)
                localStorage.clear()
            }
            else {
                setUserState(decodedUserState);
                setIsLogin(true);
            }
        }
        else {
            setIsLogin(false);
        }
    }, [isLogin])

    const IndexPage = () => {
        return isLogin ? <Main /> : <SignIn setIsLogin={setIsLogin} adminLogin={false} />
    }

    const AdminPage = () => {
        return isLogin && userState.isAdmin ? <Admin /> : <SignIn setIsLogin={setIsLogin} adminLogin={true} />
    }

    const ProfilePage = () => {
        return isLogin ? <Profile userState={userState} /> : <ErrorPage httpStatus={401} />
    }

    return (
        <>
            {isLoading ? 'Loading...' :
                <>
                    {isLogin ? <Header setIsLogin={setIsLogin} userState={userState} /> : null}
                    <div className='container'>
                        <Switch>
                            <Route exact path='/' component={IndexPage} />
                            <Route path='/profile' component={ProfilePage} />
                            <Route path='/admin' component={AdminPage} />
                            <Route path='/kakao-devapp' component={() => <KakaoDevApp />} />
                            <Route render={() => <ErrorPage httpStatus={404} />} />
                        </Switch>
                    </div>
                    <Footer />
                </>
            }
        </>
    )
}