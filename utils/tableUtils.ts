import { isEmpty } from './utils.ts'
import moment from 'moment'

interface TableHead {
    name: string,
    field: string
}

interface DBValues {
    time_stamp: string,
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
    let list = [];
    for (let i = 0; i < 10; i += 1) {
        list[i] = emptyTableBody;
    }

    for (let j = 0; j <dataList.length; j += 1) {
        if (!isEmpty(dataList[j])) {
            const time = parseInt(dataList[j].time_stamp.split(':')[1]) % 12;
            list[time - 1] = JSON.parse(dataList[j].booked_data);
        }
    }
    return list;
}