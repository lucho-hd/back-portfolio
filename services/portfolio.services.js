import { MongoClient, ObjectId } from "mongodb"
import * as GaleriaService from './galeria.services.js'
import * as TestimonioService from './testimonios.services.js'
import * as TecnologiasService from './tecnologias.services.js'

// const cliente = new MongoClient('mongodb://127.0.0.1:27017')
const cliente = new MongoClient('mongodb+srv://luchohd:damasa2013@cluster0.vh3xgqd.mongodb.net/?retryWrites=true&w=majority')

const db = cliente.db('AH_P1')
const trabajos = db.collection('Projects')

async function traerTrabajos(filtro) {
    return cliente.connect()
        .then(function(){
            return trabajos.find(filtro).toArray()
        })
        .catch(function(error){
            console.log("traerTrabajos::", error)
            return[]
        })
}

async function traerTrabajoPorId (id) {
    await cliente.connect()
    const trabajo    = await trabajos.findOne({_id: new ObjectId(id)})
    
    if(trabajo) {
        trabajo.testimonios = await TestimonioService.traerTestimonios(id)
    }
    
    if(trabajo) {
        trabajo.galeria = await GaleriaService.traerGaleria(id)
    }

    return trabajo
}

async function guardarTrabajo(trabajo) {
    const nuevoTrabajo = {
        ...trabajo
    }

    return cliente.connect()
        .then(function(){
            return trabajos.insertOne(nuevoTrabajo)
        })
        .then(function(resultado){
            return nuevoTrabajo
        })
}

async function eliminarTrabajo(id) {
    return cliente.connect()
        .then(function(){
            return trabajos.deleteOne({_id: new ObjectId(id) })
        })
}

async function editarTrabajo(id, trabajo) {
    return cliente.connect()
        .then(function () {
            return trabajos.updateOne(
                { _id: new ObjectId(id) },{ $set: trabajo }
            )
        })
}

export {
    traerTrabajos,
    traerTrabajoPorId,
    guardarTrabajo,
    eliminarTrabajo,
    editarTrabajo,
}