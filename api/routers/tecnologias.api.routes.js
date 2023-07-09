import express from 'express'
import * as tecnologiasApiController from '../controllers/tecnologias.api.controller.js'

const route = express.Router()

// Mostrar todas las tecnologías
route.route('/api/tecnologias')
    .get(tecnologiasApiController.traerTodas)
    .post(tecnologiasApiController.crear)

export default route