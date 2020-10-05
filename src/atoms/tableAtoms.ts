import { atom } from 'recoil';

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