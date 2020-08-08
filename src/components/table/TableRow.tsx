import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { isEmpty } from '../../utils/utils.ts'
import { tableRowStateAtom } from '../../atoms/tableAtoms.ts'

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
    range?: Array<number>
}

export default function TableRow({
    className,
    rowItem,
    tHeadState,
    index,
    onTableRowClick
}: TableRowProps) {

    //TODO: 각 Row별로 State 만들기
    function logs(idx) {
        const [id, setId] = useRecoilState(tableRowStateAtom(idx))
    }

    const renderRow = () => {
        let ret = [];

        for (let i = 0; i < tHeadState.length; i += 1) {
            //console.log(rowItem)
            //console.log(logs(i))
            //console.log(tHeadState[i]);

            const _onTableRowClick = (ev: React.MouseEvent, rowIndex = index, currentTableRowValue = rowItem[tHeadState[i].field]) => {
                ev.preventDefault();
                onTableRowClick.call(this, ev, rowIndex, currentTableRowValue, tHeadState[i])
            };

            let isAble = isEmpty(rowItem[tHeadState[i].field]) ? true : false;
            let canBook = isEmpty(rowItem[tHeadState[i].field]) ? true : false;
            let dinner = (index === 5) ? true : false;
            let checker = false;
            if (tHeadState[i].range) {
                if (tHeadState[i].range[0] <= index && tHeadState[i].range[1] > index) {
                    checker = true;
                }
            }

            ret[i] = (
                <div
                    key={i}
                    onClick={_onTableRowClick}
                    className={`${className}-row-cell ${checker ? 'checked' : 'false'} ${isAble ? `${canBook ? "" : `${className}-booked`}` : `${className}-unable`} ${dinner ? `${className}-break-time`: ""}`}
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