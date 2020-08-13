import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseURLAtom } from '../../../atoms/globalAtoms.ts'
import { useRecoilValue } from 'recoil'
import UpdateLessonDialog from './UpdateLessonDialog.tsx';

export default function Searched({ username }) {
    const [searchedUserInfo, setSearchedUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const baseURL = useRecoilValue(baseURLAtom);

    useEffect(() => {
        const callUserInfoAPI = async () => {
            setIsLoading(true);
            try {
                const result = await axios.get(`${baseURL}/api/userinfo/${username}`);
                setSearchedUserInfo(result.data);
            }
            catch (err) {
                console.error(err);
            }
            setIsLoading(false);
        }
        if (username) {
            callUserInfoAPI();
        }
        console.log(searchedUserInfo)
    }, [username])

    useEffect(() => {
        console.log(searchedUserInfo)
    }, [searchedUserInfo])

    const openDialog = () => { setVisible(true) };
    const closeDialog = () => { setVisible(false) };

    // TODO:User Lessons update method
    const updateUserLessons = (ev) => {
        ev.preventDefault();
        openDialog();
    }

    const renderSearchedUserInfo = () => {
        console.log(searchedUserInfo.fullname)
        return (
            <div>
                <div>
                    {searchedUserInfo.username}
                </div>
                <div>
                    {searchedUserInfo.fullname}
                </div>
                <div>
                    {searchedUserInfo.dob}
                </div>
                <div>
                    {searchedUserInfo.tel}
                </div>
                <div>
                    {searchedUserInfo.lessons}
                </div>
                <div>
                    {searchedUserInfo.reservations}
                </div>
                <button type='button' onClick={updateUserLessons}>New Lessons Update</button>
            </div>
        )
    }

    //TODO: 해당 유저 info 및 lesson 등 기타 업데이트 가능하도록
    return (
        <>
            {isLoading ? 'loading...' :
                (Object.keys(searchedUserInfo).length > 0 ? renderSearchedUserInfo() : 'error')}
            {visible ? <UpdateLessonDialog closeDialog={closeDialog} /> : null}
        </>
    )
}