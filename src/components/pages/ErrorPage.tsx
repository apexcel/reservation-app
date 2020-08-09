import React from 'react'

export default function ErrorPage({ httpStatus }) {

    const renderHttpStatusCode = () => {

        const codes = {
            400: 'Bad Request',
            401: 'Unauthorized',
            403: 'Forbidden',
            404: 'Not Found'
        }

        console.log(codes)

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