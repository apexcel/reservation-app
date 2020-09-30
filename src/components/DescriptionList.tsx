import React from 'react'

import 'Styles/DescriptionList.scss'

interface DescriptionListProps {
    className?: string | string[],
    title: string | string[],
    children: any,
}

export default function DescriptionList({
    className, title, children}: DescriptionListProps) {

    return (
        <dl className={`desc_list ${(className ? className : '')?.toString().trim()}`}>
            <dt>{title}</dt>
            <dd>{children}</dd>
        </dl>
    )
}