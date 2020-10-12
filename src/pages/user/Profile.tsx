import React, { useEffect, useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import ReservationApi from '../../../api/ReservationApi.ts'
import { setCookie, getCookie, deleteCookie } from 'Utils/browserUtils.ts'
import qs from 'qs';

import CardBox from 'Components/CardBox.tsx';
import DescriptionList from 'Components/DescriptionList.tsx';
import EditProfile from './EditProfile.tsx';

import 'Styles/Profile.scss';
import { isEmpty } from '../../../utils/utils.ts';

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
        return () => { isMounted = false; };
    }, []);

    useEffect(() => {
        if (reservations) {
            console.log(reservations);
            v2();
        }
    }, [reservations]);

    const getUserBookedList = async () => {
        const response = await ReservationApi.getUserReservationList(getCookie('userToken'), userState.fullname);
        console.log(response);
        return response;
    };

    // TODO: 받은 데이터 추출해서 예약현황 만들기
    const v2 = () => {
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
        console.log(list);
        return;
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