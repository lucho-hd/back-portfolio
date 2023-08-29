
import { proyectosSchema } from '../schemes/proyectos-schema.js'

function validarProyecto(req, res, next) {
    proyectosSchema.validate(req.body, {abortEarly: false})
        .then((data) => {
            req.body = data;
            next()
        })
        .catch((error) => {
            res.status(400).json({errors: error.errors})
        })
}

export {
    validarProyecto
}
