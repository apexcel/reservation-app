import React from 'react'
import { isEmpty } from '../../utils/utils.ts'

interface TableRow {
    className: string,
    rowItem: Array<object>
    tHeadState: Array<Columns>,
    index: number,
    onBookingHandler: () => void
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
    onBookingHandler
}: TableRow) {

    const renderRow = () => {
        let ret = [];
        let isAble = true;
        let canBooked = false;
        let dinner = false;

        for (let i = 0; i < tHeadState.length; i += 1) {
            //console.log(rowItem[tHeadState[i].field]);
            const _onBookingHandler = (ev: React.MouseEvent, row = rowItem[tHeadState[i].field]) => {
                ev.preventDefault();
                onBookingHandler.call(this, ev, row, index, tHeadState[i].field)
            };

            if (!isEmpty(rowItem[tHeadState[i].field])) isAble = false;
            else isAble = true;
            if (isEmpty(rowItem[tHeadState[i].field])) canBooked = true;
            if (index === 5) dinner = true;

            ret[i] = (
                <div
                    key={i}
                    onClick={_onBookingHandler}
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