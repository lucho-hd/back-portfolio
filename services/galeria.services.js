import { MongoClient, ObjectId } from "mongodb";

const cliente = new MongoClient('mongodb+srv://luchohd:damasa2013@cluster0.vh3xgqd.mongodb.net/?retryWrites=true&w=majority')
const db          = cliente.db('AH_P1') 
const galeria     = db.collection('Galery') 

async function traerGaleria (idTrabajo) { 
    return cliente.connect()
        .then(function () {
            return galeria.find({ trabajo_id: new ObjectId(idTrabajo) }).toArray()
        })
}

async function nuevaImagen (idTrabajo, imagen) {
    const nuevaImagen = {
        ...imagen,
        trabajo_id: new ObjectId(idTrabajo)
    }
    return cliente.connect()
        .then(function () {
            return galeria.insertOne(nuevaImagen)
        })
        .then(function (resultado) {
            return nuevaImagen
        })
}

async function traerImagenPorID (IdImagen) {
    return cliente.connect()
        .then(function (){
            return galeria.findOne({_id: new ObjectId(IdImagen)})
        })
}

async function eliminarImagen (IdImagen) {
    return cliente.connect()
        .then(function (){
            return galeria.deleteOne({_id: new ObjectId(IdImagen)})
        })
}

export {
    traerGaleria,
    nuevaImagen,
    traerImagenPorID,
    eliminarImagen
}