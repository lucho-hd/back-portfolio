
// <----------------------Servicios------------------------>
import * as alumnosService from '../../services/alumnos.services.js'
import * as tokenServices from '../../services/token.services.js'

// <----------------------JWT------------------------>
import Jwt   from 'jsonwebtoken'

function traer(req, res) {
    const filtro = {}

    alumnosService.traer(filtro)
        .then(function(alumnos) {
            res.status(200).json(alumnos)
        })
}

function traerUno(req, res) {
    const id = req.params.id

    alumnosService.traerUno(id)
        .then(function(alumno) {
            if(alumno) {
                res.status(200).json(alumno)
            }else{
                res.status(404).json({ mensaje: 'Usuario no encontrado.' })
            }
        })
}

function crear(req, res) {
  
    alumnosService.crear(req.body)
        .then(function(alumnoNuevo) {
            res.status(201).json(alumnoNuevo)
        })
        .catch(function(error) {
            res.status(400).json({ mensaje: error.message })
        })
}

function eliminarPorId(req, res) {
    const id = req.params.id

    alumnosService.eliminarPorId(id)
        .then(function() {
            res.status(204).end()
        })
}

function iniciarSesion(req, res) {
    const alumno = {
        email: req.body.email,
        password: req.body.password,
    }

    alumnosService.iniciarSesion(alumno)
        .then(function(alumno) {
            const token = Jwt.sign({id: alumno._id, rol: 'admin'}, 'bono4523')

            tokenServices.crear({token: token, alumno_id: alumno._id})
                .then(function() {
                    res.status(200).json({token, alumno})
                })
                .catch(function(error) {
                    res.status(500).json({mensaje: 'Hubo un error al crear el token.'})
                })
        })
        .catch(function(error) {
            res.status(400).json({mensaje: error.message})
        })
}

function cerrarSesion(req, res) {
    const token = req.header['auth-token']

    tokenServices.eliminarToken(token)
        .then(function() {
            res.status(200).json({mensaje: 'La sesión se ha cerrado correctamente.'})
        })
}


export {
    traer,
    crear,
    traerUno,
    eliminarPorId,
    iniciarSesion,
    cerrarSesion
}