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
    })
}
