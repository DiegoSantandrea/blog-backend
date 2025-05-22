import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const Publications = ({ publications }) => {
    const navigate = useNavigate();

    const navigateToPublication = (id) => {
        navigate(`/publicacion/${id}`);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publications.map((pub ) => {

                return (
                    <div
                        key={pub._id}
                        className="cursor-pointer border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-4 bg-white"
                        onClick={() => navigateToPublication(pub._id)}
                    >
                        <h2 className="font-semibold text-lg mb-2 text-blue-800">{pub.titulo}</h2>
                        <p className="text-sm text-gray-600 mb-2">Curso: {pub.curso}</p>
                    </div>
                );
            })}
        </div>
    );
};

Publications.propTypes = {
    publications: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            titulo: PropTypes.string.isRequired,
            curso: PropTypes.string.isRequired
        })
    ).isRequired,
};
