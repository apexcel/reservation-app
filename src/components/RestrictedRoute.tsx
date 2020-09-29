import React from 'react'

interface RestrictedRoute {
    path: string | string[],
    component: React.FunctionComponent,
    fallback: React.FunctionComponent,
    exact?: boolean,
    isAllow: () => boolean
}

export default function RestrictedRoute({ 
    component, fallback, isAllow
}: RestrictedRoute) {

    return isAllow ? component : fallback;
}