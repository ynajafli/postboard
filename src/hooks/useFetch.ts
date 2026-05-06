import { useState, useEffect } from "react";

export function useFetch<T>(url: string | null): {
    data: T | null,
    isLoading: boolean,
    error: string | null,
} {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (url === null) return;

        const fetchUrl = url;

        let cancelled = false;
        async function fetchData() {
            try {
                setIsLoading(true);
                const response = await fetch(fetchUrl);
                if (response.ok) {
                    const jsonResponse = await response.json();
                    if (!cancelled) setData(jsonResponse);
                } else {
                    throw new Error('Request failed!');
                }
            } catch (error) {
                if (!cancelled) setError(error instanceof Error? error.message : 'Error');
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }
        fetchData();

        return () => {
            cancelled = true;
        }

    }, [url]);
    
    return { data, isLoading, error }
}