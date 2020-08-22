import React, { useState, useEffect, useReducer } from 'react'
import { atom, useRecoilState } from 'recoil'
import { BrowserRouter as Router, Route, Link, Switch, Redirect, useHistory } from 'react-router-dom'
import { userStateAtom } from '../atoms/globalAtoms.ts'
import { isEmpty } from '../utils/utils.ts'
import jwtDecode from 'jwt-decode'

import Header from './pages/Header.tsx'
import Footer from './pages/Footer.tsx'
import Profile from './pages/user/Profile.tsx'
import Main from './pages/Main.tsx'
import SignIn from './pages/SignIn.tsx'
import Admin from './pages/admin/Admin.tsx'
import ErrorPage from './pages/ErrorPage.tsx'

// styles
import '../styles/layout.scss'

export default function App() {
    const [userState, setUserState] = useRecoilState(userStateAtom)
    const [isLogin, setIsLogin] = useState(false)

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
            {isLogin ? <Header setIsLogin={setIsLogin} userState={userState} /> : null}
                <div className='container'>
                    <Switch>
                        <Route exact path='/' component={IndexPage} />
                        <Route path='/profile' component={ProfilePage} />
                        <Route path='/admin' component={AdminPage} />
                        <Route render={() => <ErrorPage httpStatus={404}/>} />
                    </Switch>
                </div>
            <Footer />
        </>
    )
}