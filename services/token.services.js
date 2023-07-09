import { MongoClient } from "mongodb"

const cliente = new MongoClient('mongodb+srv://luchohd:damasa2013@cluster0.vh3xgqd.mongodb.net/?retryWrites=true&w=majority')
const db          = cliente.db('AH_P1') 
const tokens = db.collection('Tokens') 

async function crear(token) {
    const nuevoToken = {...token}

    await cliente.connect()

    await tokens.insertOne(nuevoToken)

    return nuevoToken
}

async function traerPorToken(token) {
    await cliente.connect()

    return tokens.findOne({token})
}

async function eliminarToken(token) {
    await cliente.connect()

    return tokens.deleteOne({token})
}


export {
    crear,
    traerPorToken,
    eliminarToken
}