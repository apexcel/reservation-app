import React from 'react'

export default function SelectOption({
    className,
    name,
    id,
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
        <div className='common__input--container'>
            <select
                className={className}
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