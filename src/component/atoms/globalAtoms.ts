import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

export const baseURL = atom({
    key: 'baseURL',
    default: "http://localhost:9000"
})

export const userInfoAtom = atom({
    key: 'userInfoAtom',
    default: {}
});
