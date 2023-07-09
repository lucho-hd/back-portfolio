
// <----------------------Servicios------------------------>
import * as portfolioService from '../../services/portfolio.services.js'
import * as testimoniosService from '../../services/testimonios.services.js'
import * as galeriaService from '../../services/galeria.services.js'

// <----------------------Trabajos------------------------>
function traerTodos(req, res) {
    
    const filtro = {}

    if(req.query.public) {
        filtro.public = req.query.public
    }

    if(req.query.technology) {
        filtro.technology = req.query.technology
    }

    portfolioService.traerTrabajos(filtro)
        .then(function(trabajos){
            res.status(200).json(trabajos)
        })
}

function crear(req, res) {
 
    portfolioService.guardarTrabajo(req.body)
        .then(function (nuevoTrabajo) {
            res.status(201).json(nuevoTrabajo)
        })
        .catch(function(error){
            res.status(500).json({mensaje: 'Error al guardar el trabajo'})
        })
}

function traerUno (req, res) {
    const id = req.params.idTrabajo

    portfolioService.traerTrabajoPorId(id)
        .then(function (trabajo) {
            if(trabajo) {
                res.status(200).json(trabajo)
            }else {
                res.status(404).json({mensaje: 'Trabajo no encontrado'})
            }
        })
}

function eliminarPorId (req, res) {
    const id = req.params.idTrabajo

    portfolioService.eliminarTrabajo(id)
        .then(function (trabajoEliminado){
            res.status(200).json(trabajoEliminado)
        })
        .catch(function(error) {
            res.status(500).json({mensaje: 'Error al eliminar el producto'})
        })
}

function editarPorId (req, res) {
    const id = req.params.idTrabajo
    const trabajo = {}

    if (req.body.name) {
        trabajo.name = req.body.name
    }

    if (req.body.description) {
        trabajo.description = req.body.description
    }

    if (req.body.technology) {
        trabajo.technology = req.body.technology
    }

    if (req.body.link) {
        trabajo.link = req.body.link
    }

    if (req.body.img) {
        trabajo.img = req.body.img
    }

    if (req.body.public) {
        trabajo.public = req.body.public
    }

    portfolioService.editarTrabajo(id, req.body)
        .then(function () {
            return portfolioService.traerTrabajoPorId(id)
        })
        .then(function (trabajoEditado){
            res.status(200).json(trabajoEditado)
        })
}

// <----------------------Testimonios------------------------>
function traerTestimonios (req, res) {
    const id = req.params.idTrabajo

    testimoniosService.traerTestimonios(id)
        .then(function (testimonios) {
            res.status(200).json(testimonios)
        })
}

function crearTestimonio (req, res) {
    const id = req.params.idTrabajo

    testimoniosService.crearTestimonio(id, req.body)
        .then(function (testimonio) {
            res.status(201).json(testimonio)
        })
        .catch(function (error){
            res.status(500).json({mensaje: 'Error al crear el testimonio'})
        })
}

function traerTestimonioPorId (req, res) {
    const id = req.params.idTestimonio

    testimoniosService.traerTestimonioPorId(id)
    .then(function (testimonio) {
        if(testimonio) {
            res.status(200).json(testimonio)
        }else {
            res.status(404).json({mensaje: 'Testimonio no encontrado'})
        }
    })
}

function eliminarTestimonio (req, res) {
    const id = req.params.idTestimonio

    testimoniosService.eliminarTestimonio(id)
        .then(function(testimonioEliminado) {
            res.status(200).json(testimonioEliminado)
        })
        .catch(function(error){
            res.status(500).json({mensaje: 'Error al eliminar el testimonio'})
        })
}

// <----------------------Galería------------------------>
function traerGaleria (req, res) {
    const id = req.params.idTrabajo

    galeriaService.traerGaleria(id)
        .then(function (imagenes){
            res.status(200).json(imagenes)
        })
}

function crearImagen (req, res) {
    const id = req.params.idTrabajo
    const imagen = {
        url: req.body.url,
        description: req.body.description
    }

    galeriaService.nuevaImagen(id, imagen)
        .then(function (imagenes) {
            res.status(201).json(imagenes)
        })
        .catch(function (error){
            res.status(500).json({mensaje: 'Error al crear la imagen'})
        })
}


function traerImagenPorId (req, res) {
    const id = req.params.idImagen

    galeriaService.traerImagenPorID(id)
    .then(function (imagen) {
        if(imagen) {
            res.status(200).json(imagen)
        }else {
            res.status(404).json({mensaje: 'Imagen no encontrada'})
        }
    })
}

function eliminarImagen (req, res) {
    const id = req.params.idImagen
    
    galeriaService.eliminarImagen(id)
        .then(function (imagenEliminada){
            res.status(201).json(imagenEliminada)
        })
        .catch(function (error) {
            res.status(500).json({mensaje: 'Error al eliminar la imagen'})
        })
}

export {
    traerTodos,
    crear,
    traerUno,
    eliminarPorId,
    editarPorId,
    traerTestimonios,
    crearTestimonio,
    traerTestimonioPorId,
    eliminarTestimonio,
    traerGaleria,
    crearImagen,   
    traerImagenPorId,
    eliminarImagen
}