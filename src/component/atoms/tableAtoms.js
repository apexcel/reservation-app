import { atom, atomFamily, selector } from 'recoil'
import {userInfoAtom} from './globalAtoms'

export const tableHeadStateAtom = atom({
    key: 'tableHeadStateAtom',
    default: [{
        name: "",
        field: ""
    }]
});

export const tableBodyStateAtom = atom({
    key: 'tableBodyStateAtom',
    default: [{}]
});

export const selectedTableRowItem = atom({
    key: 'selectedTableRowItem',
    default: {
        index: 0,
        field: ""
    }
});

export const filterdTableBodyState = selector({
    key: 'filterdTableBodyState',
    default: {},
    get: ({ get }) => {
        const tableBodyState = get(tableBodyStateAtom);
        const selected = get(selectedTableRowItem);
        return tableBodyState[selected.index][selected.field];
    },
})