import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'

export const tableBodyStateAtom = atom({
    key: 'tableState',
    default: []
});

export const tableHeadStateAtom = atom({
    key: 'tableHeadStateAtom',
    default: []
});

export const bookedUser = selector({
    key: 'bookedUser',
    get: ({ get }) => {
        const table = useRecoilValue(table)
    }
})