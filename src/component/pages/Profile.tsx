import React, { useEffect } from 'react'
import axios from 'axios'

export default function Profile({ userState }) {
    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = async () => {
        const config = {
            url: `http://localhost:9000/api/user-info/`,
            data: {
                userId: userState.user.id,
                userName: userState.user.name,
            }

        }
        console.log(config.url, config.data)
        const result = await axios.post(config.url, config.data);
        console.log(result)
    }

    return (
        <div>
            <p>{userState.user.id}</p>
            <p>{userState.user.name}</p>
            <p>남은횟수와 레슨권 기간</p>
            <p>최근 예약 날짜</p>
        </div>
    )
}