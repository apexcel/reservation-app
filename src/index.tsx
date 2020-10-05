import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import 'core-js';
import App from './App.tsx';

ReactDOM.render(
    <BrowserRouter>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </BrowserRouter>
    , document.getElementById('root'));