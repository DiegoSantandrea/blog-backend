import Publicacion from '../Publicacion/publicacion.model.js';


export const crearPublicacion = async (req, res) => {
  try {
    const { titulo, descripcion, curso } = req.body;

    const nuevaPublicacion = new Publicacion({ titulo, descripcion, curso });
    await nuevaPublicacion.save();

    res.status(201).json(nuevaPublicacion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la publicación', error });
  }
};


export const obtenerPublicaciones = async (req, res) => {
  try {
    const { fecha, titulo } = req.query;
    const filtro = {};

    if (fecha) {
      const inicio = new Date(fecha);
      inicio.setHours(0, 0, 0, 0);
      const fin = new Date(fecha);
      fin.setHours(23, 59, 59, 999);
      filtro.fecha = { $gte: inicio, $lte: fin };
    }

    if (titulo) {
      filtro.titulo = { $regex: titulo, $options: 'i' };
    }

    const publicaciones = await Publicacion.find(filtro).sort({ fecha: -1 });
    res.status(200).json(publicaciones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener publicaciones', error });
  }
};

export const obtenerPublicacionPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const publicacion = await Publicacion.findById(id);
    const comentarios = await Comment.find({ postId: id }).sort({ fecha: -1 });

    if (!publicacion) return res.status(404).json({ mensaje: 'Publicación no encontrada' });

    res.status(200).json({ publicacion, comentarios });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la publicación', error });
  }
};


export const filtrarPublicaciones = async (req, res) => {
  try {
    const { course } = req.query;
    const consulta = { status: true };

    if (course) {
      consulta.course = course;
    }

    const publicaciones = await Post.find(consulta).sort({ date: -1 });
    return res.status(200).json({
      success: true,
      publicaciones,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const anadirComentario = async (req, res) => {
  try {
    const { username, text } = req.body;

    const publicacion = await Post.findById(req.params.id);
    if (!publicacion) return res.status(404).json({ error: "Publicación no encontrada" });

    publicacion.comments.unshift({ username, text });
    await publicacion.save();
    res.status(200).json(publicacion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const eliminarPublicacion = async (req, res) => {
  try {
    const eliminada = await Post.findByIdAndDelete(req.params.id);
    if (!eliminada) return res.status(404).json({ error: "Publicación no encontrada" });

    res.status(200).json({ mensaje: "Publicación eliminada correctamente" });
  } catch (err) {
    res.status (500).json({ error: err.message });
  }
};