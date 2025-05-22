import { useState, useEffect, useCallback } from "react";
import { obtenerPublicaciones } from "../../servicios";

export const usePublications = () => {
    const [publications, setPublications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPublications = useCallback(async () => {
        setIsLoading(true);
        try {
        const res = await obtenerPublicaciones();
        if (!res.error) {
            setPublications(res.data);
        } else {
            setError(res.message);
        }
        } catch (err) {
        setError(err.message);
        } finally {
        setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPublications();
    }, [fetchPublications]);

    return { publications, isLoading, error, fetchPublications };
};
