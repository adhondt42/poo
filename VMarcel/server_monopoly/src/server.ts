import { Request, Response } from 'express'

let express = require('express')

export default class Server {
    
    readonly port: number
    
    constructor (port: number) {
        this.port = port
    }

    start (port: number) {

        const app = express()
        
        app.set('view engine', 'ejs')
        app.use(express.static('public')) // dossier contient les statics


        app.get('/', function (req: Request, res:Response) {
            res.render('pages/index') // retourne le template
        }),
        app.get('/add', function (req: Request, res:Response) {
            res.send('Salut Toi /add ')
        }),
        
        
        
        
        app.listen(this.port, function () {
            console.log("Serveur runned on port: ", port)
            })
    }
}