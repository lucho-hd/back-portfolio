import * as tecnologiasService from '../../services/tecnologias.services.js'

function traerTodas (req, res) {
    tecnologiasService.traerTecnologias()
        .then(function (tecnologias) {
            res.status(200).json(tecnologias)
        })
}

function crear (req, res) {
    const tecnologia = {
        name: req.body.name
    }
    tecnologiasService.crearTecnologia(tecnologia)
        .then(function (tecnologia){
            res.status(201).json(tecnologia)
        })
}

export {
    traerTodas,
    crear
}
