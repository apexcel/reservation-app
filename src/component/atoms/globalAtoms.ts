import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

export const baseURLAtom = atom({
    key: 'baseURL',
    default: "http://localhost:9000"
})

export const userInfoAtom = atom({
    key: 'userInfoAtom',
    default: {}
});