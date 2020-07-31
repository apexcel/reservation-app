import React from 'react'
import { isEmpty } from '../../utils/utils.ts'

interface TableRow {
    className: string,
    rowItem: Array<object>
    tHeadState: Array<TableHeaders>,
    index: number,
    onBookingHandler: () => void
}

interface TableHeaders {
    headerName: string,
    field: string
}

export default function TableRow({
    className,
    rowItem,
    tHeadState,
    index,
    onBookingHandler
}: TableRow) {

    const renderRow = () => {
        console.log(rowItem);
        let ret = [];
        let isAble = true;
        let canBooked = false;
        for (let i = 0; i < tHeadState.length; i += 1) {
            //console.log(rowItem[tHeadState[i].field]);
            const _onBookingHandler = (ev: React.MouseEvent, row = rowItem[tHeadState[i].field]) => {
                ev.preventDefault();
                onBookingHandler.call(this, ev, row, index, tHeadState[i].field)
            };

            if (!isEmpty(rowItem[tHeadState[i].field])) isAble = false;
            else isAble = true;
            if (isEmpty(rowItem[tHeadState[i].field])) canBooked = true;
            ret[i] = (
                <div
                    key={i}
                    className={`${className}-row-cell ${isAble ? `${canBooked ? "" : `${className}-booked`}` : `${className}-unable`}`}
                    onClick={_onBookingHandler}
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