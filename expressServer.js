import express from 'express'
import InicioRouter from './routes/inicio.routes.js'
import TrabajosRouter from './routes/portfolio.routes.js'

import TrabajosApiRouter from './api/routers/portfolio.api.routes.js'
import TecnologiasApiRouter from './api/routers/tecnologias.api.routes.js'
import AlumnosApiRouter from './api/routers/alumnos.api.routes.js'

import cors from 'cors';

const app  = express()
app.set('view engine', 'ejs')

app.use('/', express.static('public'))
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Rutas
app.use('/', InicioRouter)
app.use('/', TrabajosRouter)
app.use('/', TrabajosApiRouter)
app.use('/', TecnologiasApiRouter)
app.use('/', AlumnosApiRouter)

app.listen(2022, function(){
    console.log('Servidor en ejecución! https://localhost:2022')
})