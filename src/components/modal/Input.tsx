import React from 'react'

interface InputProps {
    className: string,
    name: string,
    id: string,
    type: string,
    maxLength: number,
    minLength: number,
    max: number,
    min: number,
    checked: boolean,
    placeHolder: string,
    step: number,
    value: any,
    disabled: boolean,
    readOnly: boolean,
    onChange: () => void
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
}: InputProps): React.ReactElement {

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