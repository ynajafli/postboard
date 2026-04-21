import { useState, useEffect } from "react";

export function useFetch<T>(url: string): {
    data: T | null,
    isLoading: boolean,
    error: string | null,
} {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        async function fetchData() {
            try {
                setIsLoading(true);
                const response = await fetch(url);
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