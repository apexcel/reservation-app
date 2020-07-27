import React, { useEffect } from 'react'
import TableHeader from './TableHeader.tsx'
import '../../styles/table.scss'

export default function Table({ className, tHeadState, tBodyState }) {

    useEffect(() => {
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
                _tBody.appendChild(_tCell);
            }
            _tBodyWrapper.appendChild(_tBody)
        }
    }

    return (
        <div id='tableWrapper' className='table-wrapper'>
            <div id="tableHeader" className='table-header-wrapper'></div>
            <div id="tableBody" className='table-body-wrapper'></div>
            <TableHeader 
                className={className}
                tHeadState={tHeadState}
                />
        </div>
    )
}