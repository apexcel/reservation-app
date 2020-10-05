import { debounce } from './utils.ts';

export function consoleLog(data: any, { ...options }) {
    const { color, fontWeight } = options;
    const _emoji = '\u{1F6A7}';
    const _color = color ? color : 'orange';
    const _fontWeight = fontWeight ? fontWeight : 'normal';

    console.log(`${_emoji} %c${data}`,
        `color: ${_color}; 
        font-weight: ${_fontWeight};`);
    return;
}

export function setCookie(name: string, value: any, exprires: number = 1) {
    const now = new Date();
    const exp = new Date(now.valueOf() + exprires * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${exp};path='/';`;
    return;
}

export function getCookie(name: string) {
    const val = document.cookie.match('(^|;)?' + name + '=([^;]*)(;|$)');
    return val ? val[2] : null;
}

export function deleteCookie(name: string) {
    // 쿠키를 삭제하려면 해당 날짜 이전으로 설정하면 됨.
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    return;
}

export function scrollNavigation(className: string) {
    let prevPos = 0;
    globalThis.addEventListener('scroll', debounce(() => {
        const currentPos = document.documentElement.scrollTop;
        const showScrollTopPos = 15;

        if (currentPos < 105) {
            document.body.getElementsByClassName(className)[0].classList.add('top');
            document.body.getElementsByClassName(className)[0].classList.remove('scroll-down');
            return;
        }
        if (Math.abs(prevPos - currentPos) <= showScrollTopPos) {
            document.body.getElementsByClassName(className)[0].classList.remove('scroll-up');
            document.body.getElementsByClassName(className)[0].classList.remove('scroll-down');
            document.body.getElementsByClassName(className)[0].classList.add('top');
            return;
        }
        if (currentPos > prevPos) {
            document.body.getElementsByClassName(className)[0].classList.remove('top');
            document.body.getElementsByClassName(className)[0].classList.remove('scroll-up');
            document.body.getElementsByClassName(className)[0].classList.add('scroll-down');
        }
        else {
            document.body.getElementsByClassName(className)[0].classList.remove('top');
            document.body.getElementsByClassName(className)[0].classList.remove('scroll-down');
            document.body.getElementsByClassName(className)[0].classList.add('scroll-up');
        }
        prevPos = currentPos;
    }, 150))
    return;
}

export function autoComplete(input: HTMLInputElement, arr: Array<String>) {
    let currentFocus;
    input.addEventListener('input', (ev) => {
        destoryAllSuggestList();
        if (!(input.value)) return false;

        currentFocus = -1;
        const listContainer = document.createElement('div');
        listContainer.setAttribute('id', input.id + 'auto-completed-list');
        listContainer.setAttribute('class', 'auto-completed-items')
        input.parentNode.appendChild(listContainer);

        for (let i = 0; i < arr.length; i += 1) {
            if (arr[i].substring(0, input.value.length).toLowerCase() === input.value.toLowerCase()) {
                const suggestItem = document.createElement('div');
                suggestItem.innerHTML = `<strong>${arr[i].substring(0, input.value.length)}</strong>`;
                suggestItem.innerHTML += arr[i].substring(input.value.length)
                suggestItem.innerHTML += `<input type='hidden' value='${arr[i]}' />`;
                suggestItem.addEventListener('click', (ev) => {
                    input.value = suggestItem.getElementsByTagName('input')[0].value;
                    destoryAllSuggestList();
                })
                listContainer.appendChild(suggestItem);
            }
        }
    })

    input.addEventListener('keydown', (ev) => {
        const suggestItem = document.getElementById(input.id + 'auto-completed-list');
        const itemList = suggestItem ? suggestItem.getElementsByTagName('div') : null;

        console.log(itemList)
        if (ev.key === 'ArrowDown') {
            currentFocus += 1;
            addActive(itemList)
        }
        else if (ev.key === 'ArrowUp') {
            currentFocus -= 1;
            addActive(itemList)
        }
        else if (ev.key === 'Enter') {
            ev.preventDefault();
            if (currentFocus > -1) {
                if (suggestItem) {
                    itemList[currentFocus].click();
                }
            }
        }
    })


    function addActive(elem: HTMLCollectionOf<HTMLElement>) {
        if (!elem) return false;
        removeActive(elem);
        if (currentFocus >= elem.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (elem.length - 1);
        elem[currentFocus].classList.add('auto-completed-active');
    }

    function removeActive(elem) {
        for (let i = 0; i < elem.length; i++) {
            elem[i].classList.remove('auto-completed-active');
        }
    }

    function destoryAllSuggestList(elem?) {
        const list = document.getElementsByClassName('auto-completed-items');
        for (let i = 0; i < list.length; i += 1) {
            if (elem != list[i] && elem != input) {
                list[i].parentNode.removeChild(list[i]);
            }
        }
    }

    document.addEventListener('click', (ev) => {
        destoryAllSuggestList(ev.target);
    });
}

