import React, { useEffect } from 'react'

export default function UserInformation({ userInfo }) {

    useEffect(() => {
        const config = {
            url: `http://localhost:9000/api/userInfo/id=${userInfo.user.id}&name=${userInfo.user.name}`
        }
        console.log(config.url);
    })

    return (
        <div>
            <p>ID: {userInfo.user.id}</p>
            <p>NAME: {userInfo.user.name}</p>
            <p>최근 예약 날짜</p>
        </div>
    )
}