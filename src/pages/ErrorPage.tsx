import React from 'react'

interface ErrorPageProps {
    httpStatus: number
}

export default function ErrorPage({ httpStatus }: ErrorPageProps) {

    const renderHttpStatusCode = () => {
        const codes = {
            400: 'Bad Request',
            401: 'Unauthorized',
            403: 'Forbidden',
            404: 'Not Found'
        };
        
        return (
            <>
                <h1>{httpStatus}</h1>
                <div>{codes[httpStatus]}</div>
            </>
        )
    }

    return (
        <>
            {renderHttpStatusCode()}
        </>
    )
}