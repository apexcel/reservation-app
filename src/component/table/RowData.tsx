import React from 'react'

interface RowData {
    className: string,
    rowState: Array<object>
    tHeadState: Array<TableHeaders>,
    currentDay: Date,
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
    currentDay,
    index,
    onBookingHandler
}: RowData) {

    const renderRow = () => {
        //console.log(rowState);
        let ret = [];
        let able = true;
        for (let i = 0; i < tHeadState.length; i += 1) {
            //console.log(rowState[tHeadState[i].field]);
            const _onBookingHandler = (ev: React.MouseEvent, rowStat = (rowState[tHeadState[i].field])) => {
                ev.preventDefault();
                if (!rowStat) {
                    alert(`${rowStat} ${new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), index + 1)} 에 예약?`);
                }
                onBookingHandler.call(this, ev, rowStat)
            };

            if (rowState[tHeadState[i].field] === "" || rowState[tHeadState[i].field] === undefined) able = false;
            else able = true;
            ret[i] = (
                <div
                    key={i}
                    className={`${className}-row-cell ${able ? null : "unable"}`}
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