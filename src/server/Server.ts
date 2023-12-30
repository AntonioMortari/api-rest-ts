import express, { Application} from 'express'
import 'dotenv/config'
import './services/translationsYup'

// routes
import citiesRoutes from './routes/cities'
import personRoutes from './routes/person'

const server: Application = express()
server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.use('/cities', citiesRoutes)
server.use('/person', personRoutes)

export { server }
