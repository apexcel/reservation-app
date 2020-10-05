import React, { useEffect } from 'react';

export function useTimeout(callback, wait) {
    useEffect(() => {
        if (wait !== null) {
            const paused = setTimeout(() => {
                callback();
            }, wait);
            return () => clearTimeout(paused);
        }
    }, [wait]);
}