import express from 'express'
import * as alumnosApiController from '../controllers/alumnos.api.controller.js'

// <----------------------Middleware------------------------>
import { validarAlumno } from '../../middleware/alumno.validate.middleware.js'
import { validarIniciarSesion } from '../../middleware/auth-middleware.js'

const route = express.Router()

route.route('/api/alumnos')
    .get(alumnosApiController.traer)
    .post([validarAlumno], alumnosApiController.crear)

route.route('/api/alumnos/iniciarSesion')
    .post([validarIniciarSesion], alumnosApiController.iniciarSesion)

route.route('/api/alumnos/:id')
    .get(alumnosApiController.traerUno)
    .delete(alumnosApiController.eliminarPorId)

export default route