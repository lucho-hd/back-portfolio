import express from 'express'

// <----------------------Controllers------------------------>
import * as portfolioApiController from '../controllers/portfolio.api.controller.js'

// <----------------------Middleware------------------------>
import { estaLogueado } from '../../middleware/auth-middleware.js'
import { validarProyecto } from '../../middleware/proyecto.validate.middleware.js'
import { validarTestimonios } from '../../middleware/testimonios.validate.middleware.js'

const router = express.Router()

// Para cualquier acción tiene que estar logueado
// router.route('api/projects*')
//     .all([estaLogueado])

// Listado de trabajos y creación de uno
router.route('/api/projects')
    .get(portfolioApiController.traerTodos)
    .post([validarProyecto], portfolioApiController.crear)

// Ver un trabajo en específico y eliminarlo
router.route('/api/projects/:idTrabajo')
    .get(portfolioApiController.traerUno)
    .delete(portfolioApiController.eliminarPorId)
    .patch([validarProyecto] ,portfolioApiController.editarPorId)

// Ver todos los testimonios de un proyecto
router.route('/api/projects/:idTrabajo/testimonios')
    .get(portfolioApiController.traerTestimonios)
    .post([validarTestimonios], portfolioApiController.crearTestimonio)

// Ver un testimonio en específico y eliminarlo
router.route('/api/projects/:idTrabajo/testimonios/:idTestimonio')
    .get(portfolioApiController.traerTestimonioPorId)
    .delete([estaLogueado], portfolioApiController.eliminarTestimonio)

// Ver la galería de imágenes de un proyecto
router.route('/api/projects/:idTrabajo/galery')
    .get(portfolioApiController.traerGaleria)
    .post(portfolioApiController.crearImagen)

// Ver una imagen de la galería de un proyecto
router.route('/api/projects/:idTrabajo/galery/:idImagen')
    .get(portfolioApiController.traerImagenPorId)
    .delete(portfolioApiController.eliminarImagen)

export default router
