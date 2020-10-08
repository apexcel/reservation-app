import { useEffect } from 'react';

export function useInterval(callback: ()=>void, delay: number): void {
    useEffect(() => {
        const tick = () => callback();

        if (delay !== null) {
            const tok = setInterval(tick, delay);
            return () => clearInterval(tok);
        }
    }, [delay]);
}