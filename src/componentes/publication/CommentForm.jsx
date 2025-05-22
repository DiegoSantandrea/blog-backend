import { useState } from "react";
import PropTypes from "prop-types";

export const CommentForm = ({ onSubmit }) => {
    const [usuario, setUsuario] = useState("");
    const [comentario, setComentario] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!usuario.trim() || !comentario.trim()) return;
        onSubmit({ usuario: usuario.trim(), comentario: comentario.trim(), date: new Date().toISOString() });
        setUsuario("");
        setComentario("");
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md w-full mt-4 md:mt-0 md:ml-6 p-4 border border-gray-300 rounded bg-white shadow-sm">
        <div className="mb-3">
            <label htmlFor="usuario" className="block font-semibold mb-1">
            Usuario
            </label>
            <input
            id="usuario"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <div className="mb-3">
            <label htmlFor="comentario" className="block font-semibold mb-1">
            Comentario
            </label>
            <textarea
            id="comentario"
            rows="4"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out cursor-pointer">
            Publicar Comentario
        </button>
        </form>
    );
};

CommentForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
