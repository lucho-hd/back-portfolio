import { MongoClient, ObjectId } from 'mongodb'
import bcrypt  from 'bcrypt'

const cliente = new MongoClient('mongodb+srv://luchohd:damasa2013@cluster0.vh3xgqd.mongodb.net/?retryWrites=true&w=majority')
const db = cliente.db('AH_P1')
const alumnos  = db.collection('Alumnos')

async function traer(filtro) {
    return cliente.connect()
        .then(function() {
            return alumnos.find(filtro).toArray()
        })
}

async function traerUno(id) {
    return cliente.connect()
    .then(function(){
        return alumnos.findOne({_id: new ObjectId(id)})
    })
}

async function crear(alumno) {
    const nuevoAlumno = {
        ...alumno
    }

    if(await alumnos.findOne({email: nuevoAlumno.email})) {
        throw new Error('El usuario ya existe')
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(nuevoAlumno.password, salt)

    nuevoAlumno.password = passwordHash

    await alumnos.insertOne(nuevoAlumno)

    return nuevoAlumno
}

async function eliminarPorId(id) {
    return cliente.connect()
        .then(function() {
            return alumnos.deleteOne({_id: new ObjectId(id)})
        })
}

async function iniciarSesion (alumno) {
    await cliente.connect()

    const alumnoEncontrado = await alumnos.findOne({email: alumno.email})

    if(!alumnoEncontrado) {
        throw new Error('Este usuario no existe')
    }

    const comparacionContras = await bcrypt.compare(alumno.password, alumnoEncontrado.password)

    if(!comparacionContras) {
        throw new Error('La contraseña ingresada es incorrecta.')
    }

    return alumnoEncontrado
}


export {
    traer,
    traerUno,
    crear,
    eliminarPorId,
    iniciarSesion
}