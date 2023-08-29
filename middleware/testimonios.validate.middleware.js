import testimoniosSchema from '../schemes/testimonios-schema.js';

function validarTestimonios(req, res, next) {
    testimoniosSchema.validate(req.body)
        .then((data) => {
            req.body = data;
            next()
        })
        .catch((error) => {
            res.status(400).json({error: error.errors})
        })
}

export {
    validarTestimonios
}