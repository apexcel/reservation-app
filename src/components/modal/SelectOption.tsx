import React from 'react'

export default function SelectOption({
    className,
    name,
    id,
    labelTitle,
    type,
    maxLength,
    minLength,
    max,
    min,
    optionArray,
    onChangeInput }) {

    const options = optionArray.map((el, idx) =>
        <option key={idx}>{el}</option>);

    return (
        <div className='input-box'>
            {labelTitle ? <h3><label htmlFor={id}>{labelTitle}</label></h3> : null}
            <select
                className='form-input'
                onChange={onChangeInput}
                id={id}
                name={name}
                defaultValue=""
            >
                {options}
            </select>
        </div>
    )
}