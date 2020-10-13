import React, { useEffect, useState } from 'react';
import UserApi from 'Api/UserApi.ts';
import AdminApi from 'Api/AdminApi.ts';
import { getCookie } from 'Utils/browserUtils.ts'
import { formattedDateString } from 'Utils/utils.ts';
import useInput from 'Reducers/useInput.ts';
import SelectOption from 'Components/modal/SelectOption.tsx';
import Dialog from 'Components/modal/Dialog.tsx';
import Input from 'Components/modal/Input.tsx';

const initForm = {
    lessonName: '',
    employee: '',
    enrollDate: formattedDateString(new Date()),
    startDate: formattedDateString(new Date()),
    endDate: '',
    counter: 0,
    additionalDays: 0,
    discount: 0,
    point: 0,
    price: 0
};

export default function UpdateLessonDialog({ dialogState, fullname, closeDialog }) {

    const [adminList, setAdminList] = useState([]);
    const [calculatedValues, setCalculatedValues] = useState(initForm);
    const [lessonForm, onChangeInput] = useInput(initForm);

    // TEST Array
    const lessons = [
        'Lessons',
        'M1C4',
        'M2C5',
        'M2C9',
        'M3C13',
        'M6C26'
    ];

    useEffect(() => {
        adminListFromAPI();
    }, []);

    useEffect(() => {
        const val = setFormValue(lessonForm.lessonName);
        lessonForm.price = calculatedValues.price;
        lessonForm.endDate = val;
        lessonForm.counter = calculatedValues.counter;
        console.log(lessonForm);
    }, [lessonForm]);

    const adminListFromAPI = async () => {
        const res = await UserApi.getAdminList(getCookie('userToken'));
        setAdminList(res.data.adminNames);
    };

    const addLessonToUser = async (ev) => {
        ev.preventDefault();
        const data = {
            fullname: fullname,
            lesson: lessonForm
        };
        console.log('Add Lesson API');
        await UserApi.addLesson(getCookie('userToken'), data);
        window.location.reload();
        closeDialog();
    };

    const calcDiscount = (price, discount) => {
        return (discount === 0) ? price :
            price - (price * (discount / 100));
    };

    const setFormValue = (lessonName) => {
        switch (lessonName) {
            case 'M1C4':
                setCalculatedValues({
                    ...calculatedValues,
                    counter: 4,
                    price: calcDiscount(210000, lessonForm.discount),
                    endDate: formattedDateString(new Date(new Date(lessonForm.startDate).valueOf() + (86400000 * 31) + (lessonForm.additionalDays * 86400000)))
                });
                return formattedDateString(new Date(new Date(lessonForm.startDate).valueOf() + (86400000 * 31) + (lessonForm.additionalDays * 86400000)));
            case 'M2C5':
                setCalculatedValues({
                    ...calculatedValues,
                    counter: 5,
                    price: calcDiscount(330000, lessonForm.discount),
                    endDate: formattedDateString(new Date(new Date(lessonForm.startDate).valueOf() + (86400000 * 61) + (lessonForm.additionalDays * 86400000)))
                });
                return formattedDateString(new Date(new Date(lessonForm.startDate).valueOf() + (86400000 * 61) + (lessonForm.additionalDays * 86400000)));
            case 'M2C9':
                setCalculatedValues({
                    ...calculatedValues,
                    counter: 9,
                    price: calcDiscount(420000, lessonForm.discount),
                    endDate: formattedDateString(new Date(new Date(lessonForm.startDate).valueOf() + (86400000 * 61) + (lessonForm.additionalDays * 86400000)))
                });
                return formattedDateString(new Date(new Date(lessonForm.startDate).valueOf() + (86400000 * 61) + (lessonForm.additionalDays * 86400000)));
            case 'M3C13':
                setCalculatedValues({
                    ...calculatedValues,
                    counter: 13,
                    price: calcDiscount(630000, lessonForm.discount),
                    endDate: formattedDateString(new Date(new Date(lessonForm.startDate).valueOf() + (86400000 * 91) + (lessonForm.additionalDays * 86400000)))
                });
                return formattedDateString(new Date(new Date(lessonForm.startDate).valueOf() + (86400000 * 91) + (lessonForm.additionalDays * 86400000)));
            case 'M6C26':
                setCalculatedValues({
                    ...calculatedValues,
                    counter: 26,
                    price: calcDiscount(1260000, lessonForm.discount),
                    endDate: formattedDateString(new Date(new Date(lessonForm.startDate).valueOf() + (86400000 * 182) + (lessonForm.additionalDays * 86400000)))
                });
                return formattedDateString(new Date(new Date(lessonForm.startDate).valueOf() + (86400000 * 182) + (lessonForm.additionalDays * 86400000)));
            default:
                setCalculatedValues({
                    ...calculatedValues,
                    counter: 0,
                    price: 0,
                    endDate: formattedDateString(new Date())
                });
                return formattedDateString(new Date());
        }
    };


    const renderDialogBody = () => {
        return (
            <>
                <label htmlFor='lessonName'>Lesson</label>
                <SelectOption onChange={onChangeInput} className='dialog__input common__select' id='lessonName' name='lessonName' optionArray={lessons} />

                <label htmlFor='employee'>Employee</label>
                <SelectOption onChange={onChangeInput} className='dialog__input common__select' id='employee' name='employee' optionArray={adminList} />

                <label htmlFor='enrollDate'>Enroll Date</label>
                <Input onChange={onChangeInput} className='dialog__input common__input' id='enrollDate' name='enrollDate' type='date' />

                <label htmlFor='startDate'>Start Date</label>
                <Input onChange={onChangeInput} className='dialog__input common__input' id='startDate' name='startDate' type='date' />

                <label htmlFor='endDate'>End Date</label>
                <Input className='dialog__input common__input' id='endDate' name='endDate' type='date' diabled={true} value={calculatedValues.endDate} readOnly={true} />

                <label htmlFor='counter'>Counter</label>
                <Input onChange={onChangeInput} className='dialog__input common__input' id='counter' name='counter' type='number' value={calculatedValues.counter} diabled={true} readOnly={true} step={1} />

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
        );
    };

    return (
        <div className={`${dialogState.style ? 'dialog-background' : ''}`}>
            <Dialog
                closeDialog={closeDialog}
                dialogHeader={'Update Lesson'}>
                {renderDialogBody()}
            </Dialog>
        </div>
    );
}