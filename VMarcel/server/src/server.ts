import { Request, Response } from 'express'

let express = require('express')

export default class Server {
    
    readonly port: number
    
    constructor (port: number) {
        this.port = port
    }

    start (port: number) {
        const app = express()
        app.get('/', function (req: Request, res:Response) {
            res.send('Salut')
        })
        app.listen(this.port, function () {
            console.log("Serveur runned on port: ", port)
            })
    }
}