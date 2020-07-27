import React from 'react'

interface TableHeader {
    className: string,
    tHeadState: Array<Columns>
}

interface Columns {
    headerName: string,
    field: string,
    range: Array<number>
}

export default function TableHeader({ className, tHeadState }: TableHeader) {

    const renderTableHeader = () => {
        let headerNames = [];
        for (let headers of tHeadState) {
            headerNames.push(Object.values(headers)[0])
        }
        return headerNames.map((el, idx) =>
            <div key={idx} className={`${className}-header`}>{el}</div>
        )
    }


    return (
        <div className={`${className}-header-wrapper`}>
            {renderTableHeader()}
        </div>
    )
}