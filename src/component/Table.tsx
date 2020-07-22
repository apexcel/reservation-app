import React, { useEffect } from 'react'
import '../styles/table.scss'

export default function Table({ tHeadState, tBodyState }) {

    useEffect(() => {
        const columnHeader = [
            { headerName: "시간", field: "time", range: [] },
            { headerName: "김현영", field: "t1", range: [0, 5] },
            { headerName: "엄소정", field: "t2", range: [4, 7] },
            { headerName: "이상정", field: "t3", range: [7, 9] },
        ]
        const rowData = [
            { time: 1, t1: "현1", t2: "dat2", t3: "dat3" },
            { time: 2, t1: "현2", t2: "dat22", t3: "dat33" },
            { time: 3, t1: "현3", t2: "dat22", t3: "dat33" },
            { time: 4, t1: "현4", t2: "dat22", t3: "dat33" },
            { time: 5, t1: "현5", t2: "dat22", t3: "dat33" },
            { time: 6, t1: "현6", t2: "dat22", t3: "dat33" },
            { time: 7, t1: "현7", t2: "dat22", t3: "dat33" },
            { time: 8, t1: "현8", t2: "dat22", t3: "dat33" },
            { time: 9, t1: "현9", t2: "dat22", t3: "dat33" },
            { time: 10, t1: "현10", t2: "dat22", t3: "dat33" },
        ]
        createTableHead(tHeadState)
        createTableBody(tHeadState, tBodyState)
    }, [])

    const createTableHead = (tHead) => {
        const _tHeaderWrapper = document.getElementById("tableHeader");
        let _tHeader;
        for (let i = 0; i < tHead.length; i++) {
            _tHeader = document.createElement('div');
            _tHeader.classList.add('table-header')
            const newDivText = document.createTextNode(tHead[i].headerName);
            _tHeader.appendChild(newDivText)
            _tHeaderWrapper.appendChild(_tHeader);
        }
    }

    const createTableBody = (tHead, tBody) => {
        const _tBodyWrapper = document.getElementById("tableBody");
        let _tBody = null;
        
        for (let i = 0; i < tBody.length; i++) {
            _tBody = document.createElement('div');
            _tBody.classList.add("table-body");

            for (let j = 0; j < tHead.length; j++) {
                const _tCell = document.createElement('div');
                _tCell.classList.add("table-cell");
                const headerKeys = Object.keys(tBody[i])
                let row = tBody[i][headerKeys[j]];
                console.log(row)
                const headerFields = Object.values(tHead[j])
                _tCell.appendChild(document.createTextNode(row))
                if (i >= headerFields[2][0] && i <= headerFields[2][1]) {
                    _tCell.classList.add("table-unabled");
                }
                // if (j === 5) {
                //     _tCell.classList.add("break-time");
                // }
                _tBody.appendChild(_tCell);
            }
            _tBodyWrapper.appendChild(_tBody)
        }
    }

    return (
        <div id='tableWrapper' className='table-wrapper'>
            <div id="tableHeader" className='table-header-wrapper'></div>
            <div id="tableBody" className='table-body-wrapper'></div>
        </div>
    )
}