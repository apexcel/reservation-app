import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import {maxDateAtom} from './calendarAtoms';
import { tableHeadStateAtom, tableBodyStateAtom } from './tableAtoms';

export const userInfoAtom = atom({
    key: 'userInfoAtom',
    default: {}
});

export const currentBookedList = atom({
    key: 'currentBookedList',
    default: []
})

export const getBookedList = selector({
    key: 'getBookedList',
    get: ({ get }) => {
    }
})