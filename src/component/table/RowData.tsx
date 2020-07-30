import React from 'react'

interface RowData {
    className: string,
    rowState: Array<object>
    tHeadState: Array<TableHeaders>,
    index: number,
    onBookingHandler: () => void
}

interface TableHeaders {
    headerName: string,
    field: string
}

export default function RowData({
    className,
    rowState,
    tHeadState,
    index,
    onBookingHandler
}: RowData) {

    const renderRow = () => {
        //console.log(rowState);
        let ret = [];
        let isAble = true;
        let isBooked = false;
        for (let i = 0; i < tHeadState.length; i += 1) {
            //console.log(rowState[tHeadState[i].field]);
            const _onBookingHandler = (ev: React.MouseEvent, row = rowState[tHeadState[i].field]) => {
                ev.preventDefault();
                onBookingHandler.call(this, ev, row, index, tHeadState[i].field)
            };

            if (rowState[tHeadState[i].field] !== "") isBooked = true;
            if (rowState[tHeadState[i].field] === "예약불가") isAble = false;
            else isAble = true;
            ret[i] = (
                <div
                    key={i}
                    className={`${className}-row-cell ${isAble ? `${isBooked ? `${className}-booked` : ""}` : `${className}-unable`}`}
                    onClick={_onBookingHandler}
                >
                    {rowState[tHeadState[i].field]}
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