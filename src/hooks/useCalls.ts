import { useEffect, useState } from 'react';
import { getCalls } from '../api/api';
import { Call } from '../types/ICall'; // Импорт типа Call, если он у тебя есть

interface Filters {
    limit: number;
    offset: number;
    sort_by: 'date' | 'duration';
    order: 'ASC' | 'DESC';
    in_out?: 0 | 1 | undefined;
    date_start?: string;
    date_end?: string;
}

const useCalls = (filters?: Filters) => {
    const [data, setData] = useState<Call[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getCalls(filters);

                setData(response.results);
                console.log(response.results);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [JSON.stringify(filters)]);

    return { data, loading, error };
};
export default useCalls;
