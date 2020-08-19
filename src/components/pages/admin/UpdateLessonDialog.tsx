import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import UserApi from '../../../utils/api/UserApi'
import AdminApi from '../../../utils/api/AdminApi'
import { stringFromDate } from '../../../utils/utils.ts'
import useInput from '../../../reducer/useInput.ts'
import SelectOption from '../../modal/SelectOption.tsx';
import Dialog from '../../modal/Dialog.tsx'
import Input from '../../modal/Input.tsx'

const initForm = {
    lessonName: '',
    employee: '',
    enrollDate: '',
    startDate: '',
    endDate: '',
    counter: 0,
    additionalDays: 0,
    discount: 0,
    point: 0,
    price: 0,
}

export default function UpdateLessonDialog({ fullname, closeDialog }) {

    const [adminList, setAdminList] = useState([]);
    const [calculatedValues, setCalculatedValues] = useState({});
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
        const fromValues = setFormValue(lessonForm.lessonName, lessonForm.startDate, lessonForm.additionalDays);
        const str = stringFromDate(fromValues);
        const price = calcDiscount()
        setCalculatedValues({...calculatedValues, endDateStr: str, price: price})
        lessonForm.endDate = calculatedValues.str;
        lessonForm.price = calculatedValues.price;
        console.log(lessonForm)
    }, [lessonForm])

    const adminListFromAPI = async () => {
        const res = await AdminApi.getAdminList();
        res.data.unshift('Admin Names');
        setAdminList(res.data);
    }

    const addLessonToUser = async (ev) => {
        ev.preventDefault();
        const data = {
            fullname: fullname,
            lesson: lessonForm,
        };
        console.log('Add Lesson API')
        await UserApi.addLesson(data);
        window.location.reload();
        closeDialog();
    }

    const calcDiscount = () => {
        return lessonForm.discount === 0 ? lessonForm.price : 
        lessonForm.price - (lessonForm.price * (lessonForm.discount / 100));
    };

    const setFormValue = (lessonName, beginDate: string, additional: number) => {
        switch (lessonName) {
            case 'M1C4':
                lessonForm.counter = 4;
                lessonForm.price = 210000;
                return new Date (new Date(beginDate).valueOf() + (86400000* 31) + (additional * 86400000));
            case 'M2C5':
                lessonForm.counter = 5;
                lessonForm.price = 330000;
                return new Date (new Date(beginDate).valueOf() + (86400000* 61) + (additional * 86400000));
            case 'M2C9':
                lessonForm.counter = 9;
                lessonForm.price = 420000;
                return new Date (new Date(beginDate).valueOf() + (86400000* 61) + (additional * 86400000));
            case 'M3C13':
                lessonForm.counter = 13;
                lessonForm.price = 630000;
                return new Date (new Date(beginDate).valueOf() + (86400000* 91) + (additional * 86400000));
            case 'M6C26':
                lessonForm.counter = 26;
                lessonForm.price = 1260000;
                return new Date (new Date(beginDate).valueOf() + (86400000* 182) + (additional * 86400000));
            default:
                return new Date();
        }
    }

    const renderDialogBody = () => {
        return (
            <>
                <label htmlFor='lessonName'>Lesson</label>
                <SelectOption onChange={onChangeInput} className='dialog__input common__select' id='lessonName' name='lessonName' optionArray={testArr} />

                <label htmlFor='employee'>Employee</label>
                <SelectOption onChange={onChangeInput} className='dialog__input common__select' id='employee' name='employee' optionArray={adminList} />

                <label htmlFor='enrollDate'>Enroll Date</label>
                <Input onChange={onChangeInput} className='dialog__input common__input' id='enrollDate' name='enrollDate' type='date' />

                <label htmlFor='startDate'>Start Date</label>
                <Input onChange={onChangeInput} className='dialog__input common__input' id='startDate' name='startDate' type='date' />

                <label htmlFor='endDate'>End Date</label>
                <Input className='dialog__input common__input' id='endDate' name='endDate' type='date' diabled={true} value={calculatedValues.endDateStr} readOnly={true} />

                <label htmlFor='counter'>Counter</label>
                <Input onChange={onChangeInput} className='dialog__input common__input' id='counter' name='counter' type='number' value={lessonForm.counter} diabled={true} readOnly={true} step={1} />

                <label htmlFor='discount'>Discount</label>
                <Input onChange={onChangeInput} className='dialog__input common__input' id='discount' name='discount' type='number' min={0} max={100} maxLength={2} />

                <label htmlFor='price'>Price</label>
                <Input className='dialog__input common__input' id='price' name='price' type='number' diabled={true} value={calculatedValues.price} readOnly={true} />

                <label htmlFor='additionalDays'>Additional Days</label>
                <Input onChange={onChangeInput} className='dialog__input common__input' id='additionalDays' name='additionalDays' type='number' step={1} />

                <label htmlFor='point'>Point</label>
                <Input onChange={onChangeInput} className='dialog__input common__input' id='point' name='point' type='number' step={1000} />
                
                <div>
                    <button type='button' onClick={addLessonToUser}>Confirm</button>
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