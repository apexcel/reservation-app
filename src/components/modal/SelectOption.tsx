import React from 'react'

interface SelectOptionProps {
    CommonFormType,
    optionArray: Array<string>,
    onChange: () => void,
}

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
    onChange }: SelectOptionProps) {

    const options = optionArray.map((el, idx) =>
        <option key={idx}>{el}</option>);

    return (
        <div className='common__input--container'>
            <select
                className={className}
                onChange={onChange}
                id={id}
                name={name}
                defaultValue=""
            >
                {options}
            </select>
        </div>
    )
}