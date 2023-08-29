import * as PortfolioServices from '../services/portfolio.services.js'
import * as TecnologiasServices from '../services/tecnologias.services.js'

function verLista(req, res) {
    PortfolioServices.traerTrabajos()
        .then(function(trabajos) {
            res.render('Portfolio/Lista', {trabajos})
        })
}

function verTabla(req, res) {
    PortfolioServices.traerTrabajos()
        .then(function(trabajos){
            res.render('Admin/Tabla', {trabajos})
        })
}

async function verDetalle(req, res) {
    const id = req.params.idProyecto
    let trabajo    = await PortfolioServices.traerTrabajoPorId(id)

    if(trabajo) {
        res.render('Portfolio/Detalle', {trabajo}   )
    }else {
        res.status(404).send('Trabajo no encontrado')
    }
}

function formAgregar(req, res) {
    TecnologiasServices.traerTecnologias()
        .then(function(tecnologias) {
            res.render('Admin/Cargar', { tecnologias })
        })
}

function guardar(req, res) {
    const trabajo = {
        name: req.body.name,
        description: req.body.description,
        technology: req.body.technology, 
        link: req.body.link,
        img: req.body.img,
        public: req.body.condition,
    }

    PortfolioServices.guardarTrabajo(trabajo)
        .then(function (nuevoTrabajo) {
            res.render('Exito', { mensaje: `Trabajo creado exitosamente <a href= "/projects/"> volver a la lista de trabajos</a>`})
        })
        .catch(function(error){
            res.render('Error', { mensaje: `Ocurrió un error inesperado al crear el trabajo` })
        })
}

function formEliminar(req, res) {
    const id = req.params.idProyecto

    PortfolioServices.traerTrabajoPorId(id)
        .then(function(trabajo) {
            if (trabajo) {
                res.render('Admin/Eliminar', { trabajo })
            }else {
                res.render('404', {mensaje: 'Lo sentimos, pero el trabajo que estás buscando no ha sido encontrado'})
            }
        })
}

function eliminar(req, res) {
    const id = req.params.idProyecto

    PortfolioServices.eliminarTrabajo(id)
        .then(function(resultado){
            res.render('Exito', { mensaje: `El trabajo ha sido eliminado con éxito <a href="/admin/projects">volver a admin</a>` })
        })
        .catch(function(error){
            res.render('Error', { mensaje: `Ocurrió un error inesperado al elimnar el trabajo` })
        })
}

function formEditar(req, res) {
    const id = req.params.idProyecto
    let tecnologias

    TecnologiasServices.traerTecnologias()
        .then(function(tecnos) {
            tecnologias = tecnos
            return PortfolioServices.traerTrabajoPorId(id)
        })
        .then(function(trabajo){
            if(trabajo) {
                res.render('Admin/Editar', { trabajo, tecnologias })
            }else{
                res.render('404', { mensaje: 'Lo sentimos, pero el trabajo que estás buscando no ha sido encontrado' })
            }
     })
}

function editar(req, res) {
    const id = req.params.idProyecto

    const trabajo = {
        name: req.body.name, 
        description: req.body.description,
        technology: req.body.technology,
        link: req.body.link,
        img: req.body.img,
        public: req.body.condition
    }

    PortfolioServices.editarTrabajo(id, trabajo)
        .then(function(resultado) {
            res.render('Exito', { mensaje: `El trabajo ha sido editado correctamente <a href="/projects">Ver lista de trabajos</a>` })
        })
        .catch(function(error){
            res.render('Error', { mensaje: `Ocurrió un error inesperado al tratar de editar el trabajo` })
        })
}

export {
    verLista,
    verDetalle,
    verTabla,
    formAgregar,
    formEliminar,
    formEditar,
    guardar,
    eliminar,
    editar
}