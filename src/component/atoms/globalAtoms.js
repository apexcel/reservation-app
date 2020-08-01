import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

export const userInfoAtom = atom({
    key: 'userInfoAtom',
    default: {}
});
