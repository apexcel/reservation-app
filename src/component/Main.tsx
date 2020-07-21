import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Main({ userInfo }) {

    const [val, setVal] = useState();

    const openModal = (event) => {
        event.preventDefault();
        const modal = document.getElementById('favDialog')
        //modal.style.display = 'block'
        modal.showModal()
    };

    const changeVal = (event) => {
        event.preventDefault();
        setVal(event.target.value)
    }

    return (
        <div>
            <dialog id="favDialog">
                <form method="dialog">
                    <section>
                        <p><label htmlFor="teachers">Favorite animal:</label>
                            <select id="teachers" name="teachers">
                                <option></option>
                                <option>[C] 소정</option>
                                <option>[C] 현영</option>
                                <option>[J] 상정</option>
                            </select></p>
                    </section>
                    <menu>
                        <button id="cancel" type="reset">Cancel</button>
                        <button type="submit">Confirm</button>
                    </menu>
                </form>
            </dialog>
            <button onClick={openModal} >Open</button>
            <input id='change' onChange={changeVal} />
            <p id='target'>{val}</p>
        </div>
    )
}