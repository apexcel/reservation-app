import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

export const baseURLAtom = atom({
    key: 'baseURL',
    default: "http://localhost:9000"
})

export const userStateAtom = atom({
    key: 'userStateAtom',
    default: {}
});

export const currentSelectedDateAtom = atom({
    key: 'currentSelectedDateAtom',
    default: new Date()
})

export const getTableHeadersEachDay = selector({
    key: 'getTableHeadersEachDay',
    get: ({ get }) => {
        const currentSelectedDate = get(currentSelectedDateAtom);
        switch (currentSelectedDate.getDay()) {
            case 0:
                return [
                    { name: "현영", field: "hyun" },
                ];
            case 1:
                return [];
            case 2:
                return [
                    { name: "소정", field: "so" },
                    { name: "상정", field: "jung", range: [0, 5] }
                ];
            case 3:
                return [
                    { name: "소정", field: "so" },
                ];
            case 4:
                return [
                    { name: "소정", field: "so" },
                    { name: "현영", field: "hyun" },
                    { name: "상정", field: "jung" },
                ];
            case 5:
                return [
                    { name: "소정", field: "so", range: [5, 10] },
                    { name: "현영", field: "hyun" },
                ];
            case 6:
                return [
                    { name: "소정", field: "so", range: [5, 10] },
                    { name: "상정", field: "jung" }
                ];
            default:
                return [];
        }
    }
})