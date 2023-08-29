import express from 'express';
import * as TrabajosController from '../controllers/portfolio.controllers.js'


const router = express.Router();

// Inicio
router.get('/', function(req, res) {
    res.render('Home/inicio')
})

// Lista de trabajos
router.get('/projects/', TrabajosController.verLista)

// Ver el detalle de un trabajo
router.get('/projects/:idProyecto/', TrabajosController.verDetalle)

// Formulario de contacto
router.get('/contacto', function(req, res) {
    res.render('Contacto/Formulario')
})

export default router;