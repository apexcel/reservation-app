import React, { useEffect, useState } from 'react'
import UpdateLessonDialog from './UpdateLessonDialog.tsx';
import UserApi from 'Api/UserApi'
import jwtDecode from 'jwt-decode'

export default function Searched({ match }) {
    const [searchedUserInfo, setSearchedUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);

        if (match.params.name !== undefined || match.params.name !== '') {
            UserApi.getUserInfo(match.params.name).then(resp => {
                console.log(resp)
                if (isMounted) {
                    setSearchedUserInfo(jwtDecode(resp.data.token));
                }
            });
        }

        setIsLoading(false);

        return () => {
            isMounted = false;
        }
    }, [match.params.name])

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

    const renderLessonList = () => {
        return searchedUserInfo.lessons.reverse().map((el, idx) =>
            <div key={idx}>
                <div>레슨권: {el.name}</div>
                <div>남은횟수: {el.counter}</div>
                <div>시작일: {el.startDate}</div>
                <div>종료일: {el.endDate}</div>
            </div>
        )
    };

    const renderSearchedUserInfo = () => {
        console.log(searchedUserInfo.fullname)
        return (
            <div>
                <div>
                    Username: {searchedUserInfo.username}
                </div>
                <div>
                    Name: {searchedUserInfo.fullname}
                </div>
                <div>
                    Day of Birth: {searchedUserInfo.dob}
                </div>
                <div>
                    Phone: {searchedUserInfo.tel}
                </div>
                <div>
                    Lessons: {renderLessonList()}
                </div>
                <div>
                    Recent Booked: {searchedUserInfo.reservations}
                </div>
                <div>
                    Remain Point: {searchedUserInfo.point}
                </div>
                <button type='button' onClick={updateUserLessons}>New Lessons Update</button>
            </div>
        )
    }

    //TODO: 해당 유저 info 및 lesson 등 기타 업데이트 가능하도록
    return (
        <>
            {isLoading ? 'loading...' :
                (Object.keys(searchedUserInfo).length > 0 ? renderSearchedUserInfo() : '')}
            {visible ? <UpdateLessonDialog fullname={searchedUserInfo.fullname} closeDialog={closeDialog} /> : null}
        </>
    )
}