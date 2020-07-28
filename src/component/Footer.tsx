import React from 'react'

export default function Footer({ version }) {

    const renderFooter = () => {
        return (<div>{version}</div>)
    }

    return (
        <footer className="footer" >
            {renderFooter()}
        </footer>
    )
}