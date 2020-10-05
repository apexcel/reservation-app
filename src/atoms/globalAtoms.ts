import { atom, selector } from 'recoil';

export const baseURLAtom = atom({
    key: 'baseURL',
    default: "http://localhost:9000"
});

export const userStateAtom = atom({
    key: 'userStateAtom',
    default: {}
});

//TODO: 사용자의 레슨 가능 횟수 파악해서 예약할 때 마다 증가
// 이후 DB에 연동해서 차감
export const userBookedCounter = atom({
    key: 'userBookedCounter',
    default: 0
});

// TODO: 하루당 예약 가능한 횟수 제한하기 2~3 정도
export const userLimitBookedCounter = atom({
    key: 'userLimitBookedCounter',
    default: 0
});

export const currentSelectedDateAtom = atom({
    key: 'currentSelectedDateAtom',
    default: new Date()
});

export const getTableHeadersEachDay = selector({
    key: 'getTableHeadersEachDay',
    get: ({ get }) => {
        const currentSelectedDate = get(currentSelectedDateAtom);
        switch (currentSelectedDate.getDay()) {
            case 0:
                return [
                    { name: "현영", field: "hyun" }
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
                    { name: "소정", field: "so" }
                ];
            case 4:
                return [
                    { name: "소정", field: "so" },
                    { name: "현영", field: "hyun" },
                    { name: "상정", field: "jung" }
                ];
            case 5:
                return [
                    { name: "소정", field: "so", range: [6, 10] },
                    { name: "현영", field: "hyun" }
                ];
            case 6:
                return [
                    { name: "소정", field: "so", range: [6, 10] },
                    { name: "상정", field: "jung" }
                ];
            default:
                return [];
        }
    }
});