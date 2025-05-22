import { useState, useCallback } from "react";
import { obtenerPublicacionPorId as getPublicDetails } from "../../servicios";

export const usePublicationDetails = () => {
    const [publication, setPublicationDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getPublicationDetails = useCallback(async (id) => {
        setIsLoading(true);
        setError(null);
        try {
        const res = await getPublicDetails(id);
        if (!res.error) {
            setPublicationDetails(res.publication);

        } else {
            setError(res.message);
        }
        } catch (err) {
        setError(err.message);
        } finally {
        setIsLoading(false);
        }
    }, []);

    return { publication, isLoading, error, getPublicationDetails };
};
