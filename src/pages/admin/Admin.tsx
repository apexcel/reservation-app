import React from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import Search from './Search.tsx';
import SignUp from './SignUp.tsx';
import KakaoAPI from './KakaoApi.tsx';

import 'Styles/Admin.scss';

export default function Admin() {

    const className = 'admin__page';

    return (
        <div className={`${className}-container`}>
            <section className={`${className}-section`}>
                <Switch>
                    <Route path='/admin/signup' component={() => <SignUp />} />
                    <Route path='/admin/search' component={() => <Search />} />
                    <Route path='/admin/kakao-api' component={() => <KakaoAPI />} />
                </Switch>
            </section>
        </div>
    );
}