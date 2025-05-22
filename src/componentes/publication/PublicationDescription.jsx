import PropTypes from "prop-types";

export const PublicationDescription = ({ publication }) => {
    const { titulo, descripcion, curso, comentarios, fecha } = publication;

    return (
        <div>
        <h1 className="text-3xl font-bold mb-4">{titulo}</h1>
        <p className="mb-4 text-gray-700">{descripcion}</p>
        <p className="mb-2 font-semibold text-blue-800">Curso: {curso}</p>
        <p className="mb-4 text-sm text-gray-500">Fecha: {new Date(fecha).toLocaleDateString()}</p>

        <div>
            <h2 className="text-2xl font-semibold mb-2">Comentarios</h2>
            {comentarios.length === 0 ? (
            <p className="text-gray-500 italic">No hay comentarios aún. Sé el primero en comentar!</p>
            ) : (
            comentarios.map((c, i) => (
                <div key={i} className="border border-gray-200 bg-gray-50 rounded-md p-3 mb-3 shadow-sm">
                <p className="font-semibold text-blue-600">{c.usuario} <span className="text-gray-500 font-normal">dijo:</span></p>
                <p className="text-gray-700">{c.comentario}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(c.fecha).toLocaleString()}</p>
                </div>
            ))
            )}
        </div>
        </div>
    );
};

PublicationDescription.propTypes = {
    publication: PropTypes.shape({
        titulo: PropTypes.string.isRequired,
        descripcion: PropTypes.string.isRequired,
        curso: PropTypes.string.isRequired,
        comentarios: PropTypes.arrayOf(
        PropTypes.shape({
            usuario: PropTypes.string.isRequired,
            comentario: PropTypes.string.isRequired,
            fecha: PropTypes.string.isRequired,
        })
        ).isRequired,
        fecha: PropTypes.string.isRequired,
    }).isRequired,
};
