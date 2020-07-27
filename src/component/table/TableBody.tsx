import React, {useEffect, useState} from 'react'
import RowData from './RowData.tsx'

export default function TableBody({ className, tHeadState, tBodyState }) {

    const [ables, setAbles] = useState([]);

    useEffect(() => {
        check()
        console.log(ables)
    }, [])

    const check = () => {
        console.log(tBodyState)
        console.log(tHeadState)
        console.log(Object.keys(tBodyState))
        for (let i = 0; i < tHeadState.length; i += 1) {
            for (let j = 0; j < tBodyState.length; j += 1) {
                if ((tHeadState[i].field === Object.keys(tBodyState[j])[i]) &&
                    parseInt(Object.keys(tBodyState)[j]) >= tHeadState[i].range[0] &&
                    parseInt(Object.keys(tBodyState)[j]) <= tHeadState[i].range[1]) {
                        ables.push({
                            field: tHeadState[i].field,
                            row: tBodyState[j][tHeadState[i].field],
                            index: j,
                            able: true
                        });
                }
                else {
                    ables.push({
                        field: tHeadState[i].field,
                        row: tBodyState[j][tHeadState[i].field],
                        index: j,
                        able: false
                    });
                }
            }
        }
    }

    const renderTableBody = () => {
        return tBodyState.map((el, idx) => 
            <div key={idx} className={`${className}-body`}>
                <RowData 
                    className={className}
                    tHeadState={tHeadState}
                    tBodyState={tBodyState}
                    values={el}
                />
            </div>
        )
    }
    return (
        <>
            {renderTableBody()}
        </>
    )
}