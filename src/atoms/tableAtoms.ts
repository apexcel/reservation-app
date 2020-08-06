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

export const tableRowStateAtom = (date) => atom({
    key: `tableRowStateAtom-${date}`,
    default: "date"
})

export const tableHeadersAtom = atom({
    key: 'tableHeadersAtom',
    default: [
        {
            a: 'a'
        }
    ]
})

export const dayOfWeekHeaderSelector = selector({
    key: 'dayOfWeekHeaderSelector',
    get: ({ get }) => {
        const dayOfWeek = new Date().getDay();
        switch (dayOfWeek) {
            case 0:
                return 
        }
    }
})