import { atom, atomFamily, selector } from 'recoil'

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

export const tableRowStateAtom = (date) => atom({
    key: `tableRowStateAtom-${date}`,
    default: "date"
})