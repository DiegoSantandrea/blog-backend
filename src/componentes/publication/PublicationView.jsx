import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePublicationDetails } from "../../shared/hooks/usePublicationDetails";
import { LoadingSpinner } from "../../LoadingSpinner";
import { PublicationDescription } from "./PublicationDescription";
import { CommentForm } from "./CommentForm";
import { anadirComentario } from "../../servicios";

export const PublicationView = ({ fetchPublications }) => {
    const { id } = useParams();
    const { isLoading, publication, error, getPublicationDetails } = usePublicationDetails();

    useEffect(() => {
        if (id) getPublicationDetails(id);
    }, [id]);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <p>Error: {error}</p>;
    if (!publication) return <p>No se encontró la publicación</p>;

    const handleCommentSubmit = async (comentario) => {
        const res = await anadirComentario(publication._id, comentario);
        if (!res.error) {
            await getPublicationDetails(publication._id);
            if (fetchPublications) fetchPublications();
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-6">
            <div className="md:flex-1">
                <PublicationDescription publication={publication} />
            </div>
            <div className="md:w-1/3">
                <CommentForm onSubmit={handleCommentSubmit} />
            </div>
        </div>
    );
};
