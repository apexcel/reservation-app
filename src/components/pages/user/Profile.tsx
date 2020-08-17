import React, { useEffect, useState } from 'react'
import ReservationApi from '../../../utils/api/ReservationApi'

import '../../../styles/profile.scss';

export default function Profile({ userState }) {

    const className = 'profile__page';
    const [reservations, setReservations] = useState([]);
    const [refined, setRefined] = useState([]);

    useEffect(() => {
        // Mounted 되었을 경우 re-rendering 하지 않도록 함
        let isMounted = true;
        if (!(reservations.length > 0)) {
            if (isMounted) {
                getUserBookedList().then(res => {
                    if (isMounted) setReservations(res.data);
                });
            }
        }

        return () => {
            isMounted = false;
        }
    }, [])

    useEffect(() => {
        refinedReservations()
    }, [reservations])

    const getUserBookedList = async () => {
        const data = {
            fullname: userState.fullname
        };
        const response = await ReservationApi.getUserReservationList(data);
        console.log(response)
        return response;
    };

    const refinedReservations = () => {
        const bookedDate = [];
        const bookedDataList = [];
        const finalList = [];

        reservations.map((el, idx) => {
            bookedDate.push(Object.keys(el)[0].slice(10));
            bookedDataList.push(Object.values(el)[0])
        });

        bookedDataList.map((bookedInfo, idx) => {
            bookedInfo.map(el => {
                const emptyObj = {};
                let item = Object.defineProperties(emptyObj, {
                    'date': {
                        value: bookedDate[idx],
                        enumerable: true
                    },
                    'time': {
                        value: el.time,
                        enumerable: true
                    },
                    'reservation': {
                        value: JSON.parse(el.booked_data),
                        enumerable: true
                    }
                });
                finalList.push(item);
            })
        })
        setRefined(finalList)
    }

    const findTeacher = () => {
        return refined.map((el, idx) => {
            const match = Object.values(el.reservation).map((el2, idx2) => {
                return el2 === userState.fullname ? Object.keys(el.reservation)[idx2] : null;
            });
            return match.find(name => name !== null);
        })
    };


    const renderReservations = () => {
        const teacherNames = {
            so: '소정',
            hyun: '현영',
            jung: '상정'
        };
        const teacher = findTeacher();
        console.log(teacher)
        return refined.map((el, idx) =>
            <div key={idx} className={`${className}-booked-list`}>
                <span className={`${className}-booked-list-item`} >{el.date}</span>
                <span className={`${className}-booked-list-item`} >{el.time}시</span>
                <span className={`${className}-booked-list-item`} >{teacherNames[teacher[idx]]}</span>
            </div>
        );
    }

    const renderLessonList = () => {
        return userState.lessons.map((el, idx) => {
            return (
                <div key={idx}>
                    <div>레슨: {el.name}</div>
                    <div>시작일: {el.start}</div>
                    <div>종료일: {el.end}</div>
                    <div>남은 횟수: {el.counter}</div>
                </div>
            )
        })
    };

    renderLessonList()
    return (
        <div className={`${className}-container`}>
            <div className={`${className}-userinfo`}>
                <h1>My Information</h1>
                <div>Your username: {userState.username}</div>
                <div>Your realname: {userState.fullname}</div>
                <h2>남은횟수와 레슨권 기간</h2>
            {renderLessonList()}
            </div>
            <div className={`${className}-booked-list-container`}>
                <h1>Recent Booked dates</h1>
                {renderReservations()}
            </div>
        </div>
    )
}