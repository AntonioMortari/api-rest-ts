import express, { Application} from 'express'
import 'dotenv/config'
import './services/translationsYup'

// routes
import citiesRoutes from './routes/cities'

const server: Application = express()
server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.use('/cities', citiesRoutes)

export { server }
