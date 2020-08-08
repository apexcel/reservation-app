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
        let rows = [];

        for (let i = 0; i < tHeadState.length; i += 1) {
            //console.log(rowItem)
            //console.log(logs(i))
            //console.log(tHeadState[i]);

            const _onTableRowClick = (ev: React.MouseEvent, rowIndex = index, currentTableRowValue = rowItem[tHeadState[i].field]) => {
                ev.preventDefault();
                onTableRowClick.call(this, ev, rowIndex, currentTableRowValue, tHeadState[i])
            };

            const classNames = [
                `${className}-row-cell`,
            ]
            let isClickable = true;

            isEmpty(rowItem[tHeadState[i].field]) ? classNames.push(`${className}-not-booked`) : classNames.push(`${className}-booked`);
            index === 5 ? classNames.push(`${className}-break-time`) : null;
            if (tHeadState[i].range) {
                if (tHeadState[i].range[0] <= index && tHeadState[i].range[1] > index) {
                    classNames.push(`${className}-unable`)
                    isClickable = false;
                }
            }

            const children = rowItem[tHeadState[i].field]
            rows[i] = row(i, children, classNames, (isClickable ? _onTableRowClick : null))
        }
        return rows;
    }

    const row = (key, children, classNames, onClick) => {
        const className = ''.concat(classNames.join(' '));
        return (
            <div
                key={key}
                className={className}
                onClick={onClick ? onClick : null}>
                {children}
            </div>
        )
    }

    return (
        <div className={`${className}-body`}>
            {renderRow()}
        </div>
    )
}