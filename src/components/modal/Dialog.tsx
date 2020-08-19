import React from 'react'

export default function Dialog({ closeDialog, dialogHeader, dialogBody}) {
    return (
        <dialog className='dialog'>
            <div className='dialog-header'>
                <div className='dialog-close-btn' onClick={closeDialog}>
                    <div className='cross-line'></div>
                    <div className='cross-line'></div>
                </div>
                {dialogHeader}
            </div>
            {dialogBody}
        </dialog>
    )
}