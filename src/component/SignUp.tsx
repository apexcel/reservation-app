import React, { useState, useEffect } from 'react'
import axios from 'axios'

import '../styles/common.scss'
import { encode } from 'punycode'

export default function SignUp() {

    const [userData, setUserData] = useState({
        id: '',
        pw: '',
        pw_check: '',
        first_name: '',
        last_name: '',
        dob: '',
        tel: '',
    })

    useEffect(() => {
        console.log(userData)
    }, [userData])
    let a = new String()
    const onSignUp = (e) => {
        e.preventDefault()
        axios.post('http://localhost:9000/api/signup', userData).then(res => console.log(res.status))
    }

    const onChangeHandler = (e) => {
        e.preventDefault()
        const { value, id } = e.target
        setUserData({ ...userData, [id]: btoa(value)})
    }

    const month = [1,2,3,4,5,6,7,8,9,10,11,12].map((el, idx) => 
        <option key={idx}>{el}</option>
    )

    return (
        <form>
            <fieldset>
                <div>
                    <h3><label htmlFor='id'>Username</label></h3>
                    <input onChange={onChangeHandler} id='id' type='text' maxLength={20} />
                </div>

                <div>
                    <h3><label htmlFor='pw'>Password</label></h3>
                    <input onChange={onChangeHandler} id='pw' type='password' maxLength={20} />
                </div>

                <div>
                    <h3><label htmlFor='pw_check'>Password Check</label></h3>
                    <input onChange={onChangeHandler} id='pw_check' type='password' maxLength={20} />
                </div>

                <div>
                    <h3><label htmlFor='first_name'>First Name</label></h3>
                    <input onChange={onChangeHandler} id='first_name' type='text' maxLength={40} />
                </div>

                <div>
                    <h3><label htmlFor='last_name'>Last Name</label></h3>
                    <input onChange={onChangeHandler} id='last_name' type='text' maxLength={40} />
                </div>

                <div>
                    <h3><label htmlFor='dob'>Day of Birth</label></h3>
                    <input onChange={onChangeHandler} id='dob' type='date' maxLength={6}/>
                </div>

                <div>
                    <h3><label htmlFor='tel'>Tel</label></h3>
                    <input onChange={onChangeHandler} id='tel' type='tel' maxLength={16} />
                </div>

                <div className='btn_area'><button onClick={onSignUp} className='btn_primary'>Sign Up</button></div>
            </fieldset>
        </form>
    )
}