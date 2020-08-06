import React from 'react'

export default function Input({
    className,
    name,
    id,
    labelTitle,
    type,
    maxLength,
    minLength,
    max,
    min,
    placeHolder,
    onChangeInput }) {

    return (
        <div className='input-box'>
            {labelTitle ? <h3><label htmlFor={id}>{labelTitle}</label></h3> : null}
            <input
                className='form-input'
                onChange={onChangeInput}
                id={id}
                type={type}
                name={name}
                placeholder={placeHolder}
                maxLength={maxLength}
            />
        </div>
    )
}