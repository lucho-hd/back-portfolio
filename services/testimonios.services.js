import { MongoClient, ObjectId } from "mongodb"

const cliente = new MongoClient('mongodb+srv://luchohd:damasa2013@cluster0.vh3xgqd.mongodb.net/?retryWrites=true&w=majority')
const db          = cliente.db('AH_P1') 
const testimonios = db.collection('Testimonials') 

async function traerTestimonios(idTrabajo) {
    return cliente.connect()
        .then(function () {
            return testimonios.find({ trabajo_id: new ObjectId(idTrabajo) }).toArray()
        })
}


async function crearTestimonio (idTrabajo, testimonio) {
    const nuevoTestimonio = {
        ...testimonio,
        trabajo_id: new ObjectId(idTrabajo)
    }
    return cliente.connect()
        .then(function () {
            return testimonios.insertOne(nuevoTestimonio)
        })
        .then(function (resultado) {
            return nuevoTestimonio
        })
}


async function traerTestimonioPorId (idTestimonio) {
    return cliente.connect()
        .then(function(){
            return testimonios.findOne({_id: new ObjectId(idTestimonio)})
        })
}

async function eliminarTestimonio (idTestimonio) {
    return cliente.connect()
        .then(function (){
            return testimonios.deleteOne({_id: new ObjectId(idTestimonio)})
        })
}

export {
    traerTestimonios,
    crearTestimonio,
    traerTestimonioPorId,
    eliminarTestimonio
}