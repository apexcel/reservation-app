import React, { useReducer, useCallback, useEffect } from 'react'

function reducer(state, action) {
    switch (action.type) {
        case 'CHANGE_INPUT':
            return { 
                ...state,
                inputs: action.name,
                user: action.name
            }
    }
}

const initState = {
    inputs: {
        username: '',
    },
    user: {
        name: '',
    }
}

export default function Reducertest() {

    const [state, dispatch] = useReducer(reducer, initState)
    const { name } = state.user
    const { username } = state.inputs

    useEffect(() => {
        console.log(state)
    }, [state])

    const onChange = useCallback(e => {
        e.preventDefault()
        const name = e.target.value
        dispatch({
            type: 'CHANGE_INPUT',
            name
        })
    }, [])

    return (
        <>
            <input type='text' onChange={onChange} />
        </>
    )
}