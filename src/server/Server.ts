import express, { Application, Request, Response } from 'express'

const server: Application = express()

server.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Ok' })
})


export { server }