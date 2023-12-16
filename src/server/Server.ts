import express, { Application, Request, Response } from 'express'
import {StatusCodes} from 'http-status-codes'
import 'dotenv/config'

// routes
import citiesRoutes from './routes/cities'

const server: Application = express()
server.use(express.json())

// test
server.get('/', (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ message: 'Ok' })
})

server.use('/cities', citiesRoutes)


export { server }