import React from 'react';

interface TableHeaderProps {
    className: string,
    tHeadState: Array<Columns>
}

interface Columns {
    name: string,
    field: string,
    range?: Array<number>
}

export default function TableHeader({ className, tHeadState }: TableHeaderProps) {

    const renderTableHeader = () => {
        const headerNames = [];
        for (const headers of tHeadState) {
            headerNames.push(Object.values(headers)[0]);
        }
        return headerNames.map((el, idx) =>
            <div key={idx} className={`${className}-header`}>{el}</div>
        );
    };

    return (
        <div className={`${className}-header-container`}>
            {renderTableHeader()}
        </div>
    );
}