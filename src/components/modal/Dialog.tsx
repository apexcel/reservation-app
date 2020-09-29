import React from 'react'

interface DialogProps {
    dialogHeader: string | HTMLElement,
    children: any,
    closeDialog: () => void
}

export default function Dialog({ closeDialog, dialogHeader, children}: DialogProps) {
    return (
        <dialog className='dialog'>
            <div className='dialog-header'>
                <div className='dialog-close-btn' onClick={closeDialog}>
                    <div className='cross-line'></div>
                    <div className='cross-line'></div>
                </div>
                {dialogHeader}
            </div>
            {children}
        </dialog>
    )
}