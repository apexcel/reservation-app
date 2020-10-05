import React from 'react';

import 'Styles/CardBox.scss';

interface CardBoxProps {
    children: any
    title: string,
    footer: string | HTMLElement,
}

export default function CardBox({
    children,
    title,
    footer
}: CardBoxProps):React.ReactElement{

    return (
        <div className={`cardbox-container`}>
            <div className={`cardbox-wrapper`}>
                <div className={`cardbox-header`}>
                    <h2 className='cardbox-title'>{title}</h2>
                </div>
                <div className={`cardbox-content`}>
                    {children}
                </div>
                <div className={`cardbox-footer`}>
                    {footer ? 
                    <div className='cardbox-btn-wrapper'>
                        <div className='btn cardbox-btn'>
                            {footer} 
                        </div>
                    </div> : null}
                </div>
            </div>
        </div>
    );
}