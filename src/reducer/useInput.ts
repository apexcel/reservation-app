import { useCallback, useReducer } from 'react'

function reducer(state, action) {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state, [action.name]: action.value
            };
        case "CHECKBOX_CHANGE":
            return {
                ...state, [action.name]: action.checked
            }
        case "RESET":
            return Object.keys(state).reduce((acc, current) => {
                acc[current] = '';
                return acc;
            }, {});
        default:
            return state;
    }
}

function useInput(initialForm) {
    const [form, dispatch] = useReducer(reducer, initialForm);

    const onChangeInput = useCallback(ev => {
        const { name, value } = ev.target;
        dispatch({ type: "CHANGE", name, value });
    }, []);

    const onChangeCheck = useCallback(ev => {
        const { name, checked } = ev.target;
        dispatch({ type: "CHECKBOX_CHANGE", name, checked });
    }, []);

    const reset = useCallback(() => dispatch({ type: "RESET" }), []);

    return [form, onChangeInput, onChangeCheck];
}

export default useInput;