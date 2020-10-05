import React from 'react';
import TableBody from './TableBody.tsx';
import TableHeader from './TableHeader.tsx';

import '../../styles/table.scss';

interface Columns {
    name: string,
    field: string
}

interface Rows {
    [key: string]: any
}

interface TableProps {
    tHeadState: Array<Columns>
    tBodyState: Array<Rows>
    onTableRowClick: () => void
}

export default function Table({ 
    tHeadState, 
    tBodyState, 
    onTableRowClick }: TableProps) {

    const className = "simple__table";

    return (
        <div className={`${className}-container`}>
            <TableHeader
                className={className}
                tHeadState={tHeadState}
            />
            <TableBody 
                className={className}
                tHeadState={tHeadState}
                tBodyState={tBodyState}
                onTableRowClick={onTableRowClick}
            />
        </div>
    );
}