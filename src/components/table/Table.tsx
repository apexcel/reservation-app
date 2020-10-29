import React from 'react';
import TableBody from './TableBody.tsx';
import TableHeader from './TableHeader.tsx';

import { IColumn, IRow } from 'types/@oogie826/table';
import '../../styles/Table.scss';

interface TableProps {
    tHeadState: Array<IColumn>
    tBodyState: Array<IRow>
    onTableRowClick: () => void
}

export default function Table({ 
    tHeadState, 
    tBodyState, 
    onTableRowClick }: TableProps): React.ReactElement {

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