import React, { useState } from 'react'
import Dialog from '../../modal/Dialog.tsx'


export default function LessonDialog({ closeDialog }) {


    

    return (
        <Dialog 
            dialogHeader={'hi'}
            dialogBody={'body'}
            closeDialog={closeDialog}
        />
    )
}