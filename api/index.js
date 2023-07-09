import express from "express";
import cors from "cors";

import AlumnosRoutes from "./routers/alumnos.api.routes"
import PortfolioRoutes from "./routers/portfolio.api.routes"
import TecnologiasRoutes from "./routers/tecnologias.api.routes"

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', TecnologiasRoutes);
app.use('/', AlumnosRoutes);
app.use('/', PortfolioRoutes);

export default app