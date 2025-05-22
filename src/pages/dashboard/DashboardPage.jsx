import { useState, useEffect } from "react";
import { Navbar } from "../../componentes/navbar/NavBarPage";
import { filtrarPublicaciones, obtenerPublicaciones } from "../../servicios";
import { LoadingSpinner } from "../../LoadingSpinner";
import { Publications } from "../../componentes/publication/Publications";

export const DashboardPage = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPublications = async (filters) => {
        setLoading(true);

        try {
            let response;
            if (filters) {
                response = await filtrarPublicaciones(filters);
            } else {
                response = await obtenerPublicaciones();
            }

            const publications = Array.isArray(response.data)
            ? response.data
            : response.data?.publicaciones;

            if (Array.isArray(publications)) {
                setPublications(publications);
            } else {
                console.warn("No se recibió un array de publicaciones:", publications);
                setPublications([]);
            }
        } catch (error) {
            console.error("Error al obtener publicaciones:", error);
            setPublications([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPublications();
    }, []);

    const handleFilter = (filters) => {
        fetchPublications(filters);
    };

    return (
        <div className="min-h-screen p-4 bg-gray-50">
            <Navbar onFilter={handleFilter} />
            {loading ? (
                <div className="flex justify-center items-center h-60">
                    <LoadingSpinner/>
                </div>
            ) : (
                <div className="mt-6">
                    {publications.length === 0 ? (
                        <p className="text-center text-gray-500 text-lg">No hay publicaciones.</p>
                    ) : (
                        <Publications publications={publications} />
                    )}
                </div>
            )}
        </div>
    );
};
