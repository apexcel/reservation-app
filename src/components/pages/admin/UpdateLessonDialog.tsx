import React from 'react'
import SelectOption from '../../modal/SelectOption.tsx';
import Dialog from '../../modal/Dialog.tsx'

// TEST Array
const testArr = [
    'M1C4',
    'M2C5',
    'M2C9',
    'M3C13',
    'M6C26'
];
export default function UpdateLessonDialog({ closeDialog }) {
    return (
        <Dialog
            closeDialog={closeDialog}
            dialogHeader={'Update Lesson'}
            dialogBody={<SelectOption id='lesson' name='lesson' optionArray={testArr} />}
        />
    )
}