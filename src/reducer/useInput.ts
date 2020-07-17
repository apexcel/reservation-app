import { useCallback, useReducer } from 'react'

function reducer(state, action) {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state, [action.name]: action.value
            };
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

    const onChangeInput = useCallback(e => {
        const { name, value } = e.target;
        dispatch({ type: "CHANGE", name, value })
    }, []);

    const reset = useCallback(() => dispatch({ type: "RESET" }), []);

    return [form, onChangeInput, reset];
}

export default useInput;