import React from 'react'

export default function Main({setLogged, setUserInfo, logged}) {

    const logout = (e) => {
        e.preventDefault()
        setLogged(false)
    }

    return (
        <div>
            <button>Check Profile</button>
            <button onClick={logout}>logout</button>
        </div>
    )
}