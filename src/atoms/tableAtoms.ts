import { atom, atomFamily, selector } from 'recoil'

export const tableHeadStateAtom = atom({
    key: 'tableHeadStateAtom',
    default: [{
        name: "",
        field: "",
    }]
});

export const tableBodyStateAtom = atom({
    key: 'tableBodyStateAtom',
    default: [{}]
});