import { useState } from "react";
import PropTypes from "prop-types";

export const Navbar = ({ onFilter }) => {
    const [curso, setcurso] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter({ curso });
    };

    return (
        <nav className="bg-gray-100 p-4 flex flex-col md:flex-row md:items-center md:space-x-4">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:space-x-4 w-full max-w-4xl mx-auto">
            
            <input
            type="text"
            placeholder="Curso"
            value={curso}
            onChange={(e) => setcurso(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 mb-2 md:mb-0 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />

            <button 
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
            >
            Filtrar
            </button>
        </form>
        </nav>
    );
};

Navbar.propTypes = {
    onFilter: PropTypes.func.isRequired,
};
