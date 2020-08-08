import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { baseURLAtom, userStateAtom } from '../../../atoms/globalAtoms.ts'
import axios from 'axios'
import { isMainThread } from 'worker_threads';

export default function Profile({ userState }) {

    const baseURL = useRecoilValue(baseURLAtom);
    const setUserState = useSetRecoilState(userStateAtom);
    const [reservations, setReservations] = useState([])
    const [refined, setRefined] = useState([]);

    useEffect(() => {
        let isMounted = true;
        if (!(reservations.length > 0)) {
            if (isMounted) {
                getUserReservations().then(res => {
                    if (isMounted) setReservations(res.data);
                });
            }
        }
        console.log("profile useEffect")
        return () => {
            isMounted = false;
        }
    }, [])

    useEffect(() => {
        refinedUserReservations()
    }, [reservations])

    const getUserReservations = async () => {
        const config = {
            url: `${baseURL}/api/reservation/find`,
            data: {
                fullname: userState.fullname
            }
        }
        return await axios.post(config.url, config.data);
    }

    const refinedUserReservations = () => {
        const bookedDate = [];
        const bookedTime = [];
        const finalList = [];

        reservations.map((el, idx) => {
            bookedDate.push(Object.keys(el)[0].slice(10));
            bookedTime.push(Object.values(el)[0])
        });

        
        bookedTime.map((el, idx) => {
            console.log(bookedDate[idx].slice(0, 4))
            console.log(bookedDate[idx].slice(4))
            el.map((el2, idx2) => {
                const emptyObj = {};
                //console.log(idx, el2.time, JSON.parse(el2.booked_data))
                let item = Object.defineProperties(emptyObj, {
                    'date': {
                        value: bookedDate[idx],
                        enumerable: true
                    },
                    'time': {
                        value: el2.time,
                        enumerable: true
                    },
                    'reservation': {
                        value: JSON.parse(el2.booked_data),
                        enumerable: true
                    }
                });
                finalList.push(item);
            })
        })
        setRefined(finalList)
        return finalList;
    }

    const findTeacher = () => {
        return refined.map((el, idx) => {
            const index = Object.values(el.reservation).findIndex(name => name !== "");
            return Object.keys(el.reservation)[index];
        })
    }

    const renderReservations = () => {
        const teacher = findTeacher();
        return refined.map((el, idx) =>
            <div key={idx}>
                <span>{el.date} </span>
                <span>{el.time}시</span>
                <span>{teacher[idx]}</span>
            </div>
        );
    }

    return (
        <div>
            <p>{userState.username}</p>
            <p>{userState.fullname}</p>
            <p>남은횟수와 레슨권 기간</p>
            <p>최근 예약 날짜</p>
            {renderReservations()}
        </div>
    )
}