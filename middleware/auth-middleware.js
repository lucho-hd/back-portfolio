// <----------------------JWT------------------------>
import Jwt  from 'jsonwebtoken'

// <----------------------Servicios------------------------>
import * as tokenServices from '../services/token.services.js'

// <----------------------Schemas------------------------>
import { iniciarSesionSchema } from '../schemes/alumno-scheme.js'


function estaLogueado(req, res, next) {
    
    const token = req.headers['auth-token']

    if(!token) {
       return res.status(401).json({ mensaje: 'No se envio el token' })
    }

    try{
        const payload = Jwt.verify(token, 'bono4523')

        tokenServices.traerPorToken(token)
            .then(function(token) {
                if(!token) {
                    return res.status(401).json({mensaje: 'El token es invalido'})
                }
                req.alumno = payload
                next()
            })
            .catch(function() {
                res.status(401).json({mensaje: 'El token ingresado no es válido'})
            })
    }
    catch(error){
        return res.status(401).json({ mensaje: 'Token invalido' })
    }
}


function validarIniciarSesion (req, res, next) {
    iniciarSesionSchema.validate(req.body, {abortEarly: false})
        .then((data) => {
            req.body = data;
            next()
        })
        .catch((error) => {
            res.status(400).json({errors: error.errors})
        })
}

export {
    estaLogueado,
    validarIniciarSesion
}