import React, { useState, useEffect } from 'react'
import Calendar from './Calendar.jsx'

// styles
import '../styles/app.scss'

const App = () => {

    const [data, setData] = useState()

    useEffect(() => {
        fetch('http://localhost:4000')
        .then(res => res.json())
        .then(jsonRoot => setData(jsonRoot))
        console.log(data)
    }, [data])


    return(
        <div className='container'>
            <Calendar />
        </div>
    )
}

export default App;