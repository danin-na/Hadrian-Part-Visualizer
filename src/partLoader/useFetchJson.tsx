import { useState, useEffect } from 'react';

export function useFetchJson (url: string)
{
    const [data, setData] = useState(null);

    useEffect(() =>
    {
        async function fetchData ()
        {
            const response = await fetch(url);
            if (response.ok) {
                const jsonData = await response.json();
                setData(jsonData);
            }
        }
        fetchData();
    }, [url]);

    return { data };
}

