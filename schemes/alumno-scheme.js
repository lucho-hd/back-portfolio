import yup from 'yup'

const alumnoSchema = yup.object({
    name: yup.string().required('El nombre es obligatorio'),
    surname: yup.string().required('El apellido es obligatorio'),
    email: yup.string().email('El email ingresado es inválido. ej: pepe@gmail.com').required('El email es obligatorio'),
    password: yup.string().min(5, 'La contraseña debe contener al menos 5 caracteres').required('Ingrese una contraseña')
}).noUnknown()

const iniciarSesionSchema = yup.object({
    email: yup.string().email().required('El email es obligatorio'),
    password: yup.string().required('Ingrese una contraseña')
})

export {
    alumnoSchema,
    iniciarSesionSchema
}