import React, { useEffect } from 'react'
import '../styles/table.scss'

export default function Table() {

    useEffect(() => {
        const headerWithRange = [
                {headerName: "시간", filed:"time", range: []},
                {headerName: "김현영", filed:"t1", range: [0, 2]},
                {headerName: "엄소정", filed:"t2", range: [4, 7]},
                {headerName: "이상정", filed:"t3", range: [6, 9]},
            ]
        const rowData = [
            {time: 1, t1: "현1", t2: "dat2", t3: "dat3"},
            {time: 2, t1: "현2", t2: "dat22", t3: "dat33"},
            {time: 3, t1: "현3", t2: "dat22", t3: "dat33"},
            {time: 4, t1: "현4", t2: "dat22", t3: "dat33"},
            {time: 5, t1: "현5", t2: "dat22", t3: "dat33"},
            {time: 6, t1: "현6", t2: "dat22", t3: "dat33"},
            {time: 7, t1: "현7", t2: "dat22", t3: "dat33"},
            {time: 8, t1: "현8", t2: "dat22", t3: "dat33"},
            {time: 9, t1: "현9", t2: "dat22", t3: "dat33"},
            {time: 10, t1: "현10", t2: "dat22", t3: "dat33"},
        ]
        createTableHead(headerWithRange)
        createTableBody(headerWithRange, rowData)
    }, [])

    const createTableHead = (tableHaed) => {
        const wrapper = document.getElementById("tableHeader");
        let newDiv;
        for (let i = 0; i < tableHaed.length; i++) {
            newDiv = document.createElement('div');
            newDiv.classList.add('table-header')
            const newDivText = document.createTextNode(tableHaed[i].headerName);
            newDiv.appendChild(newDivText)
            wrapper.appendChild(newDiv);
        }
    }

    const createTableBody = (thead, tableBody) => {
        const wrapper = document.getElementById("tableBody");
        let newDiv;
        for (let i = 0; i < tableBody.length; i++) {
            newDiv = document.createElement('div');
            newDiv.classList.add("table-body");
            for (let j = 0; j < thead.length; j++) {
                const newDivChild = document.createElement('div');
                newDivChild.classList.add("table-cell");
                const keys = Object.keys(tableBody[0])
                console.log(tableBody[i][keys[i]])
                let rowItem = tableBody[i][keys[j]];
                newDivChild.appendChild(document.createTextNode(rowItem))
                // if (j >= thead[i].range[0] && j <= thead[i].range[1]) {
                //     newDivChild.classList.add("table-unabled");
                // }
                // if (j === 5) {
                //     newDivChild.classList.add("break-time");
                // }
                newDiv.appendChild(newDivChild);
            }
            wrapper.appendChild(newDiv)
        }
    }

    return (
        <div id='tableWrapper' className='table-wrapper'>
            <div id="tableHeader" className='table-header-wrapper'></div>
            <div id="tableBody" className='table-body-wrapper'></div>
        </div>
    )
}