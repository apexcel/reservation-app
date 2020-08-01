import React from 'react'
import { isEmpty } from '../../utils/utils.ts'

interface TableRowProps {
    className: string,
    rowItem: Array<object>
    tHeadState: Array<Columns>,
    index: number,
    onTableRowClick: () => void
}

interface Columns {
    name: string,
    field: string
}

export default function TableRow({
    className,
    rowItem,
    tHeadState,
    index,
    onTableRowClick
}: TableRowProps) {

    const renderRow = () => {
        let ret = [];
        let isAble = true;
        let canBooked = false;
        let dinner = false;

        for (let i = 0; i < tHeadState.length; i += 1) {
            //console.log(rowItem[tHeadState[i].field]);
            const _onTableRowClick = (ev: React.MouseEvent, rowIndex = index, currentTableRowValue = rowItem[tHeadState[i].field]) => {
                ev.preventDefault();
                onTableRowClick.call(this, ev, rowIndex, currentTableRowValue, tHeadState[i])
            };

            if (!isEmpty(rowItem[tHeadState[i].field])) isAble = false;
            else isAble = true;
            if (isEmpty(rowItem[tHeadState[i].field])) canBooked = true;
            if (index === 5) dinner = true;

            ret[i] = (
                <div
                    key={i}
                    onClick={_onTableRowClick}
                    className={`${className}-row-cell ${isAble ? `${canBooked ? "" : `${className}-booked`}` : `${className}-unable`} ${dinner ? `${className}-break-time`: ""}`}
                >
                    {rowItem[tHeadState[i].field]}
                </div>
            )
        }
        return ret;
    }

    return (
        <div className={`${className}-body`}>
            {renderRow()}
        </div>
    )
}