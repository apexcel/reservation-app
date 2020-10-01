import React, { useEffect, useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import ReservationApi from '../../../api/ReservationApi'

import CardBox from 'Components/CardBox.tsx';
import DescriptionList from 'Components/DescriptionList.tsx';
import EditProfile from './EditProfile.tsx';

import 'Styles/Profile.scss';

export default function Profile({ userState }) {

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
        return () => { isMounted = false; }
    }, [])

    useEffect(() => {
        if (reservations) {
            console.log(reservations)
            refinedReservations()
        }
    }, [reservations])

    const getUserBookedList = async () => {
        const data = {
            fullname: userState.fullname
        };
        try {
            const response = await ReservationApi.getUserReservationList(data);
            console.log(response)
            return response;
        }
        catch (err) {
            throw err;
        }
    };

    const refinedReservations = () => {
        const bookedDate = [];
        const bookedDataList = [];
        const finalList = [];

        console.log(reservations)

        reservations.map((el, idx) => {
            bookedDate.push(Object.keys(el)[0].slice(10));
            bookedDataList.push(Object.values(el)[0])
        });

        bookedDataList.map((bookedInfo, idx) => {
            bookedInfo.map(el => {
                const emptyObj = {};
                let item = Object.defineProperties(emptyObj, {
                    'bookedDate': {
                        value: bookedDate[idx],
                        enumerable: true
                    },
                    'bookedTime': {
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

    const renderReservationList = () => {
        const teacherNames = {
            so: '소정',
            hyun: '현영',
            jung: '상정'
        };
        const teacher = findTeacher();
        console.log(teacher);

        return refined.map((el, idx) =>
            <DescriptionList key={idx} title={el.bookedDate}>
                <span>{el.bookedTime}시</span>
                <span>{teacherNames[teacher[idx]]}</span>
            </DescriptionList>
        );
    };

    const renderLessonList = () => {
        if (userState.lessons) {
            return userState.lessons.reverse().map((el, idx) => {
                const dateExp = new Date(el.endDate) < new Date();
                return (
                    <DescriptionList key={idx} title={el.name} className={dateExp ? 'expired' : ''}>
                        <div>시작일: {el.startDate}</div>
                        <div>종료일: {el.endDate}</div>
                        <div>남은 횟수: {el.counter}</div>
                    </DescriptionList>
                )
            })
        }
        else {
            return;
        }
    };

    return (
        <div className={`profile-container`}>
            <Switch>
                <Route exact path="/profile/:id" component={EditProfile} />
                <>
                    <div className='column'>
                        <CardBox title='내 정보' footer={<Link to={`/profile/@${userState.username}`}>수정하기</Link>}>
                            <DescriptionList title='아이디'>
                                {userState.username}
                            </DescriptionList>
                            <DescriptionList title='이름'>
                                {userState.fullname}
                            </DescriptionList>
                        </CardBox>
                        <CardBox title='예약 정보' footer={<Link to={`/profile/@${userState.username}`}>수정하기</Link>}>
                            {renderReservationList()}
                        </CardBox>
                    </div>
                    <div className='column'>
                        <CardBox title='레슨권 정보'>
                            <div></div>
                            {renderLessonList()}
                        </CardBox>
                    </div>
                </>
            </Switch>
        </div>
    )
}