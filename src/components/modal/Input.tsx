import React from 'react'

interface InputProps<CommonFormType> {
    CommonFormType,
    
}

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
    step,
    value,
    disabled,
    readOnly,
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
                step={step}
                value={value}
                disabled={disabled}
                readOnly={readOnly}
                min={min}
                max={max}
            />
        </div>
    )
}