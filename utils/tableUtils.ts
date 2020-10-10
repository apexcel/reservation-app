import { isEmpty } from './utils.ts'

interface TableHead {
    name: string,
    field: string
}

interface DBValues {
    time_stamp: Date,
    booked_data: string | null | undefined
}

export function createEmptyTableRow(tableHeadState: TableHead[]) {
    let obj = {};
    for (let i = 0; i < tableHeadState.length; i += 1) {
        const fieldName = tableHeadState[i].field;
        Object.defineProperty(obj, fieldName, {
            value: "",
            writable: true,
            enumerable: true
        });
    }
    return obj;
}

export function fulfillEmptyObject(dataList: Array<DBValues>, emptyTableBody: object) {
    let list = Array(10);
    for (let i = 0; i < 10; i += 1) {
        isEmpty(dataList[i]?.booked_data) ? list.push(emptyTableBody) : list.push(JSON.parse(dataList[i].booked_data));
    }
    return list;
}