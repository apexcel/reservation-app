import { isEmpty } from './utils.ts'

interface TableHead {
    name: string,
    field: string
}

interface DBValues {
    time: number,
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
    return dataList.map((el, idx) => {
        return (isEmpty(el.booked_data)) ? emptyTableBody : JSON.parse(el.booked_data);
    });
}