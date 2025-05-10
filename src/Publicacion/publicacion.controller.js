import Publicacion from '../Publicacion/publicacion.model.js';


export const crearPost = async (req, res) => {
  try {
    const { titulo, descripcion, curso } = req.body;

    const nuevoPost = new Publicacion({ titulo, descripcion, curso });
    await nuevoPost.save();

    res.status(201).json(nuevoPost);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el post', error });
  }
};


export const obtenerPosts = async (req, res) => {
  try {
    const { fecha, titulo } = req.query;
    const filtro = {};

    if (fecha) {
      const start = new Date(fecha);
      start.setHours(0, 0, 0, 0);
      const end = new Date(fecha);
      end.setHours(23, 59, 59, 999);
      filtro.fecha = { $gte: start, $lte: end };
    }

    if (titulo) {
      filtro.titulo = { $regex: titulo, $options: 'i' };
    }

    const posts = await Publicacion.find(filtro).sort({ fecha: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener posts', error });
  }
};

export const obtenerPostPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Publicacion.findById(id);
    const comentarios = await Comment.find({ postId: id }).sort({ fecha: -1 });

    if (!post) return res.status(404).json({ mensaje: 'Publicación no encontrada' });

    res.status(200).json({ post, comentarios });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la publicación', error });
  }
};


export const filtrarPosts = async (req, res) => {
  try {
    const { course } = req.query;
    const query = { status: true };

    if (course) {
      query.course = course;
    }

    const posts = await Post.find(query).sort({ date: -1 });
    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const AnadirComentario = async (req, res) => {
  try {
    const { username, text } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post no encontrado" });

    post.comments.unshift({ username, text });
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const EliminarPost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Post no encontrado" });

    res.status(200).json({ message: "Post eliminado correctamente" });
  } catch (err) {
    res.status (500).json({ error: err.message });
  }
};