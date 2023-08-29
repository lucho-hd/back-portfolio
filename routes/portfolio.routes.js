import express from 'express'
import * as TrabajosController from '../controllers/portfolio.controllers.js'

const router = express.Router()

// Ver la tabla de trabajos en la vista de administrador
router.get('/admin/projects/', TrabajosController.verTabla)

// Crear un nuevo trabajo
router.route('/admin/projects/nuevo')
    .get(TrabajosController.formAgregar)
    .post(TrabajosController.guardar)

// Eliminar un trabajo
router.route('/admin/projects/:idProyecto/eliminar')
.get(TrabajosController.formEliminar)
.post(TrabajosController.eliminar)

// Editar un trabajo
router.route('/admin/projects/:idProyecto/editar')
    .get(TrabajosController.formEditar)
    .post(TrabajosController.editar)

export default router 

