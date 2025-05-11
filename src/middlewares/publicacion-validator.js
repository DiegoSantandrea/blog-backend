import { body, param } from "express-validator";
import { validateFields } from "../middlewares/validate-fields.js";
import { handleErrors } from "../middlewares/handle-error.js";

export const cursosValidos = [
  'Technology',
  'Workshop',
  'Supervised Practice'
];

export const validarCrearPublicacion = [
  body("title")
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El título debe tener al menos 3 caracteres"),
  body("content")
    .notEmpty()
    .withMessage("El contenido es obligatorio")
    .isLength({ min: 10 })
    .withMessage("El contenido debe tener al menos 10 caracteres"),
  body("course")
    .notEmpty()
    .withMessage("El curso es obligatorio")
    .custom((value) => {
      if (!cursosValidos.includes(value)) {
        throw new Error(`El curso debe ser uno de los siguientes: ${cursosValidos.join(", ")}`);
      }
      return true;
    }),
  validateFields,
  handleErrors
];

export const validarFiltrarPublicaciones = [
  param("course")
    .optional()
    .isIn(["Technology", "Workshop", "Supervised Practice"])
    .custom((value) => {
      if (!cursosValidos.includes(value)) {
        throw new Error(`El curso debe ser uno de los siguientes: ${cursosValidos.join(", ")}`);
      }
      return true;
    }),
  param("title")
    .optional()
    .isString()
    .withMessage("El título debe ser una cadena de texto"),
  param("sortByDate")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Opción de ordenamiento inválida (asc o desc)"),
  validateFields,
  handleErrors
];

export const validarAnadirComentario = [
  body("username")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El nombre de usuario debe tener al menos 3 caracteres"),
  body("text")
    .notEmpty()
    .withMessage("El texto es obligatorio")
    .isLength({ min: 1 })
    .withMessage("El texto debe tener al menos 1 carácter"),
  validateFields,
  handleErrors
];