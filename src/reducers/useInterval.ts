import React, { useEffect } from 'react'

export function useInterval(callback, delay) {
    useEffect(() => {
        const tick = () => callback();

        if (delay !== null) {
            let tok = setInterval(tick, delay);
            return () => clearInterval(tok);
        }
    }, [delay]);
};