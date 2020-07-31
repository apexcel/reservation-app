import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import {maxDateAtom} from './calendarAtoms';
import { tableHeadStateAtom, tableBodyStateAtom } from './tableAtoms';

export const userInfoAtom = atom({
    key: 'userInfoAtom',
    default: {}
});

export const getBookedParamsAtom = atom({
    key: 'getBookedParamsAtom',
    default: new Date(),
})

export const getBookedListSelector = selector({
    key: 'getBookedList',
    get: ({ get }) => {
        const params = get(getBookedParamsAtom);
        const date = getBookedParamsAtom.date;

    }
})