import React from 'react'

export default function Input({
    className,
    name,
    id,
    type,
    maxLength,
    minLength,
    max,
    min,
    checked,
    placeHolder,
    onChange
}) {

    return (
        <div className='common__input--container'>
            <input
                className={`${className}`}
                onChange={onChange}
                id={id}
                type={type}
                name={name}
                placeholder={placeHolder}
                maxLength={maxLength}
                checked={checked}
            />
        </div>
    )
}