import React from 'react';
import { isEmpty } from '../../../utils/utils.ts';
import { userStateAtom } from 'Atoms/globalAtoms.ts';
import { useRecoilValue } from 'recoil';

interface TableRowProps {
    className: string,
    rowItem: Array<Record<string, unknown>>
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

    const userState = useRecoilValue(userStateAtom);

    const renderRows = () => {
        const rows = [];

        for (let i = 0; i < tHeadState.length; i += 1) {
            //console.log(rowItem);
            //console.log(tHeadState[i]);
            //console.log(index)

            const _onTableRowClick = (ev: React.MouseEvent, rowIndex = index, currentTableRowValue = rowItem[tHeadState[i].field]) => {
                ev.preventDefault();
                onTableRowClick.call(this, ev, rowIndex, currentTableRowValue, tHeadState[i]);
            };
            const classNames = [`${className}-row-cell`];
            const children = rowItem[tHeadState[i].field];
            let isClickable = true;

            // row가 비어있는지 확인
            isEmpty(rowItem[tHeadState[i].field]) ? classNames.push(`${className}-not-booked`) : classNames.push(`${className}-booked`);
            // break-time 확인
            index === 5 ? classNames.push(`${className}-break-time`) : null;
            // unabled table range 확인
            if (tHeadState[i].range) {
                if (tHeadState[i].range[0] <= index && tHeadState[i].range[1] > index) {
                    if (userState.isAdmin) {
                        classNames.push(`${className}-unable-admin`);
                        isClickable = userState.isAdmin;
                    }
                    else {
                        classNames.push(`${className}-unable`);
                        isClickable = false;
                    }
                }
            }

            rows[i] = row(i, children, classNames, (isClickable ? _onTableRowClick : null));
        }
        return rows;
    };

    const row = (key: number, children: any, classNames: string[], onClick) => {
        const className = ''.concat(classNames.join(' '));
        return (
            <div
                key={key}
                className={className}
                onClick={onClick}>
                {children}
            </div>
        );
    };

    return (
        <div className={`${className}-body`}>
            {renderRows()}
        </div>
    );
}