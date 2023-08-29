
import { alumnoSchema } from '../schemes/alumno-scheme.js'

function validarAlumno(req, res, next) {
     alumnoSchema.validate(req.body)
        .then((data) => {
            req.body = data;
            next()
        })
        .catch((error) => {
            res.status(400).json({errors:  error.errors})
        })
}

export {
    validarAlumno
}
