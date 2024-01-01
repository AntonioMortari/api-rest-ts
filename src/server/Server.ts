import express, { Application} from 'express'
import 'dotenv/config'
import './services/translationsYup'

// routes
import citiesRoutes from './routes/cities'
import personRoutes from './routes/person'
import userRoutes from './routes/user'

// middlewares
import {ensureAuthenticated} from './middlewares/ensureAuthenticated'

const server: Application = express()
server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.use('/cities',ensureAuthenticated, citiesRoutes)
server.use('/person',ensureAuthenticated, personRoutes)
server.use('/', userRoutes)

export { server }
