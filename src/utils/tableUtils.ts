interface TableBody {
    name: string,
    field: string
}

export function createObjectForTableBody(tableHeadState: TableBody[]) {
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