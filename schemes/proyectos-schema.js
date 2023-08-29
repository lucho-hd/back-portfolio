import yup from 'yup'

const proyectosSchema = yup.object({
    name: yup.string().required('El nombre es obligatorio'),
    description: yup.string().required('La description es obligatoria'),
    tecnology: yup.string().required('Agregar al menos una tecnología'),
    link: yup.string().url('La URL ingresada no es válida'),
    img: yup.string().required('Debes subir una imagen'),
    condition: yup.string().required('La condición del proyecto es obligatoria')
}).noUnknown()

export  {
    proyectosSchema
}