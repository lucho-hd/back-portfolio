import { MongoClient, ObjectId } from "mongodb";

const cliente = new MongoClient('mongodb+srv://luchohd:damasa2013@cluster0.vh3xgqd.mongodb.net/?retryWrites=true&w=majority')
const db          = cliente.db('AH_P1')
const trabajos    = db.collection('Projects')  
const tecnologias = db.collection('Technologies')

async function traerTecnologias() {
    return cliente.connect()
        .then(function() {
            return cliente.db('AH_P1').collection('Technologies').find().toArray()
        })
}

async function crearTecnologia(tecnologia) {
    const nuevaTecnologia = {
        ...tecnologia
    }

    return cliente.connect()
        .then(function() {
            return cliente.db('AH_P1').collection('Technologies').insertOne(nuevaTecnologia)
        })
        .then(function() {
            return nuevaTecnologia
        })
}

async function traerTecnologiaPorId (id) {
    return cliente.connect()
        .then(function() {
            return cliente.db('AH_P1').collection('Technologies').findOne({_id: new ObjectId(id)})
        })
}

async function actualizarTecnologia(id, tecnologia) {
    await cliente.connect()

    const tecnologiaAnterior = await tecnologias.findOne({_id: new ObjectId(id)})

    if(tecnologiaAnterior) {
        await tecnologias.updateOne({_id: new ObjectId(id)}, {$set: tecnologia})
        await trabajos.updateMany({technology: tecnologiaAnterior.name}, {$set: {technology: tecnologia.name}})

        return true
    }
    return false
}


export {
    traerTecnologias,
    crearTecnologia,
    traerTecnologiaPorId,
    actualizarTecnologia
}