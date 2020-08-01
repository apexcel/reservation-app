export function isEmpty(obj) {
    if (obj === null || obj === undefined || obj.toString() === '' || 
        (obj !== null && typeof obj === 'object' && !Object.keys(obj).length) ||
        (typeof obj === 'function' && !obj.length)) {
        return true
    }
    return false
}

export function replacer(key, value) {
    if (value === undefined) {
        return null;
    }
    return value;
}