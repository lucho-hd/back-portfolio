import yup from 'yup'

const testimoniosSchema = yup.object({
    client: yup.string().required('El nombre del cliente es obligatorio'),  
    company: yup.string().required('La companía es obligatoria'),
    testimonio: yup.string().max(200, 'El máximo de caracteres es de 200' ).required('El testomonio es obligatorio')
})

export default {
    testimoniosSchema
}