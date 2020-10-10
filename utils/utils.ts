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

export function formattedDateString(date: Date) {
    let yy = date.getFullYear();
    let mm = '' + (date.getMonth() + 1);
    let dd = '' + date.getDate();

    if (mm.length < 2) mm = '0' + mm;
    if (dd.length < 2) dd = '0' + dd;

    return [yy, mm, dd].join('-');
}

export function debounce(callback: Function, wait: number) {
    let onDebounce;
    return function () {
        clearTimeout(onDebounce);
        onDebounce = setTimeout(() => {
            callback.apply(this, arguments);
        }, wait);
    }
}

export function throttle(callback: Function, wait: number) {
    let onThrottle;
    return function () {
        if (!onThrottle) {
            callback(arguments)
            onThrottle = true;
            onThrottle = setTimeout(() => {
                onThrottle = false;
            }, wait)
        }
    }
}