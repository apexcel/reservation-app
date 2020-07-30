export function isEmpty<T>(obj: T) {
    if (obj === null || obj === undefined || obj.toString() === '' || 
        (obj !== null && typeof obj === 'object' && !Object.keys(obj).length) ||
        (typeof obj === 'function' && !obj.length)) {
        return true
    }
    return false
}

export function replacer<T>(key: T, value: T) {
    if (value === undefined) {
        return null;
    }
    return value;
}