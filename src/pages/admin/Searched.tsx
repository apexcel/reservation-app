import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import ReservationApi from 'Api/ReservationApi.ts';
import { getCookie } from 'Utils/browserUtils.ts';
import CardBox from 'Components/CardBox.tsx';

import UpdateLessonDialog from './UpdateLessonDialog.tsx';
import Loading from '@/components/Loading.tsx';
import DescriptionList from 'Components/DescriptionList.tsx';
import { isEmpty } from '../../../utils/utils.ts';

import UserApi from 'Api/UserApi.ts';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        paperMain: {
            padding: theme.spacing(2),
            textAlign: 'left',
            backgroundColor: '#5d5d5d',
            color: 'a1a1a1',
            overflow: 'auto'
        },
        paperSub: {
            padding: theme.spacing(2),
            textAlign: 'left',
            backgroundColor: '#5d5d5d',
            color: 'a1a1a1',
            height: '250px',
            overflow: 'auto'
        }
    })
);

import '@/styles/Searched.scss';

export default function Searched({ match }): React.ReactElement {
    const classes = useStyles();

    const [searchedUserInfo, setSearchedUserInfo] = useState<IObject>({});
    const [reservations, setReservations] = useState([]);
    const [bookingList, setBookingList] = useState([]);

    const [dialogState, setDialogState] = useState({
        component: false,
        style: false
    });

    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);

        if (match.params.name !== undefined || match.params.name !== '') {
            UserApi.findUser(history.location.state, match.params.name).then(resp => {
                console.log(resp);
                if (isMounted) {
                    setSearchedUserInfo(jwtDecode(resp.data.token));
                }
            });
        }
        if (!(reservations.length > 0)) {
            if (isMounted) {
                getUserBookedList().then(res => {
                    if (isMounted) setReservations(res.data);
                });
            }
        }

        setIsLoading(false);
        return () => {
            isMounted = false;
        };
    }, [match.params.name]);


    useEffect(() => {
        if (reservations) {
            refineReservationList();
        }
    }, [reservations]);


    const openDialog = () => {
        setDialogState({ component: true, style: true });
        document.body.style.overflow = 'hidden';
    };
    const closeDialog = () => {
        setDialogState({ component: true, style: false });
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            setDialogState({ component: false, style: false });
        }, 500);
    };

    const getUserBookedList = async () => {
        return await ReservationApi.getUserReservationList(getCookie('userToken'), match.params.name);
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

    // TODO:User Lessons update method
    const updateUserLessons = (ev) => {
        ev.preventDefault();
        openDialog();
    };

    const renderLessonList = () => {
        return searchedUserInfo.lessons.reverse().map((el, idx) =>
            <ListItem key={idx}>
                <ListItemText
                    primary={`${el.name} ${el.counter}회`}
                    secondary={`${el.startDate}, ${el.endDate}`} />
            </ListItem>
        );
    };

    const renderSearchedUserInfo = () => {
        return (
            <div className={classes.root}>
                <button style={{width: '100%', height: '70px', margin: '10px 0 10px 0' }} className='btn' type='button' onClick={updateUserLessons}>New Lessons Update</button>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper className={classes.paperMain}>
                            <div>
                                Username: {searchedUserInfo.username}
                                Name: {searchedUserInfo.fullname}
                                Day of Birth: {searchedUserInfo.dob}
                            </div>
                            <div>
                                Phone: {searchedUserInfo.tel}
                                Remain Point: {searchedUserInfo.point}
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paperSub}>
                            {renderBookingList()}
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paperSub}>
                            {renderLessonList()}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    };

    //TODO: 해당 유저 info 및 lesson 등 기타 업데이트 가능하도록
    return (
        <div className='searched__userinfo-container'>
            {isLoading ? <Loading /> 
                : (Object.keys(searchedUserInfo).length > 0 ? renderSearchedUserInfo() 
                    : null)}
            {dialogState.component ? 
                <UpdateLessonDialog dialogState={dialogState} fullname={searchedUserInfo.fullname} closeDialog={closeDialog} /> 
                : null}
        </div>
    );
}