import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { baseURLAtom, userStateAtom } from '../../../atoms/globalAtoms.ts'
import axios from 'axios'

export default function Profile({ userState }) {

    const baseURL = useRecoilValue(baseURLAtom);

    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = async () => {
        const config = {
            url: `${baseURL}/api/user-info/`,
            data: {
                username: userState.username,
                fullname: userState.fullname,
            }
        }
        console.log(config.url, config.data)
        const result = await axios.post(config.url, config.data);
        console.log(result)
    }

    return (
        <div>
            <p>{userState.username}</p>
            <p>{userState.fullname}</p>
            <p>남은횟수와 레슨권 기간</p>
            <p>최근 예약 날짜</p>
        </div>
    )
}