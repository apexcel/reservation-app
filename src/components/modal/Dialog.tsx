import React from 'react'

interface DialogProps {
    className: string,
    dialogHeader: string | HTMLElement,
    children: any,
    closeDialog: () => void
}

export default function Dialog({ className, closeDialog, dialogHeader, children}: DialogProps): React.ReactElement {
    return (
        <dialog className={`dialog ${className}`}>
            <div className='dialog-header'>
                <div className='dialog-close-btn' onClick={closeDialog}>
                    <div className='cross-line'></div>
                    <div className='cross-line'></div>
                </div>
                {dialogHeader}
            </div>
            {children}
        </dialog>
    );
}