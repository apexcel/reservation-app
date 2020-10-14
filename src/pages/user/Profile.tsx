import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import ReservationApi from '../../api/ReservationApi.ts';
import { getCookie } from 'Utils/browserUtils.ts';
import qs from 'qs';

import CardBox from 'Components/CardBox.tsx';
import DescriptionList from 'Components/DescriptionList.tsx';
import EditProfile from './EditProfile.tsx';

import 'Styles/Profile.scss';
import { isEmpty } from '../../../utils/utils.ts';

interface ProfileProps {
    userState: IObject
}

export default function Profile({ userState }: ProfileProps): React.ReactElement {

    const [reservations, setReservations] = useState([]);
    const [bookingList, setBookingList] = useState([]);

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
        return () => { isMounted = false; };
    }, []);

    useEffect(() => {
        if (reservations) {
            refineReservationList();
        }
    }, [reservations]);

    const getUserBookedList = async () => {
        return await ReservationApi.getUserReservationList(getCookie('userToken'), userState.fullname);
    };

    // TODO: 받은 데이터 추출해서 예약현황 만들기
    const refineReservationList = () => {
        const list = [];
        reservations.map((el, idx) => {
            const bookedItem = {
                teacher: undefined,
                timeStamp: undefined
            };
            const parsedData = JSON.parse(el.booked_data);
            const keys = Object.keys(parsedData);
            for (let i = 0; i < keys.length; i += 1) {
                const key = keys[i];
                if (!isEmpty(parsedData[key])) {
                    bookedItem.teacher = key;
                    bookedItem.timeStamp = el.time_stamp;
                }
            }
            list.push(bookedItem);
        });
        //console.log(list);
        setBookingList(list);
        return;
    };

    const renderBookingList = () => {
        const teacherNames = {
            so: '소정',
            hyun: '현영',
            jung: '상정'
        };
        return bookingList.reverse().map((el, idx) => {
            const dateTime = el.timeStamp.split(':');
            const date = dateTime[0];
            const time = dateTime[1];
            const isExpired = new Date(date) < new Date();

            return (
                <DescriptionList key={idx} title={date} className={isExpired ? 'expired' : ''}>
                    <span>{teacherNames[el.teacher]} </span>
                    <span>{time}시</span>
                </DescriptionList>
            );
        });
    };

    const renderLessonList = () => {
        if (userState.lessons) {
            return userState.lessons.reverse().map((el, idx) => {
                const dateExp = new Date(el.endDate) < new Date();
                const countExp = el.counter === 0 ? true : false;
                return (
                    <DescriptionList key={idx} title={el.name} className={dateExp ? 'expired' : ''}>
                        <div>시작일: {el.startDate}</div>
                        <div>종료일: {el.endDate}</div>
                        <div className={countExp ? 'expired' : ''}>남은 횟수: {el.counter}</div>
                    </DescriptionList>
                );
            });
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
                            {renderBookingList()}
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
    );
}