import {Router} from 'express';
import { crearPublicacion, obtenerPublicaciones, obtenerPublicacionPorId,anadirComentario, filtrarPublicaciones,eliminarPublicacion } from '../Publicacion/publicacion.controller.js';
import { validarCrearPublicacion, validarFiltrarPublicaciones, validarAnadirComentario } from "../middlewares/publicacion-validator.js";

const router = Router();

router.post('/', validarCrearPublicacion, crearPublicacion);


router.get('/', obtenerPublicaciones);


router.get('/filter', validarFiltrarPublicaciones, filtrarPublicaciones);


router.get('/:id', obtenerPublicacionPorId);

router.delete('/:id', eliminarPublicacion);


router.patch('/:id', validarAnadirComentario, anadirComentario);


export default router;
