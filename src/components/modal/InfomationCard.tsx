import React from 'react'

import '../../styles/informationcard.scss'

export default function InformationCard() {

    const className = 'information__card'

    return (
        <div className={`${className}--container`}>
            <div className={`${className}--image`}>
                Image
            </div>
            <div className={`${className}--contents`}>
                <div className={`${className}--title`}>
                    Title
                </div>
                <div className={`${className}--info`}>
                    Infos
                </div>
            </div>
            <div className={`${className}--btn-bar`}>
                <div className={`${className}-select`}>select</div>
                <div className={`${className}-btn`}>readmore</div>
            </div>
            <div className={`${className}--read-more`}>
            </div>
        </div>
    )
}