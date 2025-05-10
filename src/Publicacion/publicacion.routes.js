import {Router} from 'express';
import { crearPost, obtenerPosts, obtenerPostPorId,AnadirComentario, filtrarPosts,EliminarPost } from '../Publicacion/publicacion.controller.js';
import { crearPostValidator, filtrarPostsValidator, anadirComenterioValidator } from "../middlewares/publicacion-validator.js";

const router = Router();

router.post('/', crearPostValidator, crearPost);


router.get('/', obtenerPosts);


router.get('/filter', filtrarPostsValidator, filtrarPosts);


router.get('/:id', obtenerPostPorId);

router.delete('/:id', EliminarPost);


router.patch('/:id', anadirComenterioValidator, AnadirComentario);


export default router;
