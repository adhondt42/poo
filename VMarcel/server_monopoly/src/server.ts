import { Request, Response } from 'express'
import  {Gameplay} from "./models/gameplay"
// If default export, {} not needed

let express = require('express')
let bodyParser = require('body-parser')



export default class Server {
    
    readonly port: number
    
    constructor (port: number) {
        this.port = port
    }

    start (port: number) {
        const app = express()
        let gameplay = new Gameplay(1, 2)
        
        app.set('view engine', 'ejs')
        app.use(express.static('public')) // dossier contient les statics
        app.use(bodyParser.urlencoded({extended: false})) // bodyparder pour req.xxxxx


        app.get('/', function (req: Request, res: Response) {
            let status: number

            console.log("GET /")
            status = gameplay.checkGameStatus()
            if (status === 0)
                res.redirect('/start')
            else {
                gameplay.updateData(function(domData: string) {
                res.render('pages/index', {domData}) // retourne le template
                })
            }
        }),


        app.get('/start', function (req: Request, res:Response) {
            console.log("GET /start")
            res.render('pages/start')
        }),


        app.post('/register_players', function (req: Request, res: Response) {
            console.log("Post /register_players")
            // gameplay.createEnv(req.body)
            res.redirect('/')
        })
        
        
        
        
        app.listen(this.port, function () {
            console.log("Serveur runned on port : ", port)
            })
    }
}