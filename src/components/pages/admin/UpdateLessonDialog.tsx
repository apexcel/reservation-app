import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import { useRecoilValue } from 'recoil'
import { baseURLAtom } from '../../../atoms/globalAtoms.ts'
import useInput from '../../../reducer/useInput.ts'
import SelectOption from '../../modal/SelectOption.tsx';
import Dialog from '../../modal/Dialog.tsx'
import Input from '../../modal/Input.tsx'

const initForm = {
    lessonName: '',
    employee: '',
    startDate: '',
    endDate: '',
    counter: 0,
    additionalDays: 0,
    point: 0,
}

export default function UpdateLessonDialog({ username, closeDialog }) {

    const baseURL = useRecoilValue(baseURLAtom)
    const [adminList, setAdminList] = useState([]);
    const [endDateStr, setEndDateStr] = useState('');
    const [lessonForm, onChangeInput] = useInput(initForm);

// TEST Array
const testArr = [
    'Lessons',
    'M1C4',
    'M2C5',
    'M2C9',
    'M3C13',
    'M6C26'
];

    useEffect(() => {
        adminListFromAPI()
    }, [])

    useEffect(() => {
        const endDate = calcEndDate(lessonForm.lessonName, lessonForm.startDate, lessonForm.additionalDays);
        const str = stringFromDate(endDate);
        setEndDateStr(str)
        lessonForm.endDate = str;
    })

    useEffect(() => {
        console.log(lessonForm)
    })

    const adminListFromAPI = async () => {
        const url = `${baseURL}/api/admin/adminlist`;
        const res = await axios.get(url);
        res.data.unshift('Admin Names');
        setAdminList(res.data);
    }

    const updateLessonToAPI = async (ev) => {
        ev.preventDefault();
        const url = `${baseURL}/api/userinfo/lesson-update`;
        const data = {
            username: username,
            lesson: lessonForm,
        };
        await axios.post(url, data);
        window.location.reload();
        closeDialog();
    }

    const calcEndDate = (lessonName , beginDate: string, additional: number) => {
        switch (lessonName) {
            case 'M1C4':
                lessonForm.counter = 4;
                return new Date (new Date(beginDate).valueOf() + (86400000* 31) + (additional * 86400000));
            case 'M2C5':
                lessonForm.counter = 5;
                return new Date (new Date(beginDate).valueOf() + (86400000* 61) + (additional * 86400000));
            case 'M2C9':
                lessonForm.counter = 9;
                return new Date (new Date(beginDate).valueOf() + (86400000* 61) + (additional * 86400000));
            case 'M3C13':
                lessonForm.counter = 13;
                return new Date (new Date(beginDate).valueOf() + (86400000* 91) + (additional * 86400000));
            case 'M6C26':
                lessonForm.counter = 26;
                return new Date (new Date(beginDate).valueOf() + (86400000* 182) + (additional * 86400000));
            default:
                return new Date();
        }
    }

    const stringFromDate = (date: Date) => {
        let yy = date.getFullYear();
        let mm = '' + (date.getMonth() + 1);
        let dd = '' + date.getDate();

        if (mm.length < 2) mm = '0' + mm;
        if (dd.length < 2) dd = '0' + dd;

        return [yy, mm, dd].join('-');
    }

    const renderDialogBody = () => {
        return (
            <>
                <label htmlFor='lessonName'>Lesson</label>
                <SelectOption onChange={onChangeInput} className='common__select' id='lessonName' name='lessonName' optionArray={testArr} />

                <label htmlFor='employee'>Employee</label>
                <SelectOption onChange={onChangeInput} className='common__select' id='employee' name='employee' optionArray={adminList} />

                <label htmlFor='startDate'>Start Date</label>
                <Input onChange={onChangeInput} className='common__input' id='startDate' name='startDate' type='date' />

                <label htmlFor='endDate'>End Date</label>
                <Input className='common__input' id='endDate' name='endDate' type='date' diabled={true} value={endDateStr} readOnly={true} />

                <label htmlFor='counter'>Counter</label>
                <Input onChange={onChangeInput} className='common__input' id='counter' name='counter' type='number' value={lessonForm.counter} diabled={true} readOnly={true} step={1} />

                <label htmlFor='additionalDays'>Additional Days</label>
                <Input onChange={onChangeInput} className='common__input' id='additionalDays' name='additionalDays' type='number' step={1} />

                <label htmlFor='point'>Point</label>
                <Input onChange={onChangeInput} className='common__input' id='point' name='point' type='number' step={1000} />
                
                <div>
                    <a onClick={updateLessonToAPI}>Confirm</a>
                </div>
            </>
        )
    }

    return (
        <Dialog
            closeDialog={closeDialog}
            dialogHeader={'Update Lesson'}
            dialogBody={renderDialogBody()}
        />
    )
}