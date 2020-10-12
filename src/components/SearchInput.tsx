import React, {useRef, useState} from 'react';

import SVG from '@/components/modal/SVG.tsx';

import '@/styles/SearchInput.scss';

interface SearchInputProps {
    className: string,
    type: string,
    id: string,
    name: string,
    placeholder: string,
    maxLength: number,
    onChange: () => void,
    searchEvent: () => void,
}

export default function SearchInput({
    className,
    type,
    id,
    name,
    placeholder,
    maxLength,
    onChange,
    searchEvent
}: SearchInputProps): React.ReactElement {

    const _ref = useRef<HTMLInputElement>(null);
    const [_isFocus, _setIsFocus] = useState(false);
    const _getFocus = () => _ref.current?.focus();

    return (
        <>
            <div className={`search__input_wrapper ${className ? className : ''} ${_isFocus ? 'focused' : 'unfocused'}`} onClick={_getFocus}>
                <SVG className='svg-icon' name='search_icon' width={30} height={30} />
                <input
                    className={`search__input`}
                    ref={_ref}
                    id={id}
                    name={name}
                    maxLength={maxLength}
                    type={type ? type : 'text'}
                    placeholder={placeholder ? placeholder : ''}
                    onChange={onChange}
                    onKeyDown={searchEvent}
                    onFocus={() => _setIsFocus(true)}
                    onBlur={() => _setIsFocus(false)}
                />
                <button className='btn inserted-search-btn' onClick={searchEvent}>검색</button>
            </div>
        </>
    );
}