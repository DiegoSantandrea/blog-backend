import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import apiLimiter from "../src/middlewares/rate-limit-validator.js"
import { dbConnection } from "./mongo.js"
import { swaggerDocs, swaggerUi } from "./swagger.js"
import Publicacion from "../src/Publicacion/publicacion.routes.js"


const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    app.use("/blog/v1/publicacion", Publicacion);
}

const ConnectDB = async () => {
    try {
        await dbConnection()
    } catch (err) {
        console.log(`Error connecting to database: ${err}`)
        process.exit(1)
    }
}

export const initServer = () =>{
    const app = express()
    try{
        middlewares(app)
        ConnectDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`server inti failed ${err}`)
    }
}


export default initServer;